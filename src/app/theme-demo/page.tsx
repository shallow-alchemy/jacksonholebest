'use client'

import React from 'react'
import { ThemePicker } from '@/components/shared'
import { useTheme } from '@/themes'
import styles from './page.module.css'

export default function ThemeDemoPage() {
  const { currentTheme } = useTheme()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Theme System Demo</h1>
        
        <div className={styles.sections}>
          {/* Current Theme Info */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Current Theme</h2>
            <div className={styles.currentTheme}>
              <div className={styles.themeTitle}>
                {currentTheme?.name || 'Loading...'}
              </div>
              <div className={styles.themeInfo}>
                ID: {currentTheme?.id || 'N/A'}
              </div>
            </div>
          </section>

          {/* ThemePicker Demo */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>ThemePicker Component</h2>
            <p className={styles.description}>
              Choose from different seasonal themes to see the color scheme change throughout the application.
            </p>
            
            <div className={styles.demoItems}>
              <div className={styles.demoItem}>
                <h3 className={styles.demoItemTitle}>Theme Selector</h3>
                <ThemePicker />
              </div>
            </div>
          </section>

          {/* Color Demonstration */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Color Palette</h2>
            <p className={styles.description}>
              Current theme colors that update dynamically when you switch themes.
            </p>
            
            <div className={styles.colorGrid}>
              <div 
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-primary-600)' }}
              >
                Primary
              </div>
              <div 
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-secondary-600)' }}
              >
                Secondary
              </div>
              <div 
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-accent-600)' }}
              >
                Accent
              </div>
              <div 
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-neutral-600)' }}
              >
                Neutral
              </div>
            </div>
          </section>

          {/* Component Examples */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Component Examples</h2>
            <p className={styles.description}>
              See how the theme affects various UI components.
            </p>
            
            <div className={styles.demoItems}>
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-secondary">Secondary Button</button>
              <button className="btn btn-accent">Accent Button</button>
              <div className="card" style={{ padding: 'var(--spacing-md)', maxWidth: '300px' }}>
                <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Sample Card</h4>
                <p style={{ color: 'var(--color-neutral-600)' }}>
                  This card demonstrates how the theme affects component styling.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}