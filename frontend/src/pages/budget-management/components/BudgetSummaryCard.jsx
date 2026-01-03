import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetSummaryCard = ({ title, amount, icon, iconColor, trend, trendValue, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800',
    danger: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
  };

  const iconBgStyles = {
    default: 'bg-primary/10',
    success: 'bg-emerald-100 dark:bg-emerald-900/30',
    warning: 'bg-amber-100 dark:bg-amber-900/30',
    danger: 'bg-red-100 dark:bg-red-900/30'
  };

  return (
    <div className={`${variantStyles?.[variant]} border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-elevation-2`}>
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={`${iconBgStyles?.[variant]} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={20} color={iconColor} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-muted-foreground text-xs md:text-sm mb-1 md:mb-2">{title}</p>
        <p className="text-foreground text-xl md:text-2xl lg:text-3xl font-semibold data-text">₹{amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
};

export default BudgetSummaryCard;