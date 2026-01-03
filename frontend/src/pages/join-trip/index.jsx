import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const JoinTrip = () => {
    const navigate = useNavigate();
    const { tripId } = useParams();

    // Mock Trip Data (In a real app, fetch this using tripId)
    const tripDetails = {
        title: "Rajasthan Heritage Tour 2026",
        dates: "Jan 15 - Jan 28, 2026",
        organizer: "Alex Johnson",
        participants: 3,
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2787&auto=format&fit=crop"
    };

    const handleJoin = () => {
        // Simulate joining logic
        alert("You have joined the trip!");
        navigate('/trip-detail');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-blue-600 z-0"></div>

            <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Trip Image */}
                <div className="h-48 relative">
                    <img
                        src={tripDetails.image}
                        alt="Trip Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded mb-2 w-fit">
                            <Icon name="Users" size={14} />
                            <span>{tripDetails.participants} people joining</span>
                        </div>
                        <h1 className="text-2xl font-bold">{tripDetails.title}</h1>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                            <img src="https://i.pravatar.cc/150?u=alex" alt="Organizer" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Invited by</p>
                            <p className="font-semibold text-foreground">{tripDetails.organizer}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Icon name="Calendar" size={14} />
                                <span>{tripDetails.dates}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                            <h3 className="text-blue-900 font-semibold mb-1 text-sm"> Collaborate & Plan</h3>
                            <p className="text-blue-700 text-xs leading-relaxed">
                                Join this trip to view the itinerary, suggest activities, and track shared expenses with the group.
                            </p>
                        </div>

                        <Button
                            fullWidth
                            size="lg"
                            onClick={handleJoin}
                            iconName="UserPlus"
                        >
                            Join Trip
                        </Button>

                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground font-medium"
                        >
                            No, thanks
                        </button>
                    </div>
                </div>
            </div>

            <p className="relative z-10 text-muted-foreground text-xs mt-8">
                Powered by GlobeTrotter
            </p>
        </div>
    );
};

export default JoinTrip;
