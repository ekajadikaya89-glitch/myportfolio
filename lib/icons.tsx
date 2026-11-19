import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

function base(props: IconProps) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.65,
    strokeLinecap: 'square' as const,
    strokeLinejoin: 'miter' as const,
    'aria-hidden': true,
    ...props,
  }
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.96c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.5 3.5A2 2 0 1 1 5.5 7.5a2 2 0 0 1 0-4ZM3.75 9.25h3.5V20.5h-3.5V9.25Zm6.25 0h3.35v1.54h.05c.47-.89 1.61-1.82 3.31-1.82 3.54 0 4.19 2.33 4.19 5.36v6.17h-3.5v-5.47c0-1.31-.02-2.99-1.82-2.99-1.83 0-2.11 1.43-2.11 2.9v5.56H10V9.25Z" />
    </svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 4h6v6" />
      <path d="M10 14L20 4" />
      <path d="M19 13v7H4V5h7" />
    </svg>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  )
}

export function FileDocIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3h9l4 4v14H6V3Z" />
      <path d="M15 3v4h4" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v11" />
      <path d="M7.5 11.5L12 16l4.5-4.5" />
      <path d="M4 20h16" />
    </svg>
  )
}

export function PrinterIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 8V3h10v5" />
      <rect x="4" y="8" width="16" height="8" />
      <path d="M7 14h10v7H7v-7Z" />
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8.2 8.2 0 1 0 10.5 10.5Z" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <polygon points="7,5 19,12 7,19" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  )
}

export function CirclePendingIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
    </svg>
  )
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <polygon points="12,3 22,20 2,20" />
      <path d="M12 9v5" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M12 11v6" />
      <circle cx="12" cy="7.5" r="0.7" fill="currentColor" />
    </svg>
  )
}

export function AwardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" />
    </svg>
  )
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7" width="18" height="13" />
      <path d="M8 7V4h8v3" />
      <path d="M3 12h18" />
    </svg>
  )
}

export function ProgramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <polygon points="12,3 21,8 12,13 3,8" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  )
}

export function GraduationIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <polygon points="12,4 22,9 12,14 2,9" />
      <path d="M6 11v5.5c2 1.8 10 1.8 12 0V11" />
      <path d="M22 9v6" />
    </svg>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  )
}

export function SendIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <polygon points="21,4 3,11 10,14 13,21" />
      <path d="M10 14L21 4" />
    </svg>
  )
}

export function LoaderIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3a9 9 0 1 1-9 9" />
    </svg>
  )
}

/* Technical Domain Icons (Architectural stroke language, no generic Sparkles) */

export function AiGraphIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="5" height="5" />
      <rect x="3" y="15" width="5" height="5" />
      <rect x="16" y="9.5" width="5" height="5" />
      <path d="M8 6.5h4v5.5h4" />
      <path d="M8 17.5h4V12" />
    </svg>
  )
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 7L3 12l5 5" />
      <path d="M16 7l5 5-5 5" />
      <path d="M13.5 5l-3 14" />
    </svg>
  )
}

export function LayoutIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="16" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </svg>
  )
}

export function ServerIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="7" />
      <rect x="3" y="13" width="18" height="7" />
      <path d="M7 7.5h2M7 16.5h2" />
    </svg>
  )
}

export function SmartphoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="3" width="12" height="18" />
      <path d="M10.5 18h3" />
    </svg>
  )
}

export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  )
}

export function CloudIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 19h11a4.5 4.5 0 0 0 .8-8.93A6 6 0 0 0 6.7 8.4 4 4 0 0 0 6.5 19Z" />
    </svg>
  )
}

export function WorkflowIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="6" height="6" />
      <rect x="15" y="4" width="6" height="6" />
      <rect x="9" y="14" width="6" height="6" />
      <path d="M9 7h6" />
      <path d="M6 10v7h3" />
      <path d="M18 10v7h-3" />
    </svg>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l8 3v6c0 4.8-3.4 8.2-8 9.5C7.4 20.2 4 16.8 4 12V6l8-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="4.5" />
      <rect x="4" y="10" width="16" height="4.5" />
      <rect x="4" y="16" width="16" height="4.5" />
    </svg>
  )
}

export function NetworkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="9.5" y="3" width="5" height="5" />
      <rect x="3" y="16" width="5" height="5" />
      <rect x="16" y="16" width="5" height="5" />
      <path d="M12 8v4M5.5 16v-4h13v4" />
    </svg>
  )
}

const domainIconMap: Record<string, (props: IconProps) => React.ReactNode> = {
  code: CodeIcon,
  layout: LayoutIcon,
  server: ServerIcon,
  smartphone: SmartphoneIcon,
  database: DatabaseIcon,
  ai: AiGraphIcon,
  cloud: CloudIcon,
  workflow: WorkflowIcon,
  shield: ShieldIcon,
  layers: LayersIcon,
  network: NetworkIcon,
}

export function DomainIcon({ name, className }: { name: string; className?: string }) {
  const Component = domainIconMap[name] ?? CodeIcon
  return <Component className={className} />
}
