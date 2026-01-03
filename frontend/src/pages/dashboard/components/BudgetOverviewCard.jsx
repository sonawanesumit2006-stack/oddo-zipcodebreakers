import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BudgetOverviewCard = ({ budgetData }) => {
  const navigate = useNavigate();
  const { totalBudget, spent, remaining, spentPercentage, categories } = budgetData;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (spentPercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon name="Wallet" size={18} color="#3B82F6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Budget Overview</h3>
        </div>
        <button
          onClick={(e) => {
            e?.stopPropagation();
          }}
          className="text-gray-400 hover:text-gray-600"
          aria-label="More options"
        >
          <Icon name="MoreVertical" size={20} />
        </button>
      </div>
      {/* Circular Progress Chart */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="16"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#3B82F6"
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">{spentPercentage}%</span>
            <span className="text-sm text-gray-500">Spent</span>
          </div>
        </div>
      </div>
      {/* Budget Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Budget</span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(totalBudget)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Remaining</span>
          <span className="text-lg font-bold text-green-600">{formatCurrency(remaining)}</span>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="space-y-3 mb-6">
        {categories?.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={16} color="#3B82F6" />
              </div>
              <span className="text-sm font-medium text-gray-700">{category?.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{formatCurrency(category?.spent)}</span>
          </div>
        ))}
      </div>
      {/* Manage Budget Button */}
      <button
        onClick={() => navigate('/budget-management')}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        Manage Budget
      </button>
    </div>
  );
};

export default BudgetOverviewCard;