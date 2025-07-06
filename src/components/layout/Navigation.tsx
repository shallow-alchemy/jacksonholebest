import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Navigation: React.FC = () => {
  const router = useRouter()
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/restaurants', label: 'All Restaurants' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' }
  ]

  return (
    <nav className="flex space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`
            px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${router.pathname === item.href
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }
          `}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}