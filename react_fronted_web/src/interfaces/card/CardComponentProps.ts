import {Card} from "./Card";

export interface CardComponentProps {
    card: Card;
    onEdit: (card: Card) => void;
    onDelete: (card: Card) => void;
    onStatusChange: (card: Card) => void;
}

