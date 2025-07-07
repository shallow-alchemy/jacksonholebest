'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from './Navigation'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/jacksonholebest_logo_horizontal.png"
              alt="Jackson Hole Best Logo"
              width={200}
              height={60}
              className={styles.logoImage}
              priority
            />
          </Link>
          
          <div className={styles.actions}>
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  )
}