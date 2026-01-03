import React from 'react';
import Icon from '../../../components/AppIcon';

const CityBudgetRow = ({ city, allocated, spent, remaining, dailyAverage, progress }) => {
  const getProgressColor = () => {
    if (progress >= 90) return 'bg-red-500';
    if (progress >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getProgressTextColor = () => {
    if (progress >= 90) return 'text-red-700 dark:text-red-400';
    if (progress >= 75) return 'text-amber-700 dark:text-amber-400';
    return 'text-emerald-700 dark:text-emerald-400';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 transition-smooth hover:shadow-elevation-2">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="MapPin" size={20} color="var(--color-primary)" />
          </div>
          <div className="min-w-0">
            <h3 className="text-foreground font-semibold text-base md:text-lg truncate">{city}</h3>
            <p className="text-muted-foreground text-xs md:text-sm">Daily Avg: <span className="data-text font-medium">₹{dailyAverage?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></p>
          </div>
        </div>
        <div className={`text-sm md:text-base font-semibold ${getProgressTextColor()} whitespace-nowrap`}>
          {progress?.toFixed(1)}% Used
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
        <div>
          <p className="text-muted-foreground text-xs mb-1">Allocated</p>
          <p className="text-foreground font-semibold text-sm md:text-base data-text">₹{allocated?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Spent</p>
          <p className="text-foreground font-semibold text-sm md:text-base data-text">₹{spent?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Remaining</p>
          <p className={`font-semibold text-sm md:text-base data-text ${remaining < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            ₹{Math.abs(remaining)?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full ${getProgressColor()} transition-all duration-500`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default CityBudgetRow;