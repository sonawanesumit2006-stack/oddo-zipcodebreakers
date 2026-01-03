import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Icon from '../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4">
      {/* Page Background (Blurred & Dimmed) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2832&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover blur-md brightness-50"
        />
      </div>

      {/* Main Centered Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-transparent rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px] lg:h-[700px]">

        {/* Left Side - Login Form (Glassmorphism) */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card/80 dark:bg-card/70 backdrop-blur-xl border-r border-border">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <Icon name="Plane" className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Travel Planner</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Log in to your account</h1>
            <p className="text-muted-foreground">Welcome back! Please enter your details.</p>
          </div>

          {/* Google Button */}
          <button
            className="w-full flex items-center justify-center gap-3 bg-card border border-border rounded-lg p-2.5 text-foreground font-medium hover:bg-muted transition-colors mb-6 text-sm shadow-sm"
            onClick={() => console.log("Google Login")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase text-muted-foreground font-medium">
              <span className="px-2">Or continue with</span>
            </div>
          </div>

          <LoginForm />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{' '}
              <button onClick={() => navigate('/signup')} className="text-primary font-semibold hover:underline">
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Image (Original Clarity) */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2832&auto=format&fit=crop"
            alt="Tropical Destination"
            className="w-full h-full object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute top-8 right-8">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white border border-white/30">
              <Icon name="Camera" className="w-4 h-4" />
              <span className="text-sm font-medium">Maldives</span>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 right-12 text-white">
            <div className="bg-white/20 backdrop-blur-md inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border border-white/30">
              <Icon name="MapPin" className="w-3 h-3" />
              <span className="text-xs font-medium uppercase tracking-wider">Popular Destination</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">Craft your perfect journey.</h2>
            <p className="text-lg text-white/90 mb-6 font-light">
              Discover new places and plan multi-city trips with ease.
            </p>

            <div className="flex gap-2">
              <div className="w-8 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;