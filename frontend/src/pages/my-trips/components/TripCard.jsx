import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      default:
        return 'Planned';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateBudgetPercentage = () => {
    return Math.round((trip?.spent / trip?.totalBudget) * 100);
  };

  const getBudgetStatusColor = () => {
    const percentage = calculateBudgetPercentage();
    if (percentage >= 90) return 'text-destructive';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 overflow-hidden transition-smooth hover:shadow-elevation-3 border border-border">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <Image
          src={trip?.image}
          alt={trip?.imageAlt}
          className="w-full h-full object-cover transition-smooth hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip?.status)}`}>
            {getStatusLabel(trip?.status)}
          </span>
        </div>
        {trip?.cities?.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
            <Icon name="MapPin" size={14} color="var(--color-primary)" />
            <span className="text-xs font-medium text-foreground">{trip?.cities?.length} Cities</span>
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 line-clamp-1">{trip?.title}</h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
          <span>{formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <span>{trip?.duration} days</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Budget</span>
            <span className={`text-sm font-semibold ${getBudgetStatusColor()}`}>
              ₹{trip?.spent?.toLocaleString()} / ₹{trip?.totalBudget?.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-smooth ${calculateBudgetPercentage() >= 90
                  ? 'bg-destructive'
                  : calculateBudgetPercentage() >= 75
                    ? 'bg-warning' : 'bg-success'
                }`}
              style={{ width: `${Math.min(calculateBudgetPercentage(), 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium text-foreground">{trip?.completionPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primary transition-smooth"
                style={{ width: `${trip?.completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={() => navigate(`/trip-detail/${trip?.id}`)}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            onClick={() => { }}
            className="flex-shrink-0"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            onClick={() => { }}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default TripCard;