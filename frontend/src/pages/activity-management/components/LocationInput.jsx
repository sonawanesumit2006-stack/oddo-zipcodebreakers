import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationInput = ({ value, onChange, onCoordinatesChange }) => {
  const [showMap, setShowMap] = useState(false);
  const [suggestions] = useState([
    { id: 1, name: 'Hawa Mahal, Jaipur, Rajasthan', lat: 26.9239, lng: 75.8267 },
    { id: 2, name: 'Gateway of India, Mumbai, Maharashtra', lat: 18.9220, lng: 72.8347 },
    { id: 3, name: 'Taj Mahal, Agra, Uttar Pradesh', lat: 27.1751, lng: 78.0421 },
    { id: 4, name: 'India Gate, New Delhi', lat: 28.6129, lng: 77.2295 },
    { id: 5, name: 'Mysore Palace, Mysore, Karnataka', lat: 12.3051, lng: 76.6551 }
  ]);

  const handleSuggestionClick = (suggestion) => {
    onChange({ target: { value: suggestion?.name } });
    onCoordinatesChange({ lat: suggestion?.lat, lng: suggestion?.lng });
  };

  const handleUseCurrentLocation = () => {
    const mockLocation = { lat: 28.6139, lng: 77.2090 };
    onChange({ target: { value: 'Current Location (New Delhi)' } });
    onCoordinatesChange(mockLocation);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Input
          label="Location"
          type="text"
          placeholder="Search for a location..."
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="absolute right-3 top-9 text-primary hover:text-primary/80 transition-smooth"
          title="Use current location"
        >
          <Icon name="MapPin" size={20} />
        </button>
      </div>
      {value && value?.length > 2 && (
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 max-h-48 overflow-y-auto">
          {suggestions?.filter(s => s?.name?.toLowerCase()?.includes(value?.toLowerCase()))?.map((suggestion) => (
              <button
                key={suggestion?.id}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth text-left border-b border-border last:border-b-0"
              >
                <Icon name="MapPin" size={16} color="var(--color-primary)" />
                <span className="text-sm text-foreground">{suggestion?.name}</span>
              </button>
            ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setShowMap(!showMap)}
        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-smooth"
      >
        <Icon name={showMap ? 'ChevronUp' : 'ChevronDown'} size={16} />
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>
      {showMap && (
        <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Activity Location Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7580,-73.9855&z=14&output=embed"
          />
        </div>
      )}
    </div>
  );
};

export default LocationInput;