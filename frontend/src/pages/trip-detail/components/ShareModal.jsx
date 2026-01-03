import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShareModal = ({ isOpen, onClose, tripTitle }) => {
    const [email, setEmail] = useState('');
    const [copied, setCopied] = useState(false);

    // Mock shareable link
    const shareLink = `${window.location.origin}/trip/share/rj-2026-heritage`;

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleInvite = (e) => {
        e.preventDefault();
        if (email) {
            alert(`Invitation sent to ${email}`);
            setEmail('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <Icon name="X" size={20} />
                </button>

                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Icon name="Users" className="text-blue-600 w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Share Trip</h2>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Invite friends to plan <strong>{tripTitle}</strong> with you.
                    </p>
                </div>

                {/* Copy Link Section */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        Trip Link
                    </label>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 truncate font-mono">
                            {shareLink}
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${copied
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                }`}
                        >
                            <Icon name={copied ? "Check" : "Copy"} size={16} />
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase text-gray-500 font-medium">
                        <span className="px-2 bg-white">Or invite by email</span>
                    </div>
                </div>

                {/* Email Invite Section */}
                <form onSubmit={handleInvite}>
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Icon name="Mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="email"
                                placeholder="friend@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer">
                            <option>Can edit</option>
                            <option>Can view</option>
                        </select>

                        <Button type="submit" disabled={!email} iconName="Send" iconPosition="left">
                            Send Invite
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShareModal;
