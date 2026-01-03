import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-8 md:p-12 lg:p-16 text-center">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Icon name="Compass" size={40} color="var(--color-primary)" />
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
        Start Your Journey
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        You haven't created any trips yet. Begin planning your next adventure and track your travel budget with ease.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="default"
          size="lg"
          iconName="Plus"
          iconPosition="left"
          onClick={() => navigate('/my-trips')}
        >
          Create Your First Trip
        </Button>
        <Button
          variant="outline"
          size="lg"
          iconName="Compass"
          iconPosition="left"
          onClick={() => navigate('/my-trips')}
        >
          Browse Community Trips
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;