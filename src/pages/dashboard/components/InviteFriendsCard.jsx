import React from 'react';
import Icon from '../../../components/AppIcon';

const InviteFriendsCard = () => {
  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://globetrotter.app/invite/alex');
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
          <Icon name="Users" size={24} color="white" />
        </div>
        <h3 className="text-xl font-bold mb-2">Invite Friends</h3>
        <p className="text-purple-100 text-sm mb-6">
          Planning a group trip? Invite friends to collaborate on your itinerary in real-time.
        </p>
        <button
          onClick={handleCopyLink}
          className="w-full py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
        >
          Copy Invite Link
        </button>
      </div>
    </div>
  );
};

export default InviteFriendsCard;