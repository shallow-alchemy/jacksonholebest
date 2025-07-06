'use client'

import React from 'react'
import Link from 'next/link'
import { Navigation } from './Navigation'
import { ThemePicker } from '@/components/shared'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/" className={styles.logoLink}>
            <h1 className={styles.logoTitle}>
              Jackson Hole Dining
            </h1>
            <span className={styles.logoTagline}>
              🏔️ Adventure • Food • Experience
            </span>
          </Link>
          
          <div className={styles.actions}>
            <Navigation />
            <ThemePicker />
          </div>
        </div>
      </div>
    </header>
  )
}