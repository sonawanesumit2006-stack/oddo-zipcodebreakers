import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import api from '../../../api/axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // FastAPI OAuth2PasswordRequestForm expects form-data, not JSON
      const params = new URLSearchParams();
      params.append('username', formData.email); // OAuth2 'username' field maps to email
      params.append('password', formData.password);

      const response = await api.post('/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Save data
      const { access_token, user } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');

      // Redirect
      navigate('/dashboard');

    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.detail || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Email address</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="Mail" size={18} />
          </div>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="Lock" size={18} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 text-gray-900"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm shadow-blue-200 disabled:opacity-50"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;