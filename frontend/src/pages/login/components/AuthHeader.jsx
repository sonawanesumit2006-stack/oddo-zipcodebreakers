import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  return (
    <div className="text-center space-y-3 md:space-y-4 lg:space-y-5">
      <div className="flex justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-elevation-3">
          <Icon name="Plane" size={40} color="#FFFFFF" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Welcome Back to GlobeTrotter
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-md mx-auto">
          Sign in to access your travel plans, manage budgets, and continue your journey
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;