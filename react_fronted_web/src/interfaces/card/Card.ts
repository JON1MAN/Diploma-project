export interface Card {
    id: string;
    code: string;
    name: string;
    access: 'PERMIT' | 'DENIED';
}