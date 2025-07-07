import React from 'react'
import styles from './CategoryFilter.module.css'

interface CategoryGroup {
  id: string
  name: string
  icon: string
  description: string
  categories: string[]
}

interface CategoryData {
  categoryGroups: CategoryGroup[]
  categoryToGroupMapping: Record<string, string>
}

interface CategoryFilterProps {
  categories: CategoryData
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
  const handleGroupToggle = (groupId: string) => {
    const group = categories.categoryGroups.find(g => g.id === groupId)
    if (!group) return

    const groupCategories = group.categories
    const allGroupCategoriesSelected = groupCategories.every(cat => selectedCategories.includes(cat))
    
    if (allGroupCategoriesSelected) {
      // Remove all categories from this group
      onCategoryChange(selectedCategories.filter(cat => !groupCategories.includes(cat)))
    } else {
      // Add all categories from this group
      const newSelected = [...selectedCategories]
      groupCategories.forEach(cat => {
        if (!newSelected.includes(cat)) {
          newSelected.push(cat)
        }
      })
      onCategoryChange(newSelected)
    }
  }

  const isGroupActive = (groupId: string) => {
    const group = categories.categoryGroups.find(g => g.id === groupId)
    if (!group) return false
    return group.categories.some(cat => selectedCategories.includes(cat))
  }

  const containerClass = layout === 'horizontal' 
    ? styles.containerHorizontal 
    : styles.containerVertical

  return (
    <div className={containerClass}>
      {categories.categoryGroups.map((group) => (
        <button
          key={group.id}
          onClick={() => handleGroupToggle(group.id)}
          className={`${styles.button} ${
            isGroupActive(group.id)
              ? styles.buttonActive
              : styles.buttonInactive
          }`}
          title={group.description}
        >
          <span className={styles.icon}>{group.icon}</span>
          <span className={styles.label}>{group.name}</span>
        </button>
      ))}
    </div>
  )
}