import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import api from '../../../api/axios';

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        try {
            // Backend expects Form Data
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('username', formData.email); // Use email as username
            data.append('password', formData.password);

            // Optional fields
            data.append('bio', '');
            data.append('home_city', '');
            data.append('avatar_file', new File([""], "empty.txt", { type: "text/plain" })); // Mimic empty file upload

            await api.post('/register', data);

            alert('Account created successfully! Please login.');
            navigate('/login');

        } catch (error) {
            console.error("Signup Error:", error);
            const detail = error.response?.data?.detail;
            const errorMsg = typeof detail === 'object' ? JSON.stringify(detail) : detail;
            alert(errorMsg || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignup} className="w-full space-y-5">
            {/* Google Button */}
            <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-2.5 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm"
                onClick={() => window.location.href = "http://localhost:8000/auth/google/login"}
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign up with Google
            </button>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase text-gray-500 font-medium">
                    <span className="px-2 bg-white">Or continue with</span>
                </div>
            </div>
            {/* Name Field */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon name="User" size={18} />
                    </div>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                        required
                    />
                </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Email address</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon name="Mail" size={18} />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                        required
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon name="Lock" size={18} />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-foreground"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                </div>
            </div>

            {/* Confirm Password Field (Added for Validaton) */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon name="Lock" size={18} />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                        required
                    />
                </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2 pt-1">
                <div className="flex h-5 items-center">
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="text-sm">
                    <span className="text-muted-foreground">I agree to the </span>
                    <button type="button" className="font-semibold text-primary hover:text-primary/90">Terms of Service</button>
                    <span className="text-muted-foreground"> and </span>
                    <button type="button" className="font-semibold text-primary hover:text-primary/90">Privacy Policy</button>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm shadow-blue-200 mt-2 disabled:opacity-50"
            >
                {isLoading ? "Creating Account..." : "Create Account"}
            </button>
        </form>
    );
};

export default SignupForm;
