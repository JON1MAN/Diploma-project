import {Card} from "./Card";

export interface EditCardModalProps {
    card: Card | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedCard: Card) => void;
}
