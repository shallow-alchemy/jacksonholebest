import React from 'react'
import Link from 'next/link'
import { Navigation } from './Navigation'

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Jackson Hole Dining
            </h1>
            <span className="ml-2 text-sm text-gray-500">
              🏔️ Adventure • Food • Experience
            </span>
          </Link>
          
          <Navigation />
        </div>
      </div>
    </header>
  )
}