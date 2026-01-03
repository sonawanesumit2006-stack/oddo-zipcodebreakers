import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentExpense = ({ expense }) => {
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

  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(date)?.toLocaleDateString('en-US', options);
  };

  const categoryColor = getCategoryColor(expense?.category);

  return (
    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth">
      <div 
        className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${categoryColor}15` }}
      >
        <Icon name={getCategoryIcon(expense?.category)} size={20} color={categoryColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-medium text-sm md:text-base truncate">{expense?.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-muted-foreground text-xs">{expense?.city}</span>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="text-muted-foreground text-xs">{formatDate(expense?.date)}</span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-foreground font-semibold text-sm md:text-base data-text">₹{expense?.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        <span 
          className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1"
          style={{ 
            backgroundColor: `${categoryColor}15`,
            color: categoryColor
          }}
        >
          {expense?.category}
        </span>
      </div>
    </div>
  );
};

export default RecentExpense;