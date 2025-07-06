'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.css'

export const Navigation: React.FC = () => {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/restaurants', label: 'Restaurants' },
    { href: '/theme-demo', label: 'Themes' },
    { href: '/about', label: 'About' }
  ]

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${styles.navLink} ${
            pathname === item.href ? styles.navLinkActive : styles.navLinkInactive
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}