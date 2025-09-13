import React, {useEffect, useState} from "react";
import {EditCardModalProps} from "../../interfaces/card/EditCardModalProps";
import Modal from "./Modal";
import {CardUpdateDTO} from "../../interfaces/card/CardUpdateDTO";
import ApiService from "../../api/ApiService";

const EditCardModal: React.FC<EditCardModalProps> = ({ card, isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (card) {
            setName(card.name);
        }
        setError(null);
    }, [card]);

    const handleSave = async () => {
        if (!card?.id) {
            setError('Card ID is missing');
            return;
        }

        const trimmedName = name.trim();
        if (!trimmedName) {
            setError('Name cannot be empty');
            return;
        }

        if (trimmedName === card.name) {
            onClose();
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Always send both fields - keep existing accessType, update name
            const updates: CardUpdateDTO = {
                name: trimmedName,
                accessType: card.accessType
            };
            console.log("NAME: " + updates.name);
            console.log("ACCESS_TYPE: " + updates.accessType);
            const updatedCard = await ApiService.updateCard(card.id, updates);

            onSave(updatedCard);
            onClose();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update card';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Card edition:</h3>
                <div className="text-left mb-4 space-y-2">
                    <div>code: {card?.id}</div>
                    <div>status: <span className={card?.accessType === 'PERMIT' ? 'text-green-600' : 'text-red-600'}>{card?.accessType}</span></div>
                    <div>
                        name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="ml-2 border rounded px-2 py-1 w-32"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-600 text-sm mb-4">
                        {error}
                    </div>
                )}

                <div className="flex gap-2 justify-center">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'OK'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditCardModal;