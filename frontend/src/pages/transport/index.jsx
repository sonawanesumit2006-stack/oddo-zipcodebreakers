import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Transport = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('train');
    const [sourceStation, setSourceStation] = useState('');
    const [destStation, setDestStation] = useState('');
    const [trainList, setTrainList] = useState(null);
    const [flightFrom, setFlightFrom] = useState('');
    const [flightTo, setFlightTo] = useState('');
    const [flightDate, setFlightDate] = useState('');
    const [flightList, setFlightList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Using CORS proxy to avoid CORS issues
    const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
    const RAIL_API_KEY = 'your_api_key_here';

    // Flight API credentials
    const FLIGHT_API_KEY = 'OYtTAZ3vKyyOgOcGjLY6HDmUyT9XKJ22';
    const FLIGHT_API_SECRET = 'iGcIVN2nliNXJJqB';

    const transportTypes = [
        { id: 'train', label: 'Train', icon: 'Train', color: '#3B82F6' },
        { id: 'flight', label: 'Flight', icon: 'Plane', color: '#8B5CF6' },
        { id: 'bus', label: 'Bus', icon: 'Bus', color: '#10B981' },
        { id: 'cab', label: 'Cab', icon: 'Car', color: '#F59E0B' }
    ];

    const handleRouteSearch = async () => {
        if (!sourceStation || !destStation) {
            setError('Please enter both source and destination stations');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // API endpoint for trains between stations with CORS proxy
            const apiUrl = `http://indianrailapi.com/api/v2/TrainBetweenStations/apikey/${RAIL_API_KEY}/From/${sourceStation}/To/${destStation}/`;
            const response = await fetch(`${CORS_PROXY}${encodeURIComponent(apiUrl)}`);

            const data = await response.json();

            if (data.response_code === 200 && data.trains) {
                setTrainList(data.trains);
            } else {
                throw new Error(data.error || 'API Error');
            }
        } catch (err) {
            console.error('API Error, using mock data:', err);

            // Mock data fallback for demonstration
            setTrainList([
                {
                    name: 'Rajdhani Express',
                    number: '12301',
                    train_type: 'Superfast',
                    from_time: '16:55',
                    to_time: '09:55',
                    travel_time: '17h 00m',
                    days: 'Daily'
                },
                {
                    name: 'Shatabdi Express',
                    number: '12002',
                    train_type: 'Superfast',
                    from_time: '06:00',
                    to_time: '14:30',
                    travel_time: '8h 30m',
                    days: 'Mon, Wed, Fri'
                },
                {
                    name: 'Duronto Express',
                    number: '12259',
                    train_type: 'Duronto',
                    from_time: '22:15',
                    to_time: '13:45',
                    travel_time: '15h 30m',
                    days: 'Tue, Thu, Sun'
                },
                {
                    name: 'Garib Rath',
                    number: '12216',
                    train_type: 'Express',
                    from_time: '11:30',
                    to_time: '05:15',
                    travel_time: '17h 45m',
                    days: 'Tue, Thu, Sat'
                }
            ]);

            setError('Note: Using demo data. Replace API key or check station codes.');
        } finally {
            setLoading(false);
        }
    };

    const handleFlightSearch = async () => {
        if (!flightFrom || !flightTo) {
            setError('Please enter both departure and arrival airports');
            return;
        }

        setLoading(true);
        setError(null);
        setFlightList(null);

        try {
            // AviationStack API endpoint for route-based search
            const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${FLIGHT_API_KEY}&dep_iata=${flightFrom}&arr_iata=${flightTo}`;
            const response = await fetch(apiUrl);

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setFlightList(data.data);
            } else {
                throw new Error('No flights found');
            }
        } catch (err) {
            console.error('Flight API Error, using mock data:', err);

            // Mock flight data
            setFlightList([
                {
                    flight_date: flightDate || '2026-01-10',
                    flight_status: 'scheduled',
                    flight: { number: 'AI101', iata: 'AI101' },
                    airline: { name: 'Air India', iata: 'AI' },
                    departure: {
                        airport: 'Indira Gandhi International',
                        iata: flightFrom || 'DEL',
                        scheduled: '2026-01-10T14:30:00+00:00'
                    },
                    arrival: {
                        airport: 'Chhatrapati Shivaji International',
                        iata: flightTo || 'BOM',
                        scheduled: '2026-01-10T16:45:00+00:00'
                    }
                },
                {
                    flight_date: flightDate || '2026-01-10',
                    flight_status: 'scheduled',
                    flight: { number: '6E234', iata: '6E234' },
                    airline: { name: 'IndiGo', iata: '6E' },
                    departure: {
                        airport: 'Indira Gandhi International',
                        iata: flightFrom || 'DEL',
                        scheduled: '2026-01-10T18:15:00+00:00'
                    },
                    arrival: {
                        airport: 'Chhatrapati Shivaji International',
                        iata: flightTo || 'BOM',
                        scheduled: '2026-01-10T20:30:00+00:00'
                    }
                },
                {
                    flight_date: flightDate || '2026-01-10',
                    flight_status: 'active',
                    flight: { number: 'SG456', iata: 'SG456' },
                    airline: { name: 'SpiceJet', iata: 'SG' },
                    departure: {
                        airport: 'Indira Gandhi International',
                        iata: flightFrom || 'DEL',
                        scheduled: '2026-01-10T21:00:00+00:00'
                    },
                    arrival: {
                        airport: 'Chhatrapati Shivaji International',
                        iata: flightTo || 'BOM',
                        scheduled: '2026-01-10T23:15:00+00:00'
                    }
                }
            ]);

            setError('Note: Using demo data. Check airport codes or API limits.');
        } finally {
            setLoading(false);
        }
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transport Hub</h1>
                        <p className="text-gray-600">Track trains, flights, buses, and book cabs</p>
                    </div>

                    {/* Transport Type Tabs */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-2 mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {transportTypes.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveTab(type.id)}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === type.id
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon name={type.icon} size={20} />
                                    <span>{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Train Tracker (Coming Soon) */}
                    {activeTab === 'train' && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon name="Train" className="text-blue-600" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Train Tracker</h3>
                            <p className="text-gray-600 mb-6">Track live train status and schedules</p>
                            <Button variant="outline">Coming Soon</Button>
                        </div>
                    )}

                    {/* Flight Tracker */}
                    {activeTab === 'flight' && (
                        <div className="space-y-6">
                            {/* Search Card */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                            <Icon name="Plane" className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Flight Tracker</h2>
                                            <p className="text-purple-100 text-sm">Track live flight status</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Flight Number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={flightNumber}
                                                    onChange={(e) => setFlightNumber(e.target.value)}
                                                    placeholder="e.g. AI101"
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 font-medium"
                                                />
                                                <Icon name="Plane" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Flight Date</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={flightDate}
                                                    onChange={(e) => setFlightDate(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 font-medium"
                                                />
                                                <Icon name="Calendar" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="default"
                                        fullWidth
                                        size="lg"
                                        iconName="Search"
                                        iconPosition="left"
                                        onClick={handleFlightSearch}
                                        disabled={loading}
                                    >
                                        {loading ? 'Searching...' : 'Track Flight'}
                                    </Button>

                                    {error && (
                                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-amber-700">
                                            <Icon name="Info" size={18} />
                                            <span className="text-sm">{error}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Flight Details Result */}
                            {flightData && (
                                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-b border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{flightData.airline?.name || 'Airline'}</h3>
                                                <p className="text-gray-600">Flight {flightData.flight?.iata || flightNumber}</p>
                                            </div>
                                            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${flightData.flight_status === 'scheduled' ? 'bg-blue-500 text-white' :
                                                flightData.flight_status === 'active' ? 'bg-green-500 text-white' :
                                                    flightData.flight_status === 'landed' ? 'bg-gray-500 text-white' :
                                                        'bg-amber-500 text-white'
                                                }`}>
                                                {flightData.flight_status?.toUpperCase() || 'SCHEDULED'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Flight Route */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Departure */}
                                            <div className="bg-blue-50 rounded-2xl p-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Icon name="PlaneTakeoff" className="text-blue-600" size={20} />
                                                    <span className="text-sm font-semibold text-gray-600">Departure</span>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                                    {flightData.departure?.iata || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-600 mb-3">
                                                    {flightData.departure?.airport || 'Airport'}
                                                </div>
                                                <div className="text-lg font-semibold text-blue-600">
                                                    {flightData.departure?.scheduled ? new Date(flightData.departure.scheduled).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {flightData.departure?.scheduled ? new Date(flightData.departure.scheduled).toLocaleDateString() : ''}
                                                </div>
                                            </div>

                                            {/* Arrival */}
                                            <div className="bg-purple-50 rounded-2xl p-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Icon name="PlaneLanding" className="text-purple-600" size={20} />
                                                    <span className="text-sm font-semibold text-gray-600">Arrival</span>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                                    {flightData.arrival?.iata || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-600 mb-3">
                                                    {flightData.arrival?.airport || 'Airport'}
                                                </div>
                                                <div className="text-lg font-semibold text-purple-600">
                                                    {flightData.arrival?.scheduled ? new Date(flightData.arrival.scheduled).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {flightData.arrival?.scheduled ? new Date(flightData.arrival.scheduled).toLocaleDateString() : ''}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="text-xs text-gray-500 mb-1">Date</div>
                                                <div className="font-semibold text-gray-900">{flightData.flight_date || flightDate}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="text-xs text-gray-500 mb-1">Airline</div>
                                                <div className="font-semibold text-gray-900">{flightData.airline?.iata || 'N/A'}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="text-xs text-gray-500 mb-1">Flight No.</div>
                                                <div className="font-semibold text-gray-900">{flightData.flight?.iata || flightNumber}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="text-xs text-gray-500 mb-1">Status</div>
                                                <div className="font-semibold text-gray-900 capitalize">{flightData.flight_status || 'Scheduled'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Bus Tracker (Placeholder) */}
                    {activeTab === 'bus' && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon name="Bus" className="text-green-600" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Bus Tracker</h3>
                            <p className="text-gray-600 mb-6">Find and track bus routes</p>
                            <Button variant="outline">Coming Soon</Button>
                        </div>
                    )}

                    {/* Cab Booking (Placeholder) */}
                    {activeTab === 'cab' && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
                            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon name="Car" className="text-amber-600" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Cab Booking</h3>
                            <p className="text-gray-600 mb-6">Book cabs for your journey</p>
                            <Button variant="outline">Coming Soon</Button>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Transport;
