import React, {useEffect, useState} from "react";
import {EditCardModalProps} from "../../interfaces/card/EditCardModalProps";
import Modal from "./Modal";


const EditCardModal: React.FC<EditCardModalProps> = ({ card, isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (card) {
            setName(card.name);
        }
    }, [card]);

    const handleSave = () => {
        if (name.trim()) {
            onSave(name.trim());
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Card edition:</h3>
                <div className="text-left mb-4 space-y-2">
                    <div>code: {card?.code}</div>
                    <div>status: <span className={card?.access === 'PERMIT' ? 'text-green-600' : 'text-red-600'}>{card?.access}</span></div>
                    <div>
                        name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="ml-2 border rounded px-2 py-1 w-32"
                        />
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
                >
                    OK
                </button>
            </div>
        </Modal>
    );
};

export default EditCardModal;