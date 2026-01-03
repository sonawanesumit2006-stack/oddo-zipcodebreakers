import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 py-6">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Icon name="Plane" className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">GlobeTrotter</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-white/90 font-medium text-sm">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-white font-medium text-sm hover:text-white/80"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium text-sm hover:bg-blue-50 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center text-center px-4">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
                        alt="Mountain Lake"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-4xl mx-auto mt-16">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold mb-6 border border-white/20">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        #1 Travel Planning Platform
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Discover the World,<br />
                        <span className="text-blue-200">Plan the Details.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Create multi-city itineraries, manage budgets, and share your journey seamlessly. Experience the freedom of organized travel with GlobeTrotter.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-4 h-14 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 hover:bg-white transition-all">
                            <Icon name="Search" className="text-gray-400 mr-3 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Where is your dream destination?"
                                className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 h-14 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 hover:bg-white transition-all">
                            <Icon name="Calendar" className="text-gray-400 mr-3 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Dates"
                                className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 h-14 flex items-center justify-center gap-2 transition-colors">
                            Start Planning
                            <Icon name="ArrowRight" className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-2 text-white/80 text-sm">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                                +2k
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="flex text-yellow-400 text-xs">
                                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                            </div>
                            <span>Loved by 10,000+ travelers worldwide</span>
                        </div>
                        <Icon name="ChevronDown" className="w-6 h-6 animate-bounce mt-4 opacity-50" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-muted/50" id="features">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-2 block">Why GlobeTrotter?</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Everything you need for the <span className="text-blue-600">perfect trip</span>
                        </h2>
                        <p className="text-muted-foreground">
                            Smart automation meets beautiful design. We handle the logistics so you can focus on the memories.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Icon name="GitBranch" className="text-blue-600 w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Smart Routing AI</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Instantly optimize travel paths between cities. Our AI calculates the most efficient route to save you time and money.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Icon name="DollarSign" className="text-cyan-600 w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Budget Control</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Real-time expense tracking against your daily limits. Visualize spending categories and stay financially on track.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Icon name="Users" className="text-purple-600 w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Collaborative Planning</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Invite friends and family to co-edit itineraries. Vote on activities and sync plans across everyone's devices instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary Visualization Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                                LIVE PREVIEW
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Your Itinerary, <br />
                                <span className="text-blue-600">Visualized Beautifully</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                No more messy spreadsheets. GlobeTrotter turns your bookings into a cohesive, easy-to-read timeline. Drag, drop, and customize your days with ease.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {['Automatic timezone adjustments', 'Offline access to all your plans', 'One-click PDF export'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <Icon name="Check" className="w-3 h-3 text-green-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all group">
                                See how it works
                                <Icon name="ArrowRight" className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            {/* Mock Itinerary Card */}
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold">Europe Summer 2024</h3>
                                        <p className="text-sm text-muted-foreground">June 14 - June 24 • 2 Travelers</p>
                                    </div>
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                                        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                                    </div>
                                </div>

                                <div className="space-y-6 relative">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                    {/* Event 1 */}
                                    <div className="relative flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 z-10 border-4 border-white">
                                            <Icon name="Plane" className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-blue-50/50 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-semibold text-gray-900">Arrive in Paris</span>
                                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">CONFIRMED</span>
                                            </div>
                                            <p className="text-xs text-gray-500">10:00 AM • Charles de Gaulle (CDG)</p>
                                        </div>
                                    </div>

                                    {/* Event 2 */}
                                    <div className="relative flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 z-10 border-4 border-white">
                                            <Icon name="Utensils" className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-orange-50/50 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-semibold text-foreground">Lunch at Le Train Bleu</span>
                                                <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded">RESERVED</span>
                                            </div>
                                            <p className="text-xs text-gray-500">12:30 PM • Gare de Lyon</p>
                                        </div>
                                    </div>

                                    {/* Event 3 */}
                                    <div className="relative flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 z-10 border-4 border-white">
                                            <Icon name="Camera" className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-purple-50/50 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-semibold text-gray-900">Louvre Museum Tour</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2">03:00 PM • Rue de Rivoli</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] border border-gray-200 px-1.5 py-0.5 rounded text-gray-500 bg-white">
                                                    🎫 Tickets x2
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / CTA Section */}
            <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Ready to start your <br />next adventure?
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-md">
                                Join over 50,000 travelers who are planning smarter, exploring further, and spending less.
                            </p>
                            <button
                                onClick={() => navigate('/signup')}
                                className="bg-white text-[#0F172A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Create Free Account
                            </button>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-3xl font-bold text-blue-400 mb-1">50k+</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">Active Users</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-3xl font-bold text-purple-400 mb-1">120+</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">Countries</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-3xl font-bold text-cyan-400 mb-1">1M+</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">Itineraries</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-3xl font-bold text-yellow-400 mb-1">4.9</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">App Store Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-16 border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                    <Icon name="Plane" className="text-white w-3 h-3" />
                                </div>
                                <span className="text-lg font-bold text-gray-900">GlobeTrotter</span>
                            </div>
                            <p className="text-gray-500 text-sm max-w-xs mb-6">
                                Make travel planning effortless, beautiful, and collaborative for everyone.
                            </p>
                            <div className="flex gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                                        <Icon name={i === 1 ? "Facebook" : i === 2 ? "Twitter" : "Instagram"} size={14} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-blue-600">Features</a></li>
                                <li><a href="#" className="hover:text-blue-600">Integrations</a></li>
                                <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
                                <li><a href="#" className="hover:text-blue-600">Changelog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                                <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                                <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-blue-600">Community</a></li>
                                <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
                                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                        <p>© 2024 GlobeTrotter Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-gray-900">Privacy</a>
                            <a href="#" className="hover:text-gray-900">Terms</a>
                            <a href="#" className="hover:text-gray-900">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
