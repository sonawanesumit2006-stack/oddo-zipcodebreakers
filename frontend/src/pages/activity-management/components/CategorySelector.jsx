import React from 'react';
import Icon from '../../../components/AppIcon';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'transport',
      label: 'Transport',
      icon: 'Plane',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      borderColor: 'border-blue-300 dark:border-blue-700'
    },
    {
      id: 'accommodation',
      label: 'Accommodation',
      icon: 'Hotel',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      borderColor: 'border-purple-300 dark:border-purple-700'
    },
    {
      id: 'food',
      label: 'Food',
      icon: 'Utensils',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      borderColor: 'border-orange-300 dark:border-orange-700'
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: 'Ticket',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      borderColor: 'border-green-300 dark:border-green-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {categories?.map((category) => (
        <button
          key={category?.id}
          type="button"
          onClick={() => onCategoryChange(category?.id)}
          className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border-2 transition-smooth ${
            selectedCategory === category?.id
              ? `${category?.color} ${category?.borderColor} shadow-elevation-2`
              : 'bg-card border-border hover:border-muted-foreground/30 hover:shadow-elevation-1'
          }`}
        >
          <Icon
            name={category?.icon}
            size={32}
            color={selectedCategory === category?.id ? 'currentColor' : 'var(--color-muted-foreground)'}
          />
          <span className={`mt-2 md:mt-3 text-sm md:text-base font-medium ${
            selectedCategory === category?.id ? '' : 'text-muted-foreground'
          }`}>
            {category?.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;