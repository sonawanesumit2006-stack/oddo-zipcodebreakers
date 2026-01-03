import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';

import api from '../../api/axios';

const PlanTrip = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        travelers: 1,
        budget: ''
    });
    const [stops, setStops] = useState([]);
    const [currentStop, setCurrentStop] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddStop = () => {
        if (currentStop.trim()) {
            setStops(prev => [...prev, currentStop.trim()]);
            setCurrentStop('');
        }
    };

    const handleRemoveStop = (indexToRemove) => {
        setStops(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                destination: formData.destination,
                start_date: formData.startDate,
                end_date: formData.endDate,
                travelers: parseInt(formData.travelers),
                budget: parseFloat(formData.budget) || 0,
                stops: stops
            };

            await api.post('/trips/', payload);

            alert("Trip created successfully!");
            navigate('/my-trips'); // Redirect to trips list
        } catch (error) {
            console.error("Failed to create trip:", error);
            alert("Failed to create trip. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <SidebarNavigation isCollapsed={isSidebarCollapsed} />
            <main
                className={`transition-smooth pt-20 lg:pt-0 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'
                    } min-h-screen flex flex-col`}
            >
                <div className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-8">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan a New Trip</h1>
                        <p className="text-gray-500">
                            Fill in the details below to start your next adventure.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Destination */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Where to?</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Icon name="MapPin" size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Paris, Tokyo, New York"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Stops */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Stops along the way (Optional)</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Icon name="MapPin" size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={currentStop}
                                            onChange={(e) => setCurrentStop(e.target.value)}
                                            placeholder="Add city or place"
                                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddStop(); } }}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                    <Button type="button" onClick={handleAddStop} variant="outline" className="shrink-0">
                                        Add
                                    </Button>
                                </div>

                                {stops.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {stops.map((stop, index) => (
                                            <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border border-blue-100">
                                                {stop}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveStop(index)}
                                                    className="text-blue-400 hover:text-blue-600 outline-none"
                                                >
                                                    <Icon name="X" size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Start Date */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">From</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Icon name="Calendar" size={18} />
                                        </div>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-600"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* End Date */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">To</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Icon name="Calendar" size={18} />
                                        </div>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-600"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Travelers */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Travelers</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Icon name="Users" size={18} />
                                        </div>
                                        <input
                                            type="number"
                                            name="travelers"
                                            min="1"
                                            value={formData.travelers}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Total Budget ($)</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Icon name="DollarSign" size={18} />
                                        </div>
                                        <input
                                            type="number"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 5000"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <Button
                                    variant="outline"
                                    fullWidth
                                    onClick={() => navigate('/my-trips')}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    fullWidth
                                    type="submit"
                                    disabled={isLoading}
                                    iconName={isLoading ? "Loader" : "ArrowRight"}
                                    iconPosition="right"
                                >
                                    {isLoading ? "Creating..." : "Create Trip"}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlanTrip;
