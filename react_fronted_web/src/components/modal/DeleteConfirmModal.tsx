import Modal from "./Modal";
import {DeleteConfirmModalProps} from "../../interfaces/card/DeleteConfirmModalProps";
import React from "react";

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, cardName }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Delete Card</h3>
            <p className="mb-6">
                Are you sure you want to delete card "{cardName}"?
                Once deleted, you will not be able to access it anymore.
            </p>
            <div className="flex gap-4 justify-center">
                <button
                    onClick={onClose}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    </Modal>
);

export default DeleteConfirmModal;