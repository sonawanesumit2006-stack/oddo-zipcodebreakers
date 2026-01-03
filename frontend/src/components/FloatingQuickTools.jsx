import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './AppIcon';

const FloatingQuickTools = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [activeWidget, setActiveWidget] = useState(null);
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

    const handleToolClick = (tool) => {
        setActiveWidget(tool);
        setIsOpen(false);
    };

    const closeWidget = () => {
        setActiveWidget(null);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Widget Modal */}
            {activeWidget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden">
                        {/* Widget Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${activeWidget.color}15` }}
                                >
                                    <Icon name={activeWidget.icon} size={20} style={{ color: activeWidget.color }} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{activeWidget.label}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        navigate(activeWidget.path);
                                        closeWidget();
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center gap-2"
                                    title="Open in full page"
                                >
                                    <Icon name="ExternalLink" size={16} />
                                    <span className="hidden sm:inline">Full Page</span>
                                </button>
                                <button
                                    onClick={closeWidget}
                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <Icon name="X" size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Widget Content - iframe */}
                        <div className="flex-1 overflow-hidden">
                            <iframe
                                src={activeWidget.path}
                                className="w-full h-full border-0"
                                title={activeWidget.label}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Quick Tools */}
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
                                    onClick={() => handleToolClick(tool)}
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
        </>
    );
};

export default FloatingQuickTools;
