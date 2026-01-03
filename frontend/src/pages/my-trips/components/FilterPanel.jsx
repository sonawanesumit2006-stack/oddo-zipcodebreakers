import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterPanel = ({ filters, onFilterChange, onClearFilters, isOpen, onToggle }) => {
  const statusOptions = [
    { value: 'all', label: 'All Trips' },
    { value: 'planned', label: 'Planned' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'departure-desc', label: 'Departure Date (Newest)' },
    { value: 'departure-asc', label: 'Departure Date (Oldest)' },
    { value: 'created-desc', label: 'Created Date (Newest)' },
    { value: 'created-asc', label: 'Created Date (Oldest)' },
    { value: 'budget-desc', label: 'Budget (High to Low)' },
    { value: 'budget-asc', label: 'Budget (Low to High)' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' }
  ];

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 border border-border overflow-hidden">
      <div className="p-4 md:p-5 lg:p-6 border-b border-border flex items-center justify-between lg:hidden">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName={isOpen ? 'ChevronUp' : 'ChevronDown'}
          onClick={onToggle}
        />
      </div>
      <div className={`p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <Input
          type="search"
          placeholder="Search trips, destinations..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date Range</label>
          <div className="space-y-3">
            <Input
              type="date"
              label="From"
              value={filters?.dateFrom}
              onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
            />
            <Input
              type="date"
              label="To"
              value={filters?.dateTo}
              onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
          <div className="space-y-3">
            <Input
              type="number"
              label="Min Budget ($)"
              placeholder="0"
              value={filters?.budgetMin}
              onChange={(e) => onFilterChange('budgetMin', e?.target?.value)}
            />
            <Input
              type="number"
              label="Max Budget ($)"
              placeholder="10000"
              value={filters?.budgetMax}
              onChange={(e) => onFilterChange('budgetMax', e?.target?.value)}
            />
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          iconName="X"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;