import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BudgetLimitModal = ({ isOpen, onClose, onSave }) => {
  const [limitType, setLimitType] = useState('city');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');

  const cityOptions = [
    { value: 'jaipur', label: 'Jaipur, Rajasthan' },
    { value: 'udaipur', label: 'Udaipur, Rajasthan' },
    { value: 'jodhpur', label: 'Jodhpur, Rajasthan' },
    { value: 'jaisalmer', label: 'Jaisalmer, Rajasthan' }
  ];

  const categoryOptions = [
    { value: 'transport', label: 'Transport' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'food', label: 'Food' },
    { value: 'activity', label: 'Activity' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'other', label: 'Other' }
  ];

  const limitTypeOptions = [
    { value: 'city', label: 'City Budget' },
    { value: 'category', label: 'Category Budget' },
    { value: 'daily', label: 'Daily Limit' }
  ];

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    const limitData = {
      type: limitType,
      city: limitType === 'city' ? selectedCity : null,
      category: limitType === 'category' ? selectedCategory : null,
      amount: parseFloat(amount)
    };
    
    onSave(limitData);
    handleClose();
  };

  const handleClose = () => {
    setLimitType('city');
    setSelectedCity('');
    setSelectedCategory('');
    setAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-card border border-border rounded-xl shadow-elevation-5 w-full max-w-md p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-foreground text-xl md:text-2xl font-semibold">Set Budget Limit</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="var(--color-foreground)" />
          </button>
        </div>

        <div className="space-y-4 md:space-y-5">
          <Select
            label="Limit Type"
            options={limitTypeOptions}
            value={limitType}
            onChange={setLimitType}
            required
          />

          {limitType === 'city' && (
            <Select
              label="Select City"
              options={cityOptions}
              value={selectedCity}
              onChange={setSelectedCity}
              placeholder="Choose a city"
              required
            />
          )}

          {limitType === 'category' && (
            <Select
              label="Select Category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Choose a category"
              required
            />
          )}

          <Input
            label="Budget Amount"
            type="number"
            placeholder="Enter amount in INR"
            value={amount}
            onChange={(e) => setAmount(e?.target?.value)}
            required
            min="0"
            step="0.01"
          />

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground text-sm">
                Setting a budget limit will help you track spending and receive alerts when approaching the threshold.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 md:mt-8">
          <Button
            variant="outline"
            onClick={handleClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Check"
            iconPosition="left"
            fullWidth
          >
            Save Limit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetLimitModal;