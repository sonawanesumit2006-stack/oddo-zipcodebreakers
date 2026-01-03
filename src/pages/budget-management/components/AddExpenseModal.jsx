import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddExpenseModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);

  const categoryOptions = [
    { value: 'Transport', label: 'Transport' },
    { value: 'Accommodation', label: 'Accommodation' },
    { value: 'Food', label: 'Food' },
    { value: 'Activity', label: 'Activity' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Other', label: 'Other' }
  ];

  const cityOptions = [
    { value: 'Jaipur, Rajasthan', label: 'Jaipur, Rajasthan' },
    { value: 'Udaipur, Rajasthan', label: 'Udaipur, Rajasthan' },
    { value: 'Jodhpur, Rajasthan', label: 'Jodhpur, Rajasthan' },
    { value: 'Jaisalmer, Rajasthan', label: 'Jaisalmer, Rajasthan' }
  ];

  const handleSave = () => {
    if (!description || !amount || !category || !city || parseFloat(amount) <= 0) return;
    
    const expenseData = {
      description,
      amount: parseFloat(amount),
      category,
      city,
      date: new Date(date)
    };
    
    onSave(expenseData);
    handleClose();
  };

  const handleClose = () => {
    setDescription('');
    setAmount('');
    setCategory('');
    setCity('');
    setDate(new Date()?.toISOString()?.split('T')?.[0]);
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
          <h2 className="text-foreground text-xl md:text-2xl font-semibold">Add Expense</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="var(--color-foreground)" />
          </button>
        </div>

        <div className="space-y-4 md:space-y-5">
          <Input
            label="Description"
            type="text"
            placeholder="e.g., Taxi to hotel"
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            required
          />

          <Input
            label="Amount (INR)"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e?.target?.value)}
            required
            min="0"
            step="0.01"
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            placeholder="Select category"
            required
          />

          <Select
            label="City"
            options={cityOptions}
            value={city}
            onChange={setCity}
            placeholder="Select city"
            required
          />

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e?.target?.value)}
            required
          />
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
            iconName="Plus"
            iconPosition="left"
            fullWidth
          >
            Add Expense
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;