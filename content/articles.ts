import type { Article } from '@/types/content'

const stockMovementSql = `BEGIN;

-- Lock the stock row so concurrent transfers cannot read a stale quantity
SELECT quantity
FROM stock_levels
WHERE product_id = $1 AND warehouse_id = $2
FOR UPDATE;

-- Decrement only if enough stock exists
UPDATE stock_levels
SET quantity = quantity - $3
WHERE product_id = $1 AND warehouse_id = $2
  AND quantity >= $3;

-- Every change is an append-only ledger entry
INSERT INTO stock_movements
  (product_id, warehouse_id, delta, reason, reference_id)
VALUES ($1, $2, -$3, 'transfer_out', $4);

COMMIT;`

const laravelTransaction = `use Illuminate\\Support\\Facades\\DB;

DB::transaction(function () use ($transfer) {
    $stock = StockLevel::where('product_id', $transfer->product_id)
        ->where('warehouse_id', $transfer->from_warehouse_id)
        ->lockForUpdate()
        ->firstOrFail();

    if ($stock->quantity < $transfer->quantity) {
        throw new InsufficientStockException();
    }

    $stock->decrement('quantity', $transfer->quantity);

    StockMovement::create([
        'product_id'   => $transfer->product_id,
        'warehouse_id' => $transfer->from_warehouse_id,
        'delta'        => -$transfer->quantity,
        'reason'       => 'transfer_out',
        'reference_id' => $transfer->id,
    ]);
}, attempts: 3);`

const idempotencySql = `CREATE UNIQUE INDEX stock_movements_idempotency
ON stock_movements (reference_id, reason, warehouse_id);`

const redisQueue = `# Redis: lightweight job queue (e.g. with a list)
LPUSH jobs:email '{"to":"user@example.com","template":"welcome"}'
BRPOP jobs:email 0`

const rabbitPublish = `import json
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.exchange_declare(exchange="orders", exchange_type="topic", durable=True)
channel.queue_declare(queue="inventory.reserve", durable=True)
channel.queue_bind(queue="inventory.reserve", exchange="orders", routing_key="order.created")

channel.basic_publish(
    exchange="orders",
    routing_key="order.created",
    body=json.dumps({"order_id": "ORD-1001"}),
    properties=pika.BasicProperties(delivery_mode=2),  # persistent
)`

const rabbitConsume = `def handle(ch, method, properties, body):
    try:
        reserve_stock(json.loads(body))
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except TemporaryError:
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

channel.basic_qos(prefetch_count=10)
channel.basic_consume(queue="inventory.reserve", on_message_callback=handle)
channel.start_consuming()`

export const articles: Article[] = [
  {
    slug: 'database-transaction-integrity-inventory',
    status: 'published',
    readingMinutes: 7,
    category: { en: 'Database Engineering', id: 'Database Engineering' },
    title: {
      en: 'Database Transaction Integrity in Inventory Management Systems',
      id: 'Integritas Transaksi Basis Data pada Sistem Manajemen Inventaris',
    },
    excerpt: {
      en: 'Why stock numbers drift, and the transaction, locking, and ledger patterns that keep inventory data correct under concurrency.',
      id: 'Mengapa angka stok bisa meleset, serta pola transaksi, locking, dan ledger yang menjaga data inventaris tetap benar saat terjadi konkurensi.',
    },
    body: {
      en: [
        { type: 'p', text: 'Inventory systems look simple: a product has a quantity, and that quantity goes up or down. In practice, stock data is one of the easiest places for a business system to silently become wrong. Two cashiers sell the last unit at the same time, a transfer is submitted twice because of a slow network, or a purchase is recorded but its stock update fails halfway.' },
        { type: 'p', text: 'This guide covers four core patterns that keep inventory data correct: atomic transactions, row-level locking, an append-only movement ledger, and idempotent operations.' },
        { type: 'h2', id: 'why-stock-drifts', text: 'Why stock numbers drift' },
        { type: 'p', text: 'Most inventory bugs come from the same root cause: reading a value, computing a new value in application code, and writing it back without protecting the gap between the read and the write.' },
        {
          type: 'list',
          items: [
            'Lost updates: two requests read quantity 5, both write 4, and one sale disappears.',
            'Partial writes: the stock is decremented, but the movement record is never created.',
            'Duplicate submissions: a retry processes the same transfer twice.',
            'Negative stock: validation happens in the UI, but not in the database.',
          ],
        },
        { type: 'h2', id: 'atomic-transactions', text: 'Make every stock change atomic' },
        { type: 'p', text: 'A stock movement is never a single write. Updating the quantity and recording the reason for the change must succeed or fail together. Wrap them in one database transaction and lock the row you are about to change.' },
        { type: 'code', lang: 'sql', code: stockMovementSql, caption: 'PostgreSQL: lock, conditionally decrement, and record the movement in one transaction.' },
        { type: 'p', text: 'The conditional UPDATE (quantity >= $3) is a second line of defense: even if application validation is bypassed, the database refuses to create negative stock.' },
        { type: 'h2', id: 'framework-level', text: 'The same pattern at the framework level' },
        { type: 'p', text: 'Most frameworks expose the same primitives. In Laravel, DB::transaction combined with lockForUpdate gives you the same guarantees, and the attempts parameter retries automatically on deadlocks.' },
        { type: 'code', lang: 'php', code: laravelTransaction, caption: 'Laravel: pessimistic locking with automatic deadlock retries.' },
        { type: 'h2', id: 'ledger', text: 'Treat movements as a ledger' },
        { type: 'p', text: 'The current quantity is a cached result. The source of truth is the history of movements: purchases, sales, transfers, adjustments, and returns. Keep movements append-only and never edit them; correct mistakes with a new compensating movement. This makes every number auditable and allows you to rebuild quantities if a bug ever corrupts them.' },
        { type: 'h2', id: 'idempotency', text: 'Make operations idempotent' },
        { type: 'p', text: 'Networks fail, users double-click, and queues redeliver messages. Give each business operation a stable reference and let the database enforce uniqueness, so processing the same transfer twice becomes a no-op instead of a double deduction.' },
        { type: 'code', lang: 'sql', code: idempotencySql },
        { type: 'h2', id: 'checklist', text: 'A practical checklist' },
        {
          type: 'list',
          items: [
            'Wrap quantity changes and their movement records in one transaction.',
            'Lock rows you read before writing (SELECT ... FOR UPDATE).',
            'Enforce non-negative stock with conditions or CHECK constraints in the database.',
            'Store movements append-only with a reason and reference.',
            'Add unique constraints for idempotency on business references.',
            'Use decimal types for money and quantities that can be fractional.',
          ],
        },
        { type: 'callout', text: 'Solve data integrity problems in the database and the domain layer, never with frontend-only validation.' },
      ],
      id: [
        { type: 'p', text: 'Sistem inventaris terlihat sederhana: produk memiliki jumlah, dan jumlah itu bertambah atau berkurang. Kenyataannya, data stok adalah salah satu bagian sistem bisnis yang paling mudah salah tanpa disadari. Dua kasir menjual unit terakhir di waktu yang sama, transfer terkirim dua kali karena jaringan lambat, atau pembelian tercatat tetapi pembaruan stoknya gagal di tengah jalan.' },
        { type: 'p', text: 'Panduan ini membahas empat pola inti yang menjaga data inventaris tetap benar: transaksi atomik, row-level locking, ledger pergerakan yang append-only, dan operasi yang idempoten.' },
        { type: 'h2', id: 'why-stock-drifts', text: 'Mengapa angka stok meleset' },
        { type: 'p', text: 'Sebagian besar bug inventaris berasal dari akar masalah yang sama: membaca nilai, menghitung nilai baru di kode aplikasi, lalu menuliskannya kembali tanpa melindungi jeda antara proses baca dan tulis.' },
        {
          type: 'list',
          items: [
            'Lost update: dua request membaca jumlah 5, keduanya menulis 4, dan satu penjualan hilang.',
            'Penulisan parsial: stok berkurang tetapi catatan pergerakannya tidak pernah dibuat.',
            'Pengiriman ganda: retry memproses transfer yang sama dua kali.',
            'Stok negatif: validasi hanya dilakukan di UI, tidak di basis data.',
          ],
        },
        { type: 'h2', id: 'atomic-transactions', text: 'Jadikan setiap perubahan stok atomik' },
        { type: 'p', text: 'Pergerakan stok tidak pernah berupa satu penulisan saja. Memperbarui jumlah dan mencatat alasan perubahan harus berhasil atau gagal bersamaan. Bungkus keduanya dalam satu transaksi basis data dan kunci baris yang akan diubah.' },
        { type: 'code', lang: 'sql', code: stockMovementSql, caption: 'PostgreSQL: kunci, kurangi secara kondisional, dan catat pergerakan dalam satu transaksi.' },
        { type: 'p', text: 'UPDATE kondisional (quantity >= $3) adalah lapisan pertahanan kedua: meskipun validasi aplikasi terlewati, basis data menolak membuat stok negatif.' },
        { type: 'h2', id: 'framework-level', text: 'Pola yang sama di level framework' },
        { type: 'p', text: 'Sebagian besar framework menyediakan primitif yang sama. Di Laravel, DB::transaction yang dikombinasikan dengan lockForUpdate memberikan jaminan serupa, dan parameter attempts otomatis mengulang saat terjadi deadlock.' },
        { type: 'code', lang: 'php', code: laravelTransaction, caption: 'Laravel: pessimistic locking dengan retry otomatis saat deadlock.' },
        { type: 'h2', id: 'ledger', text: 'Perlakukan pergerakan sebagai ledger' },
        { type: 'p', text: 'Jumlah stok saat ini hanyalah hasil yang di-cache. Sumber kebenarannya adalah riwayat pergerakan: pembelian, penjualan, transfer, penyesuaian, dan retur. Jaga pergerakan tetap append-only dan jangan pernah diedit; perbaiki kesalahan dengan pergerakan kompensasi yang baru. Dengan begitu setiap angka dapat diaudit dan jumlah stok bisa dibangun ulang jika suatu saat ada bug yang merusaknya.' },
        { type: 'h2', id: 'idempotency', text: 'Jadikan operasi idempoten' },
        { type: 'p', text: 'Jaringan bisa gagal, pengguna bisa klik dua kali, dan antrean bisa mengirim ulang pesan. Berikan referensi yang stabil pada setiap operasi bisnis dan biarkan basis data menegakkan keunikannya, sehingga memproses transfer yang sama dua kali tidak mengurangi stok dua kali.' },
        { type: 'code', lang: 'sql', code: idempotencySql },
        { type: 'h2', id: 'checklist', text: 'Daftar periksa praktis' },
        {
          type: 'list',
          items: [
            'Bungkus perubahan jumlah dan catatan pergerakannya dalam satu transaksi.',
            'Kunci baris yang dibaca sebelum menulis (SELECT ... FOR UPDATE).',
            'Tegakkan stok non-negatif dengan kondisi atau CHECK constraint di basis data.',
            'Simpan pergerakan secara append-only lengkap dengan alasan dan referensi.',
            'Tambahkan unique constraint untuk idempotensi pada referensi bisnis.',
            'Gunakan tipe desimal untuk uang dan jumlah yang bisa berupa pecahan.',
          ],
        },
        { type: 'callout', text: 'Selesaikan masalah integritas data di basis data dan domain layer, bukan hanya dengan validasi di frontend.' },
      ],
    },
  },
  {
    slug: 'rabbitmq-vs-redis',
    status: 'published',
    readingMinutes: 6,
    category: { en: 'Backend Engineering', id: 'Backend Engineering' },
    title: {
      en: 'When Should You Use RabbitMQ Instead of Redis?',
      id: 'Kapan Sebaiknya Menggunakan RabbitMQ Dibanding Redis?',
    },
    excerpt: {
      en: 'Both can move messages between services, but they make very different guarantees. A practical guide to choosing between them.',
      id: 'Keduanya bisa mengirim pesan antar layanan, tetapi memberikan jaminan yang sangat berbeda. Panduan praktis untuk memilih di antara keduanya.',
    },
    body: {
      en: [
        { type: 'p', text: 'Redis and RabbitMQ both show up in conversations about background jobs and asynchronous processing, and both can pass a message from one process to another. Choosing between them depends on the delivery guarantees and routing capabilities your workload actually needs.' },
        { type: 'h2', id: 'different-tools', text: 'Different tools, different design goals' },
        { type: 'p', text: 'Redis is an in-memory data structure server. Queues, pub/sub, and streams are features built on top of that model. RabbitMQ is a message broker whose entire design centers on routing, acknowledging, and durably delivering messages.' },
        { type: 'h2', id: 'redis-fits', text: 'When Redis is the right fit' },
        {
          type: 'list',
          items: [
            'You already run Redis for caching or sessions and need a simple job queue.',
            'Jobs are cheap to retry or safe to lose occasionally (notifications, cache warming).',
            'You want very low latency and simple FIFO semantics.',
            'Your framework queue driver already supports it well (for example, Laravel queues).',
          ],
        },
        { type: 'code', lang: 'bash', code: redisQueue },
        { type: 'h2', id: 'rabbitmq-fits', text: 'When RabbitMQ is the better choice' },
        {
          type: 'list',
          items: [
            'Messages represent business events that must not be lost (orders, payments, stock reservations).',
            'You need explicit acknowledgements, redelivery, and dead-letter queues.',
            'One event must be routed to several consumers with different interests.',
            'You need backpressure control through prefetch limits.',
          ],
        },
        { type: 'code', lang: 'python', code: rabbitPublish, caption: 'Publishing a durable event to a topic exchange.' },
        { type: 'p', text: 'On the consumer side, acknowledgements are what make RabbitMQ reliable. A message is only removed after the consumer confirms it was processed; failures can be requeued or routed to a dead-letter queue.' },
        { type: 'code', lang: 'python', code: rabbitConsume, caption: 'Manual acknowledgements with bounded prefetch.' },
        { type: 'h2', id: 'decision', text: 'A simple decision rule' },
        { type: 'p', text: 'Ask what happens if a message is lost or processed twice. If the impact is minor, Redis keeps your stack simpler. If the message affects money, inventory, or customer-visible state, choose a broker built for delivery guarantees, and still design consumers to be idempotent.' },
        { type: 'callout', text: 'Neither tool removes the need for idempotent consumers. At-least-once delivery means duplicates are always possible.' },
      ],
      id: [
        { type: 'p', text: 'Redis dan RabbitMQ sama-sama sering muncul dalam diskusi tentang background job dan pemrosesan asinkron, dan keduanya secara teknis bisa mengirim pesan dari satu proses ke proses lain. Pemilihan di antara keduanya bergantung pada jaminan pengiriman dan kemampuan routing yang benar-benar dibutuhkan beban kerja Anda.' },
        { type: 'h2', id: 'different-tools', text: 'Alat berbeda, tujuan desain berbeda' },
        { type: 'p', text: 'Redis adalah server struktur data in-memory. Queue, pub/sub, dan stream adalah fitur yang dibangun di atas model tersebut. RabbitMQ adalah message broker yang seluruh desainnya berpusat pada routing, acknowledgement, dan pengiriman pesan yang tahan lama.' },
        { type: 'h2', id: 'redis-fits', text: 'Kapan Redis adalah pilihan yang tepat' },
        {
          type: 'list',
          items: [
            'Anda sudah menjalankan Redis untuk cache atau session dan membutuhkan job queue sederhana.',
            'Job murah untuk diulang atau aman jika sesekali hilang (notifikasi, cache warming).',
            'Anda membutuhkan latensi sangat rendah dan semantik FIFO yang sederhana.',
            'Driver queue framework Anda sudah mendukungnya dengan baik (misalnya Laravel queues).',
          ],
        },
        { type: 'code', lang: 'bash', code: redisQueue },
        { type: 'h2', id: 'rabbitmq-fits', text: 'Kapan RabbitMQ lebih baik' },
        {
          type: 'list',
          items: [
            'Pesan mewakili event bisnis yang tidak boleh hilang (pesanan, pembayaran, reservasi stok).',
            'Anda membutuhkan acknowledgement eksplisit, redelivery, dan dead-letter queue.',
            'Satu event harus diteruskan ke beberapa consumer dengan kepentingan berbeda.',
            'Anda membutuhkan kontrol backpressure melalui batas prefetch.',
          ],
        },
        { type: 'code', lang: 'python', code: rabbitPublish, caption: 'Mempublikasikan event yang durable ke topic exchange.' },
        { type: 'p', text: 'Di sisi consumer, acknowledgement-lah yang membuat RabbitMQ andal. Pesan baru dihapus setelah consumer mengonfirmasi bahwa pesan telah diproses; kegagalan dapat dikembalikan ke antrean atau diarahkan ke dead-letter queue.' },
        { type: 'code', lang: 'python', code: rabbitConsume, caption: 'Acknowledgement manual dengan prefetch yang dibatasi.' },
        { type: 'h2', id: 'decision', text: 'Aturan keputusan sederhana' },
        { type: 'p', text: 'Tanyakan apa yang terjadi jika sebuah pesan hilang atau diproses dua kali. Jika dampaknya kecil, Redis membuat stack Anda lebih sederhana. Jika pesan memengaruhi uang, inventaris, atau status pelanggan, pilih broker yang dibangun untuk jaminan pengiriman, dan tetap rancang consumer agar idempoten.' },
        { type: 'callout', text: 'Tidak ada satu pun dari keduanya yang menghilangkan kebutuhan akan consumer yang idempoten. Pengiriman at-least-once berarti duplikasi selalu mungkin terjadi.' },
      ],
    },
  },
  {
    slug: 'scalable-saas-architecture',
    status: 'planned',
    category: { en: 'Software Architecture', id: 'Arsitektur Perangkat Lunak' },
    title: {
      en: 'Designing Scalable Software Architecture for Modern SaaS Applications',
      id: 'Merancang Arsitektur Perangkat Lunak yang Skalabel untuk Aplikasi SaaS Modern',
    },
    excerpt: {
      en: 'Modular monoliths, tenancy models, and the architectural decisions that matter most in the first years of a SaaS product.',
      id: 'Modular monolith, model tenancy, dan keputusan arsitektur yang paling penting di tahun-tahun awal produk SaaS.',
    },
  },
  {
    slug: 'llm-application-integration',
    status: 'planned',
    category: { en: 'AI Engineering', id: 'AI Engineering' },
    title: {
      en: 'Building Production Applications with LLM Integration',
      id: 'Membangun Aplikasi Produksi dengan Integrasi LLM',
    },
    excerpt: {
      en: 'Provider abstraction, structured outputs, cost control, and validation for LLM features in production.',
      id: 'Abstraksi provider, structured output, kontrol biaya, dan validasi untuk fitur LLM di produksi.',
    },
  },
  {
    slug: 'production-ready-apis-fastapi',
    status: 'planned',
    category: { en: 'Backend Engineering', id: 'Backend Engineering' },
    title: {
      en: 'Building Production-Ready APIs with FastAPI',
      id: 'Membangun API Siap Produksi dengan FastAPI',
    },
    excerpt: {
      en: 'Project structure, dependency injection, validation, error handling, and deployment for FastAPI services.',
      id: 'Struktur proyek, dependency injection, validasi, penanganan error, dan deployment untuk layanan FastAPI.',
    },
  },
  {
    slug: 'flutter-architecture',
    status: 'planned',
    category: { en: 'Flutter Development', id: 'Flutter Development' },
    title: {
      en: 'Flutter Architecture for Maintainable Applications',
      id: 'Arsitektur Flutter untuk Aplikasi yang Mudah Dirawat',
    },
    excerpt: {
      en: 'Layering, state management, and feature-first structure for Flutter apps that keep growing.',
      id: 'Layering, state management, dan struktur feature-first untuk aplikasi Flutter yang terus berkembang.',
    },
  },
  {
    slug: 'langgraph-agent-orchestration',
    status: 'planned',
    category: { en: 'AI Engineering', id: 'AI Engineering' },
    title: {
      en: 'Practical Applications of LangGraph for AI Agent Orchestration',
      id: 'Penerapan Praktis LangGraph untuk Orkestrasi Agen AI',
    },
    excerpt: {
      en: 'Modeling agent workflows as graphs with explicit state, tool boundaries, and human-in-the-loop checkpoints.',
      id: 'Memodelkan alur kerja agen sebagai graf dengan state eksplisit, batas tool, dan checkpoint human-in-the-loop.',
    },
  },
]

export const publishedArticles = articles.filter((article) => article.status === 'published')
export const plannedArticles = articles.filter((article) => article.status === 'planned')

export function getArticle(slug: string) {
  return publishedArticles.find((article) => article.slug === slug)
}
