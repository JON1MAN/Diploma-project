import {Settings, History, Home, Key, X} from "lucide-react";
import {SidebarProps} from "../../interfaces/side_bar/SideBarProps";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, onNavigate, user }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-600 to-green-200">
                    <div className="text-white">
                        <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
                        <p className="text-blue-100 text-sm">Access Control</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    <button
                        onClick={() => {
                            onNavigate('welcome');
                            onClose();
                        }}
                        className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                            currentPage === 'welcome'
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <Home size={20} />
                        <span className="font-medium">Home</span>
                    </button>

                    <button
                        onClick={() => {
                            onNavigate('keys');
                            onClose();
                        }}
                        className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                            currentPage === 'keys'
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <Key size={20} />
                        <span className="font-medium">My Keys</span>
                    </button>

                    <button
                        onClick={() => {
                            onNavigate('history');
                            onClose();
                        }}
                        className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                            currentPage === 'history'
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <History size={20} />
                        <span className="font-medium">Door Lock History</span>
                    </button>
                </nav>

                {/* Settings */}
                <div className="absolute bottom-4 left-4 right-4">
                    <button className="w-full flex items-center gap-4 p-4 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200">
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;