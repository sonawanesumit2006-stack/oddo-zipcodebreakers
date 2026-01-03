import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './AppIcon';

const FloatingQuickTools = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const hideTimeoutRef = useRef(null);

    const tools = [
        { icon: 'Map', label: 'Map', path: '/dashboard', color: '#8B5CF6' },
        { icon: 'List', label: 'Pack List', path: '/pack-list', color: '#10B981' },
        { icon: 'DollarSign', label: 'Converter', path: '/currency-converter', color: '#F59E0B' },
        { icon: 'Train', label: 'Transport', path: '/transport', color: '#EC4899' }
    ];

    // Auto-hide after 3 seconds of inactivity
    useEffect(() => {
        if (isOpen) {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
            hideTimeoutRef.current = setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        }
        return () => {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, [isOpen]);

    const handleToolClick = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Quick Tools Panel */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-64 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Icon name="Zap" size={16} className="text-blue-600" />
                            Quick Tools
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <Icon name="X" size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {tools.map((tool, index) => (
                            <button
                                key={index}
                                onClick={() => handleToolClick(tool.path)}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: `${tool.color}15` }}
                                >
                                    <Icon name={tool.icon} size={20} style={{ color: tool.color }} />
                                </div>
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{tool.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={toggleOpen}
                className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Quick Tools"
            >
                <Icon name={isOpen ? "X" : "Zap"} size={24} />
            </button>
        </div>
    );
};

export default FloatingQuickTools;
