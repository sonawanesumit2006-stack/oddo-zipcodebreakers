import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CostTrackingSection = ({ formData, onChange, tripBudget }) => {
  const currencies = [
    { value: 'INR', label: 'INR - Indian Rupee' },
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'AED', label: 'AED - UAE Dirham' },
    { value: 'SGD', label: 'SGD - Singapore Dollar' }
  ];

  const basePrice = parseFloat(formData?.basePrice) || 0;
  const additionalFees = parseFloat(formData?.additionalFees) || 0;
  const totalCost = basePrice + additionalFees;
  const remainingBudget = tripBudget - totalCost;
  const budgetImpact = tripBudget > 0 ? ((totalCost / tripBudget) * 100)?.toFixed(1) : 0;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Base Price"
          type="number"
          name="basePrice"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={formData?.basePrice || ''}
          onChange={onChange}
          required
        />
        <Input
          label="Additional Fees"
          type="number"
          name="additionalFees"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={formData?.additionalFees || ''}
          onChange={onChange}
          description="Taxes, service charges, etc."
        />
      </div>
      <Select
        label="Currency"
        options={currencies}
        value={formData?.currency || 'INR'}
        onChange={(value) => onChange({ target: { name: 'currency', value } })}
        placeholder="Select currency"
      />
      <div className="bg-muted rounded-lg p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-muted-foreground">Total Cost</span>
          <span className="text-xl md:text-2xl font-bold text-foreground">
            ₹{totalCost?.toFixed(2)}
          </span>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Trip Budget</span>
            <span className="font-medium text-foreground">₹{tripBudget?.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Remaining After</span>
            <span className={`font-medium ${remainingBudget >= 0 ? 'text-success' : 'text-destructive'}`}>
              ₹{remainingBudget?.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget Impact</span>
            <span className="font-medium text-foreground">{budgetImpact}%</span>
          </div>
        </div>

        {remainingBudget < 0 && (
          <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} color="var(--color-destructive)" className="mt-0.5 flex-shrink-0" />
            <p className="text-xs md:text-sm text-destructive">
              This activity exceeds your remaining trip budget by ₹{Math.abs(remainingBudget)?.toFixed(2)}
            </p>
          </div>
        )}

        {remainingBudget >= 0 && remainingBudget < tripBudget * 0.1 && (
          <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="AlertCircle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
            <p className="text-xs md:text-sm text-warning">
              This activity will use {budgetImpact}% of your trip budget
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostTrackingSection;