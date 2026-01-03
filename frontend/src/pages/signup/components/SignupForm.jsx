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
            {/* Name Field */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon name="User" size={18} />
                    </div>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                        required
                    />
                </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
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
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                        required
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon name="Lock" size={18} />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                        required
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
                    <span className="text-gray-600">I agree to the </span>
                    <button type="button" className="font-semibold text-blue-600 hover:text-blue-700">Terms of Service</button>
                    <span className="text-gray-600"> and </span>
                    <button type="button" className="font-semibold text-blue-600 hover:text-blue-700">Privacy Policy</button>
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
