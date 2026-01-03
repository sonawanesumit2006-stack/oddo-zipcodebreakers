import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TripHeader = ({ trip, onShare, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 border border-border overflow-hidden mb-6 md:mb-8">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={trip?.coverImage}
          alt={trip?.coverImageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => navigate('/my-trips')}
          className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-white/90 dark:bg-card/90 backdrop-blur-sm flex items-center justify-center transition-smooth hover:bg-white dark:hover:bg-white/5"
          aria-label="Back to trips"
        >
          <Icon name="ArrowLeft" size={20} color="var(--color-foreground)" />
        </button>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {trip?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                <span>{trip?.startDate} - {trip?.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                <span>{trip?.cities?.length} Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
                <span>{trip?.travelers} Travelers</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Button
              variant="outline"
              size="default"
              iconName="Share2"
              iconPosition="left"
              onClick={onShare}
            >
              Share
            </Button>
            <Button
              variant="default"
              size="default"
              iconName="Edit"
              iconPosition="left"
              onClick={onEdit}
            >
              Edit Trip
            </Button>
          </div>
        </div>
        
        {trip?.description && (
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
            {trip?.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TripHeader;