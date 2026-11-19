'use client'

import { motion } from 'motion/react'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}
