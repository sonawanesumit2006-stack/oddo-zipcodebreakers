import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CategorySpecificFields = ({ category, formData, onChange }) => {
  const transportTypes = [
    { value: 'flight', label: 'Flight' },
    { value: 'train', label: 'Train' },
    { value: 'bus', label: 'Bus' },
    { value: 'car_rental', label: 'Car Rental' },
    { value: 'taxi', label: 'Taxi/Rideshare' }
  ];

  const accommodationTypes = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'resort', label: 'Resort' },
    { value: 'guesthouse', label: 'Guesthouse' }
  ];

  const cuisineTypes = [
    { value: 'north-indian', label: 'North Indian' },
    { value: 'south-indian', label: 'South Indian' },
    { value: 'rajasthani', label: 'Rajasthani' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'mughlai', label: 'Mughlai' },
    { value: 'coastal', label: 'Coastal/Seafood' }
  ];

  const activityTypes = [
    { value: 'sightseeing', label: 'Sightseeing' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'relaxation', label: 'Relaxation' }
  ];

  if (category === 'transport') {
    return (
      <div className="space-y-4">
        <Select
          label="Transport Type"
          options={transportTypes}
          value={formData?.transportType || ''}
          onChange={(value) => onChange({ target: { name: 'transportType', value } })}
          placeholder="Select transport type"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Departure Point"
            type="text"
            name="departurePoint"
            placeholder="e.g., JFK Airport"
            value={formData?.departurePoint || ''}
            onChange={onChange}
          />
          <Input
            label="Arrival Point"
            type="text"
            name="arrivalPoint"
            placeholder="e.g., CDG Airport"
            value={formData?.arrivalPoint || ''}
            onChange={onChange}
          />
        </div>
        <Input
          label="Booking Reference"
          type="text"
          name="bookingReference"
          placeholder="e.g., ABC123XYZ"
          value={formData?.bookingReference || ''}
          onChange={onChange}
        />
      </div>
    );
  }

  if (category === 'accommodation') {
    return (
      <div className="space-y-4">
        <Select
          label="Accommodation Type"
          options={accommodationTypes}
          value={formData?.accommodationType || ''}
          onChange={(value) => onChange({ target: { name: 'accommodationType', value } })}
          placeholder="Select accommodation type"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Check-in Date"
            type="date"
            name="checkInDate"
            value={formData?.checkInDate || ''}
            onChange={onChange}
          />
          <Input
            label="Check-out Date"
            type="date"
            name="checkOutDate"
            value={formData?.checkOutDate || ''}
            onChange={onChange}
          />
        </div>
        <Input
          label="Confirmation Number"
          type="text"
          name="confirmationNumber"
          placeholder="e.g., HTL-2026-001"
          value={formData?.confirmationNumber || ''}
          onChange={onChange}
        />
      </div>
    );
  }

  if (category === 'food') {
    return (
      <div className="space-y-4">
        <Select
          label="Cuisine Type"
          options={cuisineTypes}
          value={formData?.cuisineType || ''}
          onChange={(value) => onChange({ target: { name: 'cuisineType', value } })}
          placeholder="Select cuisine type"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Restaurant Name"
            type="text"
            name="restaurantName"
            placeholder="e.g., Le Petit Bistro"
            value={formData?.restaurantName || ''}
            onChange={onChange}
          />
          <Input
            label="Reservation Time"
            type="time"
            name="reservationTime"
            value={formData?.reservationTime || ''}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }

  if (category === 'activity') {
    return (
      <div className="space-y-4">
        <Select
          label="Activity Type"
          options={activityTypes}
          value={formData?.activityType || ''}
          onChange={(value) => onChange({ target: { name: 'activityType', value } })}
          placeholder="Select activity type"
          required
        />
        <Input
          label="Duration (hours)"
          type="number"
          name="duration"
          placeholder="e.g., 2.5"
          min="0.5"
          step="0.5"
          value={formData?.duration || ''}
          onChange={onChange}
        />
      </div>
    );
  }

  return null;
};

export default CategorySpecificFields;