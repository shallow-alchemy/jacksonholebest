import React from 'react'

interface Category {
  id: string
  name: string
  icon: string
  description: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  layout?: 'horizontal' | 'vertical'
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  layout = 'horizontal'
}) => {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const containerClasses = layout === 'horizontal' 
    ? 'flex flex-wrap gap-3' 
    : 'space-y-2'

  return (
    <div className={containerClasses}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryToggle(category.id)}
          className={`
            flex items-center px-4 py-2 rounded-lg border-2 transition-colors
            ${selectedCategories.includes(category.id)
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }
          `}
        >
          <span className="mr-2">{category.icon}</span>
          <span className="font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  )
}