import React, {useEffect, useState} from "react";
import {WelcomePageProps} from "../../interfaces/welcome_page/WelcomePageProps";



const WelcomePage: React.FC<WelcomePageProps> = ({ user }) => {
    const [showText, setShowText] = useState(false);
    const [showLock, setShowLock] = useState(false);

    useEffect(() => {
        const textTimer = setTimeout(() => setShowText(true), 500);
        const lockTimer = setTimeout(() => setShowLock(true), 1200);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(lockTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-300 flex items-center justify-center relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-green-500 rounded-full opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="text-center z-10">
                {/* Welcome Text Animation */}
                <div
                    className={`transform transition-all duration-1000 ease-out ${
                        showText
                            ? 'translate-y-0 opacity-100 scale-100'
                            : 'translate-y-8 opacity-0 scale-95'
                    }`}
                >
                    <h1 className="text-6xl font-bold text-white mb-8 tracking-wide">
                        Welcome{' '}
                        <span className="bg-gradient-to-r text-green-200 bg-clip-text text-transparent">
              {user?.firstName}!
            </span>
                    </h1>
                </div>

                {/* Lock Animation */}
                <div
                    className={`transform transition-all duration-1000 delay-300 ease-out ${
                        showLock
                            ? 'translate-y-0 opacity-100 scale-100'
                            : 'translate-y-8 opacity-0 scale-95'
                    }`}
                >
                    <div className="relative animate-float animate-lockPulse animate-glow">
                        <div className="w-32 h-32 mx-auto mb-8 relative">
                            {/* Lock body */}
                            <div className="absolute inset-x-6 bottom-0 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-2xl">
                                {/* Keyhole */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-3 h-3 bg-orange-800 rounded-full"></div>
                                    <div className="w-1 h-4 bg-orange-800 mx-auto mt-1"></div>
                                </div>
                            </div>

                            {/* Lock shackle with animation */}
                            <div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-8 border-yellow-400 rounded-t-full transition-all duration-2000 ease-in-out"
                                style={{
                                    animation: showLock ? 'lockPulse 2s ease-in-out infinite' : 'none'
                                }}
                            ></div>

                            {/* Glowing effect */}
                            <div
                                className="absolute inset-0 rounded-full opacity-30 blur-xl bg-gradient-to-r from-yellow-400 to-orange-500"
                                style={{
                                    animation: showLock ? 'glow 2s ease-in-out infinite alternate' : 'none'
                                }}
                            ></div>
                        </div>
                    </div>

                    <p className="text-xl text-white font-light">
                        Your access control system awaits
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
