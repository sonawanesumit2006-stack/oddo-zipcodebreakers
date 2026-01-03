import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PackList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});

    // Mock trips data (in real app, fetch from context/API)
    const mockTrips = [
        {
            id: 1,
            title: "Rajasthan Heritage Tour",
            cities: ["Jaipur", "Udaipur"],
            startDate: "2026-01-10",
            duration: 14,
            type: "cultural",
            climate: "hot-dry"
        },
        {
            id: 2,
            title: "Goa Beach Retreat",
            cities: ["North Goa", "South Goa"],
            startDate: "2025-11-20",
            duration: 8,
            type: "beach",
            climate: "tropical"
        },
        {
            id: 3,
            title: "Himalayan Adventure",
            cities: ["Manali", "Leh"],
            startDate: "2026-04-05",
            duration: 13,
            type: "adventure",
            climate: "cold-mountain"
        }
    ];

    // Generate packing list based on trip characteristics
    const generatePackingList = (trip) => {
        if (!trip) return {};

        const baseEssentials = {
            category: "Essentials",
            icon: "Briefcase",
            color: "#3B82F6",
            items: [
                "Passport / ID",
                "Travel tickets",
                "Hotel confirmations",
                "Travel insurance",
                "Cash & cards",
                "Phone & charger",
                "Power bank",
                "Medications"
            ]
        };

        const clothingByClimate = {
            "hot-dry": {
                category: "Clothing",
                icon: "Shirt",
                color: "#F59E0B",
                items: [
                    "Light cotton shirts",
                    "Shorts",
                    "Sunhat / cap",
                    "Sunglasses",
                    "Comfortable sandals",
                    "Light jacket (evenings)",
                    "Swimwear"
                ]
            },
            "tropical": {
                category: "Clothing",
                icon: "Shirt",
                color: "#F59E0B",
                items: [
                    "Beachwear",
                    "Light summer clothes",
                    "Flip-flops",
                    "Sunhat",
                    "Sunglasses",
                    "Light cover-up",
                    "Evening wear"
                ]
            },
            "cold-mountain": {
                category: "Clothing",
                icon: "Shirt",
                color: "#F59E0B",
                items: [
                    "Thermal wear",
                    "Warm jacket",
                    "Gloves",
                    "Woolen socks",
                    "Trekking shoes",
                    "Scarf / muffler",
                    "Waterproof pants"
                ]
            }
        };

        const typeSpecific = {
            "cultural": {
                category: "Cultural Essentials",
                icon: "Camera",
                color: "#8B5CF6",
                items: [
                    "Camera",
                    "Guidebook",
                    "Comfortable walking shoes",
                    "Modest clothing",
                    "Notebook"
                ]
            },
            "beach": {
                category: "Beach Essentials",
                icon: "Waves",
                color: "#10B981",
                items: [
                    "Sunscreen (SPF 50+)",
                    "Beach towel",
                    "Snorkeling gear",
                    "Waterproof bag",
                    "Aloe vera gel",
                    "Beach games"
                ]
            },
            "adventure": {
                category: "Adventure Gear",
                icon: "Mountain",
                color: "#EF4444",
                items: [
                    "Trekking poles",
                    "First aid kit",
                    "Water bottle",
                    "Energy bars",
                    "Headlamp / flashlight",
                    "Multi-tool knife",
                    "Rope / carabiner"
                ]
            }
        };

        const toiletries = {
            category: "Toiletries",
            icon: "Droplets",
            color: "#06B6D4",
            items: [
                "Toothbrush & paste",
                "Shampoo & soap",
                "Deodorant",
                "Razor",
                "Moisturizer",
                "Lip balm",
                "Tissues / wipes"
            ]
        };

        return {
            essentials: baseEssentials,
            clothing: clothingByClimate[trip.climate] || clothingByClimate["hot-dry"],
            typeSpecific: typeSpecific[trip.type] || typeSpecific["cultural"],
            toiletries: toiletries
        };
    };

    useEffect(() => {
        // Set first trip as default or from location state
        const tripFromState = location.state?.trip;
        setSelectedTrip(tripFromState || mockTrips[0]);
    }, []);

    const packingList = selectedTrip ? generatePackingList(selectedTrip) : {};

    const handleCheckItem = (category, item) => {
        const key = `${category}-${item}`;
        setCheckedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const getCategoryProgress = (category) => {
        const items = packingList[category]?.items || [];
        const checked = items.filter(item =>
            checkedItems[`${category}-${item}`]
        ).length;
        return items.length > 0 ? Math.round((checked / items.length) * 100) : 0;
    };

    const getTotalProgress = () => {
        const allItems = Object.keys(packingList).flatMap(cat =>
            packingList[cat]?.items || []
        );
        const allChecked = allItems.filter((item, idx) => {
            const category = Object.keys(packingList)[Math.floor(idx / (packingList[Object.keys(packingList)[0]]?.items?.length || 1))];
            return checkedItems[`${category}-${item}`];
        });
        return allItems.length > 0 ? Math.round((allChecked.length / allItems.length) * 100) : 0;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <SidebarNavigation isCollapsed={isSidebarCollapsed} />

            <main className={`transition-smooth pt-20 lg:pt-0 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
                <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">

                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <Icon name="ArrowLeft" size={20} />
                            <span className="text-sm font-medium">Back to Dashboard</span>
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Packing List</h1>
                        <p className="text-gray-600">Smart packing suggestions for your trip</p>
                    </div>

                    {/* Trip Selector */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Trip</label>
                        <select
                            value={selectedTrip?.id || ''}
                            onChange={(e) => {
                                const trip = mockTrips.find(t => t.id === parseInt(e.target.value));
                                setSelectedTrip(trip);
                                setCheckedItems({}); // Reset checklist
                            }}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer text-gray-900 font-medium"
                        >
                            {mockTrips.map(trip => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.title} - {trip.cities.join(', ')} ({trip.duration} days)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Progress Overview */}
                    {selectedTrip && (
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 mb-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{selectedTrip.title}</h2>
                                    <p className="text-blue-100 text-sm">{selectedTrip.cities.join(' → ')}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-bold">{getTotalProgress()}%</div>
                                    <div className="text-blue-100 text-sm">Packed</div>
                                </div>
                            </div>
                            <div className="w-full bg-blue-800/30 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-white h-full rounded-full transition-all duration-500"
                                    style={{ width: `${getTotalProgress()}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Packing Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.keys(packingList).map((categoryKey) => {
                            const category = packingList[categoryKey];
                            const progress = getCategoryProgress(categoryKey);

                            return (
                                <div key={categoryKey} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                                    {/* Category Header */}
                                    <div className="p-6 border-b border-gray-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                                    style={{ backgroundColor: `${category.color}15` }}
                                                >
                                                    <Icon name={category.icon} size={24} color={category.color} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
                                                    <p className="text-sm text-gray-500">{category.items.length} items</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold" style={{ color: category.color }}>
                                                    {progress}%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${progress}%`,
                                                    backgroundColor: category.color
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="p-6">
                                        <div className="space-y-3">
                                            {category.items.map((item, idx) => {
                                                const isChecked = checkedItems[`${categoryKey}-${item}`];
                                                return (
                                                    <label
                                                        key={idx}
                                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked || false}
                                                            onChange={() => handleCheckItem(categoryKey, item)}
                                                            className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                                        />
                                                        <span className={`flex-1 text-sm font-medium transition-all ${isChecked
                                                                ? 'text-gray-400 line-through'
                                                                : 'text-gray-700 group-hover:text-gray-900'
                                                            }`}>
                                                            {item}
                                                        </span>
                                                        {isChecked && (
                                                            <Icon name="Check" className="text-green-500" size={16} />
                                                        )}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-4">
                        <Button
                            variant="outline"
                            fullWidth
                            iconName="Printer"
                            iconPosition="left"
                            onClick={() => window.print()}
                        >
                            Print List
                        </Button>
                        <Button
                            variant="default"
                            fullWidth
                            iconName="Share2"
                            iconPosition="left"
                            onClick={() => alert('Share functionality coming soon!')}
                        >
                            Share List
                        </Button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PackList;
