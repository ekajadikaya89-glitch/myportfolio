import type { Achievement } from '@/types/content'

/** Add `evidenceUrl` only when a verifiable public link exists. */
export const achievements: Achievement[] = [
  {
    id: 'digital-entrepreneurship-2026',
    title: { en: '3rd Place, Certificate of Achievement', id: 'Juara 3, Sertifikat Penghargaan' },
    event: 'Digital Entrepreneurship Challenge & Incubation 2026',
    year: 'Oct 5, 2026',
    recognition: { en: '3rd Place', id: 'Juara 3' },
    description: {
      en: 'Awarded 3rd Place in the Digital Entrepreneurship Challenge & Incubation 2026, organized by BPKH RI, Sustainable Goodness Innovation Foundation, GoodStarter.id, and Universitas Indonesia.',
      id: 'Meraih Juara 3 dalam Digital Entrepreneurship Challenge & Incubation 2026 yang diselenggarakan oleh BPKH RI, Yayasan Sustainable Goodness Innovation, GoodStarter.id, dan Universitas Indonesia.',
    },
    evidenceUrl: 'https://drive.google.com/file/d/1uRzVgnFx7_AtNURSbaCamaCE7g7UqzyZ/view?usp=drivesdk',
  },
  {
    id: 'indonesia-web3-hackathon-2026',
    title: { en: 'AI & Web3 Project Submission Certificate', id: 'Sertifikat Peserta & Pengirim Proyek AI & Web3' },
    event: 'Indonesia Web3 Hackathon 2026',
    year: 'Nov 5, 2026',
    recognition: { en: 'Hackathon Builder', id: 'Peserta Hackathon' },
    description: {
      en: 'Completed and submitted a working project combining Artificial Intelligence (AI) and Web3 technology in Indonesia Web3 Hackathon 2026, co-hosted by Binance Academy, BNB Chain, Coinvestasi, and Dev Web3 Jogja.',
      id: 'Menyelesaikan dan mengirimkan proyek yang memadukan teknologi Artificial Intelligence (AI) dan Web3 dalam Indonesia Web3 Hackathon 2026 yang diselenggarakan bersama Binance Academy, BNB Chain, Coinvestasi, dan Dev Web3 Jogja.',
    },
    evidenceUrl: 'https://drive.google.com/file/d/1QEYfpdLNRd1nMBAcxhB-x1Px_6Jy0ZXt/view?usp=drivesdk',
  },
  {
    id: 'infinity-rise-2026',
    title: { en: 'Top 10 Incubation Participant', id: 'Peserta Inkubasi Top 10' },
    event: 'Infinity Squad / Infinity Rise 2026',
    year: '2026',
    recognition: { en: 'Top 10', id: 'Top 10' },
    description: {
      en: 'HajjTrack Ecosystem was selected into the Top 10 of the Infinity Squad / Infinity Rise 2026 incubation program.',
      id: 'HajjTrack Ecosystem terpilih masuk Top 10 dalam program inkubasi Infinity Squad / Infinity Rise 2026.',
    },
    relatedProject: 'hajjtrack-ecosystem',
  },
]
