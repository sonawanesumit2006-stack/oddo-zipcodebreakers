import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityCard = ({ activity, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryConfig = {
    Transport: { color: '#3B82F6', bgColor: '#3B82F620', icon: 'Car' },
    Accommodation: { color: '#8B5CF6', bgColor: '#8B5CF620', icon: 'Home' },
    Food: { color: '#F59E0B', bgColor: '#F59E0B20', icon: 'Utensils' },
    Activity: { color: '#10B981', bgColor: '#10B98120', icon: 'Ticket' }
  };

  const config = categoryConfig?.[activity?.category] || categoryConfig?.Activity;

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-5 transition-smooth hover:shadow-elevation-2">
      <div className="flex items-start gap-3 md:gap-4">
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: config?.bgColor }}
        >
          <Icon name={config?.icon} size={20} color={config?.color} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-1 truncate">
                {activity?.title}
              </h4>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                  <span>{activity?.time}</span>
                </div>
                {activity?.location && (
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
                    <span className="truncate max-w-[150px] md:max-w-none">{activity?.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-base md:text-lg font-semibold text-foreground whitespace-nowrap">
                ₹{activity?.cost?.toLocaleString()}
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-smooth"
                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
              >
                <Icon 
                  name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                  size={18} 
                  color="var(--color-foreground)" 
                />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span 
              className="px-2 md:px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: config?.bgColor,
                color: config?.color 
              }}
            >
              {activity?.category}
            </span>
            {activity?.isPaid && (
              <span className="px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                Paid
              </span>
            )}
          </div>
          
          {isExpanded && activity?.description && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">{activity?.description}</p>
              {activity?.notes && (
                <div className="bg-muted rounded-lg p-3 mb-3">
                  <p className="text-xs md:text-sm text-foreground">
                    <span className="font-medium">Notes: </span>
                    {activity?.notes}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={() => onEdit(activity)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => onDelete(activity?.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;