import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import LoginForm from './components/LoginForm';
import SignUpPrompt from './components/SignUpPrompt';
import TrustSignals from './components/TrustSignals';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
            <div className="w-full">
              <div className="bg-card rounded-2xl shadow-elevation-3 p-6 md:p-8 lg:p-10 border border-border">
                <AuthHeader />
                
                <div className="mt-8 md:mt-10 lg:mt-12">
                  <LoginForm />
                </div>

                <SignUpPrompt />
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <p className="text-xs md:text-sm text-muted-foreground">
                  By signing in, you agree to our{' '}
                  <button
                    onClick={() => navigate('/terms')}
                    className="text-primary hover:text-secondary transition-smooth font-medium"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    onClick={() => navigate('/privacy')}
                    className="text-primary hover:text-secondary transition-smooth font-medium"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>

            <div className="w-full lg:sticky lg:top-8">
              <TrustSignals />
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-border bg-card mt-12 md:mt-16 lg:mt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date()?.getFullYear()} GlobeTrotter. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <button
                onClick={() => navigate('/help')}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Help Center
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigate('/about')}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                About
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;