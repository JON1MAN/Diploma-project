import {CardComponentProps} from "../../interfaces/card/CardComponentProps";
import React, {useState} from "react";
import { MoreVertical, Edit3, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';


const CardComponent: React.FC<CardComponentProps> = ({
                                                                     card,
                                                                     onEdit,
                                                                     onDelete,
                                                                     onStatusChange
                                                                 }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = (action: string) => {
        setShowMenu(false);
        switch (action) {
            case 'edit':
                onEdit(card);
                break;
            case 'delete':
                onDelete(card);
                break;
            case 'status':
                onStatusChange(card);
                break;
        }
    };

    return (
        <div className="w-4/5 bg-gray-200 rounded p-4 mb-3 relative">
            <div className="flex justify-between items-start">
                <div>
                    <div>code: {card.id}</div>
                    <div>
                        status: <span className={card.accessType === 'PERMIT' ? 'text-green-600' : 'text-red-600'}>
              {card.accessType}
            </span>
                    </div>
                    <div>name: {card.name}</div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 hover:bg-gray-300 rounded"
                    >
                        <MoreVertical size={16}/>
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 top-8 bg-white border rounded shadow-lg py-2 w-32 z-10">
                            <button
                                onClick={() => handleMenuClick('edit')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                            >
                                <Edit3 size={14}/>
                                edit
                            </button>
                            <button
                                onClick={() => handleMenuClick('delete')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                            >
                                <Trash2 size={14}/>
                                delete
                            </button>
                            <button
                                onClick={() => handleMenuClick('status')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                            >
                                {card.accessType === 'PERMIT' ? <ToggleLeft size={14}/> : <ToggleRight size={14}/>}
                                <span>{card.accessType === 'PERMIT' ? 'set to denied' : 'set to permit'}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardComponent;