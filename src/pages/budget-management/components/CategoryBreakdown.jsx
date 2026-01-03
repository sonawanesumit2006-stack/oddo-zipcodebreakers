import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryBreakdown = ({ categories }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Transport': 'Car',
      'Accommodation': 'Hotel',
      'Food': 'UtensilsCrossed',
      'Activity': 'Ticket',
      'Shopping': 'ShoppingBag',
      'Other': 'MoreHorizontal'
    };
    return icons?.[category] || 'Circle';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Transport': '#3B82F6',
      'Accommodation': '#8B5CF6',
      'Food': '#F59E0B',
      'Activity': '#10B981',
      'Shopping': '#EC4899',
      'Other': '#6B7280'
    };
    return colors?.[category] || '#6B7280';
  };

  const totalSpent = categories?.reduce((sum, cat) => sum + cat?.spent, 0);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-foreground text-lg md:text-xl font-semibold">Category Breakdown</h2>
        <div className="text-muted-foreground text-xs md:text-sm">
          Total: <span className="text-foreground font-semibold data-text">₹{totalSpent?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {categories?.map((category, index) => {
          const percentage = totalSpent > 0 ? (category?.spent / totalSpent) * 100 : 0;
          const categoryColor = getCategoryColor(category?.name);

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${categoryColor}15` }}
                  >
                    <Icon name={getCategoryIcon(category?.name)} size={16} color={categoryColor} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground font-medium text-sm md:text-base truncate">{category?.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {category?.count} {category?.count === 1 ? 'expense' : 'expenses'}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-foreground font-semibold text-sm md:text-base data-text">₹{category?.spent?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                  <p className="text-muted-foreground text-xs">{percentage?.toFixed(1)}%</p>
                </div>
              </div>
              <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: categoryColor
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBreakdown;