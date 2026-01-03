import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ActivityCard from './ActivityCard';

const DayTimeline = ({ day, onAddActivity, onEditActivity, onDeleteActivity }) => {
  const totalCost = day?.activities?.reduce((sum, activity) => sum + activity?.cost, 0);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white/20 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                Day {day?.dayNumber} - {day?.city}
              </h3>
              <p className="text-sm text-white/80">{day?.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-xs text-white/80">Total Cost</p>
              <p className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
                ₹{totalCost?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
          {day?.activities?.length > 0 ? (
            day?.activities?.map((activity) => (
              <ActivityCard
                key={activity?.id}
                activity={activity}
                onEdit={onEditActivity}
                onDelete={onDeleteActivity}
              />
            ))
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Icon name="Calendar" size={32} color="var(--color-muted-foreground)" />
              </div>
              <p className="text-sm md:text-base text-muted-foreground mb-2">No activities planned for this day</p>
              <p className="text-xs md:text-sm text-muted-foreground">Add your first activity to get started</p>
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={() => onAddActivity(day?.dayNumber)}
        >
          Add Activity
        </Button>
      </div>
    </div>
  );
};

export default DayTimeline;