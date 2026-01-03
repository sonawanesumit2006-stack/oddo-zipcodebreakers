import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const SignUpPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 md:mt-8 lg:mt-10 pt-6 md:pt-8 lg:pt-10 border-t border-border">
      <div className="text-center space-y-4 md:space-y-5 lg:space-y-6">
        <p className="text-sm md:text-base text-muted-foreground">
          Don't have an account yet?
        </p>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
          onClick={() => navigate('/signup')}
        >
          Create New Account
        </Button>
        <p className="text-xs md:text-sm text-muted-foreground">
          Join thousands of travelers planning their perfect trips
        </p>
      </div>
    </div>
  );
};

export default SignUpPrompt;