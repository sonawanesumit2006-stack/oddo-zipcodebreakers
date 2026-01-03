import React from 'react';
import Button from './Button';

const ContextualActionBar = ({ actions = [], className = '' }) => {
  if (!actions || actions?.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {actions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant || 'default'}
          size={action?.size || 'default'}
          iconName={action?.icon}
          iconPosition="left"
          onClick={action?.onClick}
          disabled={action?.disabled}
          className={action?.className}
        >
          {action?.label}
        </Button>
      ))}
    </div>
  );
};

export default ContextualActionBar;