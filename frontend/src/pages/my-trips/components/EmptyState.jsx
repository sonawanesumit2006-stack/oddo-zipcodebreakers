import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-muted flex items-center justify-center mb-4 md:mb-5 lg:mb-6">
          <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">No trips found</h3>
        <p className="text-sm md:text-base text-muted-foreground text-center mb-6 max-w-md">
          We couldn't find any trips matching your filters. Try adjusting your search criteria.
        </p>
        <Button variant="outline" iconName="X" iconPosition="left" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4">
      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-5 lg:mb-6">
        <Icon name="Plane" size={32} color="var(--color-primary)" />
      </div>
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">Start Your Journey</h3>
      <p className="text-sm md:text-base text-muted-foreground text-center mb-6 max-w-md">
        You haven't created any trips yet. Start planning your next adventure and create unforgettable memories.
      </p>
      <Button variant="default" iconName="Plus" iconPosition="left" onClick={() => navigate('/dashboard')}>
        Create Your First Trip
      </Button>
    </div>
  );
};

export default EmptyState;