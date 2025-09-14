import DeleteConfirmModal from "./modal/DeleteConfirmModal";
import EditCardModal from "./modal/EditCardModal";
import LockHistoryTable from "./lock/LockHistoryTable";
import CardComponent from "./card/CardComponent";
import {Lock, Unlock, User, Menu} from 'lucide-react';
import ApiService from "../api/ApiService";
import {Card} from "../interfaces/card/Card";
import React, {useEffect, useState} from "react";
import {LockHistoryEntry} from "../interfaces/lock_history/LockHistoryEntry";
import {UserDTO} from "../interfaces/user/UserDTO";
import Sidebar from "./side_bar/SideBar";
import WelcomePage from "./welcome_page/WelcomePage";
import {Page} from "../interfaces/welcome_page/Page";
import {LockEntryDTO} from "../interfaces/lock_history/LockEntryDTO";

const AccessCardSystem: React.FC = () => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [cards, setCards] = useState<Card[]>([]);
    // Fix: Remove lockHistory state since LockHistoryTable now handles its own data
    const [lockStatus, setLockStatus] = useState<'opened' | 'closed'>('closed');
    const [currentPage, setCurrentPage] = useState<Page>('welcome');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const cardsData = await ApiService.getCards();
            const userData = await ApiService.getCurrentUserDetails();
            const statusData = await ApiService.getLockStatus();
            // Remove history data loading since LockHistoryTable handles it internally

            setUser(userData);
            setCards(cardsData);
            // Remove setLockHistory call
            setLockStatus(statusData);
        } catch (error) {
            console.error('Failed to load initial data:', error);

            setUser({ firstName: 'Unknown', lastName: 'User', email: 'unknown@example.com' });
            setCards([]);
            // Remove setLockHistory call
            setLockStatus('closed');
        } finally {
            setLoading(false);
        }
    };

    const handleEditCard = (card: Card) => {
        setSelectedCard(card);
        setEditModalOpen(true);
    };

    const handleDeleteCard = (card: Card) => {
        setSelectedCard(card);
        setDeleteModalOpen(true);
    };

    const handleStatusChange = async (card: Card) => {
        try {
            const newAccessType = card.accessType === 'PERMIT' ? 'DENIED' : 'PERMIT';
            const updatedCard = await ApiService.updateCard(card.id, {
                name: card.name, // Keep the existing name
                accessType: newAccessType
            });

            setCards(cards.map(c => c.id === card.id ? updatedCard : c));
        } catch (error) {
            console.error('Failed to update card status:', error);
        }
    };

    const handleSaveEdit = (updatedCard: Card) => {
        setCards(cards.map(c => c.id === updatedCard.id ? updatedCard : c));
        setEditModalOpen(false);
        setSelectedCard(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedCard) return;

        try {
            await ApiService.deleteCard(selectedCard.id);
            setCards(cards.filter(c => c.id !== selectedCard.id));
            setDeleteModalOpen(false);
            setSelectedCard(null);
        } catch (error) {
            console.error('Failed to delete card:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (currentPage === 'welcome') {
        return (
            <>
                <WelcomePage user={user} />

                {/* Menu Button */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-6 left-6 z-30 bg-white bg-opacity-20 backdrop-blur-md text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-200 shadow-lg"
                >
                    <Menu size={24} />
                </button>

                {/* Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    currentPage={currentPage}
                    onNavigate={setCurrentPage}
                    user={user}
                />
            </>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Menu Button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-6 left-6 z-30 bg-white text-gray-700 p-3 rounded-full hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                user={user}
            />

            {/* Main Content */}
            <div className="flex-1 p-6 pl-20">
                {/* Header */}
                <div className="flex justify-center items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold">
                        {currentPage === 'keys' ? 'Access Cards' : 'Door Lock History'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded text-white font-medium ${
                            lockStatus === 'opened' ? 'bg-green-600' : 'bg-red-600'
                        }`}>
                            {lockStatus === 'opened' ? (
                                <>
                                    <Unlock className="inline w-4 h-4 mr-1" />
                                    opened
                                </>
                            ) : (
                                <>
                                    <Lock className="inline w-4 h-4 mr-1" />
                                    closed
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                {currentPage === 'keys' ? (
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        {cards.map((card) => (
                            <CardComponent
                                key={card.id}
                                card={card}
                                onEdit={handleEditCard}
                                onDelete={handleDeleteCard}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    // Fix: Use LockHistoryTable without props since it handles its own data fetching
                    <LockHistoryTable page={0} size={20} />
                )}
            </div>

            {/* Modals */}
            <EditCardModal
                card={selectedCard}
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedCard(null);
                }}
                onSave={handleSaveEdit}
            />

            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                }}
                onConfirm={handleConfirmDelete}
                cardName={selectedCard?.name || ''}
            />
        </div>
    );
};

export default AccessCardSystem;