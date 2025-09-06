import {ModalProps} from "../../interfaces/modal/ModalProps";
import React from "react";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
                {children}
            </div>
        </div>
    );
};

export default Modal