import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineViewToggle = ({ activeView, onViewChange }) => {
  const views = [
    { id: 'day', label: 'Day View', icon: 'Calendar' },
    { id: 'city', label: 'City View', icon: 'MapPin' }
  ];

  return (
    <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
      {views?.map((view) => (
        <button
          key={view?.id}
          onClick={() => onViewChange(view?.id)}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-md transition-smooth text-sm md:text-base ${
            activeView === view?.id
              ? 'bg-primary text-primary-foreground shadow-elevation-1'
              : 'text-foreground hover:bg-card'
          }`}
        >
          <Icon 
            name={view?.icon} 
            size={16} 
            color={activeView === view?.id ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'} 
          />
          <span className="font-medium hidden sm:inline">{view?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TimelineViewToggle;