import React from 'react'
import styles from './CategoryFilter.module.css'

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

  const containerClass = layout === 'horizontal' 
    ? styles.containerHorizontal 
    : styles.containerVertical

  return (
    <div className={containerClass}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryToggle(category.id)}
          className={`${styles.button} ${
            selectedCategories.includes(category.id)
              ? styles.buttonActive
              : styles.buttonInactive
          }`}
        >
          <span className={styles.icon}>{category.icon}</span>
          <span className={styles.label}>{category.name}</span>
        </button>
      ))}
    </div>
  )
}