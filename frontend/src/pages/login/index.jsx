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
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2832&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
          style={{ filter: 'blur(8px)' }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Centered Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px] lg:h-[700px]">

        {/* Left Side - Login Form (Solid White) */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <Icon name="Plane" className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Travel Planner</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Log in to your account</h1>
            <p className="text-gray-600">Welcome back! Please enter your details.</p>
          </div>

          <LoginForm />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button onClick={() => navigate('/signup')} className="text-blue-600 font-semibold hover:underline">
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
    </div >
  );
};

export default Login;