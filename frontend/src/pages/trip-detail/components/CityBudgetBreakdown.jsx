import React from 'react';
import Icon from '../../../components/AppIcon';

const CityBudgetBreakdown = ({ cities }) => {
  const maxBudget = Math.max(...cities?.map(city => city?.spent));

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">City-wise Cost Breakdown</h3>
        <Icon name="MapPin" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-4 md:space-y-5">
        {cities?.map((city) => {
          const percentage = (city?.spent / maxBudget) * 100;
          const isOverBudget = city?.spent > city?.budget;
          
          return (
            <div key={city?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <Icon name="MapPin" size={16} color={isOverBudget ? '#F59E0B' : '#22C55E'} />
                  <span className="font-medium text-sm md:text-base text-foreground truncate">{city?.name}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                  <span className="text-sm md:text-base font-semibold text-foreground whitespace-nowrap">
                    ₹{city?.spent?.toLocaleString()}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                    / ₹{city?.budget?.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: isOverBudget ? '#F59E0B' : '#22C55E'
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{Math.round(percentage)}% utilized</span>
                {isOverBudget && (
                  <span className="text-warning font-medium">
                    ₹{(city?.spent - city?.budget)?.toLocaleString()} over budget
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityBudgetBreakdown;