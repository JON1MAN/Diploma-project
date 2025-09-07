import React, {useEffect, useState} from "react";
import {WelcomePageProps} from "../../interfaces/welcome_page/WelcomePageProps";


const WelcomePage: React.FC<WelcomePageProps> = ({user}) => {
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
                        className="absolute w-2 h-2 bg-green-500 rounded-full opacity-40 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Main content container - perfectly centered */}
            <div className="flex flex-col items-center justify-center text-center z-10 px-4">
                {/* Welcome Text Animation */}
                <div
                    className={`transform transition-all duration-1000 ease-out mb-12 ${
                        showText
                            ? 'translate-y-0 opacity-100 scale-100'
                            : 'translate-y-8 opacity-0 scale-95'
                    }`}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide text-center">
                        Welcome{' '}
                        <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
              {user?.firstName}!
            </span>
                    </h1>
                </div>

                {/* Lock Animation - centered */}
                <div
                    className={`flex flex-col items-center justify-center transform transition-all duration-1000 delay-300 ease-out ${
                        showLock
                            ? 'translate-y-0 opacity-100 scale-100'
                            : 'translate-y-8 opacity-0 scale-95'
                    }`}
                >
                    {/* Lock container - centered */}
                    <div className="w-32 h-32 mb-8 relative mx-auto flex items-center justify-center">
                        {/* Lock body - centered within container */}
                        <div className="absolute w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                            {/* Keyhole - centered within lock body */}
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 bg-orange-800 rounded-full"></div>
                                <div className="w-1 h-4 bg-orange-800 mt-1"></div>
                            </div>
                        </div>

                        {/* Lock shackle - centered above lock body */}
                        <div
                            className={`absolute -top-4 w-16 h-16 border-8 border-yellow-400 rounded-t-full ${
                                showLock ? 'animate-pulse' : ''
                            }`}
                        ></div>

                        {/* Glowing effect - centered */}
                        <div
                            className={`absolute inset-0 rounded-full opacity-30 blur-xl bg-gradient-to-r from-yellow-400 to-orange-500 ${
                                showLock ? 'animate-pulse' : ''
                            }`}
                        ></div>
                    </div>

                    {/* Subtitle - centered */}
                    <p className="text-lg sm:text-xl text-white font-light text-center max-w-md">
                        Your access control system awaits
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
