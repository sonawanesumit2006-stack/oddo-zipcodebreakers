import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ icon, label, value, trend, trendValue, iconColor }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-5 lg:p-6 transition-smooth hover:shadow-elevation-3">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-primary/10">
          <Icon name={icon} size={20} color={iconColor || 'var(--color-primary)'} />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-xs md:text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;