import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetOverviewCard = ({ title, amount, subtitle, icon, iconColor, trend }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border transition-smooth hover:shadow-elevation-3">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">₹{amount?.toLocaleString()}</h3>
          {subtitle && (
            <p className="text-xs md:text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Icon name={icon} size={20} color={iconColor} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Icon 
            name={trend?.isPositive ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            color={trend?.isPositive ? '#22C55E' : '#EF4444'} 
          />
          <span className={`text-xs md:text-sm font-medium ${trend?.isPositive ? 'text-success' : 'text-error'}`}>
            {trend?.value}
          </span>
          <span className="text-xs text-muted-foreground">{trend?.label}</span>
        </div>
      )}
    </div>
  );
};

export default BudgetOverviewCard;