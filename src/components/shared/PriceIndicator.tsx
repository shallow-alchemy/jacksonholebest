import React from 'react'
import styles from './PriceIndicator.module.css'

interface PriceIndicatorProps {
  priceLevel: 1 | 2 | 3 | 4
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const PriceIndicator: React.FC<PriceIndicatorProps> = ({
  priceLevel,
  showText = false,
  size = 'md'
}) => {
  const sizeClass = size === 'sm' ? styles.indicatorSm : 
                   size === 'lg' ? styles.indicatorLg : styles.indicatorMd

  const priceText = {
    1: 'Budget-friendly',
    2: 'Moderate',
    3: 'Upscale',
    4: 'Fine dining'
  }

  const dollarSigns = '$'.repeat(priceLevel)

  return (
    <div className={`${styles.indicator} ${sizeClass}`}>
      <span className={styles.dollarSigns}>{dollarSigns}</span>
      {showText && (
        <span className={styles.text}>{priceText[priceLevel]}</span>
      )}
    </div>
  )
}