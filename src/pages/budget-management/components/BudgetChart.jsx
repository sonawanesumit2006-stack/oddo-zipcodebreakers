import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="text-foreground font-medium text-sm mb-2">{payload?.[0]?.payload?.city}</p>
          <div className="space-y-1">
            <p className="text-xs">
              <span className="text-primary font-medium">Allocated:</span>{' '}
              <span className="data-text">₹{payload?.[0]?.value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </p>
            <p className="text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Spent:</span>{' '}
              <span className="data-text">₹{payload?.[1]?.value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-foreground text-lg md:text-xl font-semibold mb-4 md:mb-6">Budget vs Spending</h2>
      <div className="w-full h-64 md:h-80" aria-label="Budget comparison bar chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="city" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
            />
            <YAxis 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: 'var(--color-foreground)' }}
              iconType="circle"
            />
            <Bar dataKey="allocated" fill="var(--color-primary)" radius={[8, 8, 0, 0]} name="Allocated" />
            <Bar dataKey="spent" fill="#10B981" radius={[8, 8, 0, 0]} name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetChart;