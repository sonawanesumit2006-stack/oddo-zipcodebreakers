import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import CategorySelector from './components/CategorySelector';
import LocationInput from './components/LocationInput';
import CategorySpecificFields from './components/CategorySpecificFields';
import CostTrackingSection from './components/CostTrackingSection';
import ActivityTemplates from './components/ActivityTemplates';
import FileAttachment from './components/FileAttachment';

const ActivityManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTemplates, setShowTemplates] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    coordinates: { lat: null, lng: null },
    date: '',
    time: '',
    basePrice: '',
    additionalFees: '',
    currency: 'INR',
    notes: '',
    contactInfo: '',
    transportType: '',
    departurePoint: '',
    arrivalPoint: '',
    bookingReference: '',
    accommodationType: '',
    checkInDate: '',
    checkOutDate: '',
    confirmationNumber: '',
    cuisineType: '',
    restaurantName: '',
    reservationTime: '',
    activityType: '',
    duration: ''
  });

  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});

  const tripBudget = 5000;

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
    setShowTemplates(false);
  };

  const handleCoordinatesChange = (coords) => {
    setFormData(prev => ({
      ...prev,
      coordinates: coords
    }));
  };

  const handleTemplateSelect = (template) => {
    setFormData(prev => ({
      ...prev,
      category: template?.category,
      basePrice: template?.estimatedCost?.toString(),
      duration: template?.duration?.toString()
    }));
    setShowTemplates(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Activity title is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData?.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData?.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData?.basePrice || parseFloat(formData?.basePrice) < 0) {
      newErrors.basePrice = 'Valid base price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e, saveAndAddAnother = false) => {
    e?.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    console.log('Activity saved:', formData);
    console.log('Attachments:', attachments);

    if (saveAndAddAnother) {
      setFormData({
        title: '',
        category: '',
        location: '',
        coordinates: { lat: null, lng: null },
        date: '',
        time: '',
        basePrice: '',
        additionalFees: '',
        currency: 'INR',
        notes: '',
        contactInfo: '',
        transportType: '',
        departurePoint: '',
        arrivalPoint: '',
        bookingReference: '',
        accommodationType: '',
        checkInDate: '',
        checkOutDate: '',
        confirmationNumber: '',
        cuisineType: '',
        restaurantName: '',
        reservationTime: '',
        activityType: '',
        duration: ''
      });
      setAttachments([]);
      setShowTemplates(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/trip-detail');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation isCollapsed={sidebarCollapsed} />
      <main className={`transition-smooth ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Add Activity
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                Create a new activity for your trip itinerary
              </p>
            </div>
            <Button
              variant="ghost"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => navigate('/trip-detail')}
            >
              Back to Itinerary
            </Button>
          </div>

          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6 md:space-y-8">
            {showTemplates && (
              <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2">
                <ActivityTemplates onSelectTemplate={handleTemplateSelect} />
              </div>
            )}

            <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
                Activity Category
              </h2>
              <CategorySelector
                selectedCategory={formData?.category}
                onCategoryChange={handleCategoryChange}
              />
              {errors?.category && (
                <p className="text-sm text-destructive mt-2">{errors?.category}</p>
              )}
            </div>

            <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 space-y-4 md:space-y-6">
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                Basic Information
              </h2>

              <Input
                label="Activity Title"
                type="text"
                name="title"
                placeholder="e.g., Visit Eiffel Tower"
                value={formData?.title}
                onChange={handleInputChange}
                error={errors?.title}
                required
              />

              <LocationInput
                value={formData?.location}
                onChange={(e) => handleInputChange({ target: { name: 'location', value: e?.target?.value } })}
                onCoordinatesChange={handleCoordinatesChange}
              />
              {errors?.location && (
                <p className="text-sm text-destructive">{errors?.location}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  value={formData?.date}
                  onChange={handleInputChange}
                  error={errors?.date}
                  required
                />
                <Input
                  label="Time"
                  type="time"
                  name="time"
                  value={formData?.time}
                  onChange={handleInputChange}
                  error={errors?.time}
                  required
                />
              </div>
            </div>

            {formData?.category && (
              <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 space-y-4 md:space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">
                  Category Details
                </h2>
                <CategorySpecificFields
                  category={formData?.category}
                  formData={formData}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 space-y-4 md:space-y-6">
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                Cost Information
              </h2>
              <CostTrackingSection
                formData={formData}
                onChange={handleInputChange}
                tripBudget={tripBudget}
              />
            </div>

            <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 space-y-4 md:space-y-6">
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                Additional Details
              </h2>

              <Input
                label="Contact Information"
                type="text"
                name="contactInfo"
                placeholder="Phone number or email"
                value={formData?.contactInfo}
                onChange={handleInputChange}
                description="Optional contact details for bookings"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows="4"
                  placeholder="Add any additional notes or special instructions..."
                  value={formData?.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                />
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 space-y-4 md:space-y-6">
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                Attachments
              </h2>
              <p className="text-sm text-muted-foreground">
                Upload tickets, confirmations, or other relevant documents
              </p>
              <FileAttachment
                attachments={attachments}
                onAttachmentsChange={setAttachments}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 sticky bottom-0 bg-background py-4 border-t border-border">
              <Button
                type="submit"
                variant="default"
                size="lg"
                iconName="Check"
                iconPosition="left"
                className="flex-1"
              >
                Save Activity
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                iconName="Plus"
                iconPosition="left"
                onClick={(e) => handleSubmit(e, true)}
                className="flex-1"
              >
                Save &amp; Add Another
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => navigate('/trip-detail')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ActivityManagement;