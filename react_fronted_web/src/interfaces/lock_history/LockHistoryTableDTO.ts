
export interface LockHistoryTableDTO {
    history: {
        id: string;
        time: string;
        cardName: string;
        cardHexCode: string;
    }[];
}
