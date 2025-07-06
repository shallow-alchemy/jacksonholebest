import React from 'react'

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
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2'
  }

  const priceText = {
    1: 'Budget-friendly',
    2: 'Moderate',
    3: 'Upscale',
    4: 'Fine dining'
  }

  const dollarSigns = '$'.repeat(priceLevel)

  return (
    <div className={`inline-flex items-center bg-white bg-opacity-90 backdrop-blur-sm rounded-full ${sizeClasses[size]}`}>
      <span className="font-bold text-gray-900">{dollarSigns}</span>
      {showText && (
        <span className="ml-2 text-gray-700">{priceText[priceLevel]}</span>
      )}
    </div>
  )
}
