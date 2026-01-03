import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTemplates = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 1,
      name: 'Museum Visit',
      category: 'activity',
      icon: 'Building2',
      description: 'Cultural museum experience',
      estimatedCost: 25,
      duration: 2
    },
    {
      id: 2,
      name: 'City Tour',
      category: 'activity',
      icon: 'MapPin',
      description: 'Guided city sightseeing',
      estimatedCost: 45,
      duration: 3
    },
    {
      id: 3,
      name: 'Fine Dining',
      category: 'food',
      icon: 'Utensils',
      description: 'Restaurant reservation',
      estimatedCost: 80,
      duration: 2
    },
    {
      id: 4,
      name: 'Airport Transfer',
      category: 'transport',
      icon: 'Car',
      description: 'Hotel to airport',
      estimatedCost: 35,
      duration: 1
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Quick Templates</h3>
        <span className="text-xs md:text-sm text-muted-foreground">Popular activities</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {templates?.map((template) => (
          <button
            key={template?.id}
            type="button"
            onClick={() => onSelectTemplate(template)}
            className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-elevation-2 transition-smooth text-left"
          >
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-lg">
              <Icon name={template?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                {template?.name}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {template?.description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span>₹{template?.estimatedCost}</span>
                <span>•</span>
                <span>{template?.duration}h</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityTemplates;