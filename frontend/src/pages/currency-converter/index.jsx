import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CurrencyConverter = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [exchangeRates, setExchangeRates] = useState({});
    const [lastUpdated, setLastUpdated] = useState(null);

    const API_KEY = 'b8b50c240bd588a351514a6d';
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
        { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
        { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
        { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
        { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' }
    ];

    // Fetch exchange rates from API
    const fetchExchangeRates = async (baseCurrency) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}${baseCurrency}`);
            const data = await response.json();

            if (data.result === 'success') {
                setExchangeRates(data.conversion_rates);
                setLastUpdated(new Date(data.time_last_update_unix * 1000));
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            setLoading(false);
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchExchangeRates(fromCurrency);
    }, []);

    // Refetch when base currency changes
    useEffect(() => {
        fetchExchangeRates(fromCurrency);
    }, [fromCurrency]);

    const handleConvert = () => {
        if (exchangeRates[toCurrency]) {
            const rate = exchangeRates[toCurrency];
            const converted = parseFloat(amount) * rate;
            setResult(converted.toFixed(2));
        }
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult(null);
    };

    useEffect(() => {
        if (amount && fromCurrency && toCurrency && exchangeRates[toCurrency]) {
            handleConvert();
        }
    }, [amount, toCurrency, exchangeRates]);

    const getSymbol = (code) => currencies.find(c => c.code === code)?.symbol || '';
    const getFlag = (code) => currencies.find(c => c.code === code)?.flag || '';

    return (
        <div className="min-h-screen bg-gray-50">
            <SidebarNavigation isCollapsed={isSidebarCollapsed} />

            <main className={`transition-smooth pt-20 lg:pt-0 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">

                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <Icon name="ArrowLeft" size={20} />
                            <span className="text-sm font-medium">Back to Dashboard</span>
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Currency Converter</h1>
                        <p className="text-gray-600">Convert currencies for your travel planning</p>
                    </div>

                    {/* Main Converter Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                        {/* Gradient Header */}
                        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <Icon name="DollarSign" className="text-white" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Quick Convert</h2>
                                    <p className="text-blue-100 text-sm">Real-time exchange rates</p>
                                </div>
                            </div>
                        </div>

                        {/* Converter Body */}
                        <div className="p-8">

                            {/* From Currency */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">From</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="relative">
                                            <select
                                                value={fromCurrency}
                                                onChange={(e) => setFromCurrency(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer text-gray-900 font-medium"
                                            >
                                                {currencies.map(curr => (
                                                    <option key={curr.code} value={curr.code}>
                                                        {curr.code} - {curr.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
                                                {getFlag(fromCurrency)}
                                            </div>
                                            <Icon name="ChevronDown" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 font-semibold text-lg"
                                                placeholder="0.00"
                                            />
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">
                                                {getSymbol(fromCurrency)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Swap Button */}
                            <div className="flex justify-center -my-3 relative z-10">
                                <button
                                    onClick={handleSwap}
                                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
                                >
                                    <Icon name="ArrowDownUp" className="group-hover:rotate-180 transition-transform duration-300" size={20} />
                                </button>
                            </div>

                            {/* To Currency */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">To</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="relative">
                                            <select
                                                value={toCurrency}
                                                onChange={(e) => setToCurrency(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer text-gray-900 font-medium"
                                            >
                                                {currencies.map(curr => (
                                                    <option key={curr.code} value={curr.code}>
                                                        {curr.code} - {curr.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
                                                {getFlag(toCurrency)}
                                            </div>
                                            <Icon name="ChevronDown" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <div className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl text-blue-900 font-bold text-lg flex items-center">
                                                {loading ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="text-sm">Converting...</span>
                                                    </div>
                                                ) : (
                                                    result || '0.00'
                                                )}
                                            </div>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700 font-medium pointer-events-none">
                                                {getSymbol(toCurrency)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Exchange Rate Info */}
                            {result && exchangeRates[toCurrency] && (
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Icon name="TrendingUp" className="text-blue-600" size={18} />
                                            <span className="text-sm text-gray-700">Exchange Rate</span>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            1 {fromCurrency} = {exchangeRates[toCurrency].toFixed(4)} {toCurrency}
                                        </div>
                                    </div>
                                    {lastUpdated && (
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <Icon name="Clock" size={12} />
                                            Last updated: {lastUpdated.toLocaleTimeString()}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Popular Conversions */}
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Conversions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { from: 'USD', to: 'INR', label: 'Dollar to Rupee' },
                                { from: 'EUR', to: 'USD', label: 'Euro to Dollar' },
                                { from: 'GBP', to: 'EUR', label: 'Pound to Euro' }
                            ].map((conv, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setFromCurrency(conv.from);
                                        setToCurrency(conv.to);
                                    }}
                                    className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl">{getFlag(conv.from)}</span>
                                        <Icon name="ArrowRight" className="text-gray-400 group-hover:text-blue-600 transition-colors" size={16} />
                                        <span className="text-2xl">{getFlag(conv.to)}</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">{conv.label}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {fromCurrency === conv.from && exchangeRates[conv.to] ? (
                                            <>1 {conv.from} = {exchangeRates[conv.to].toFixed(2)} {conv.to}</>
                                        ) : (
                                            'Click to view rate'
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CurrencyConverter;
