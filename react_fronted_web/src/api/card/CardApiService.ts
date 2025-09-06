import {LockHistoryEntry} from "../../interfaces/lock_history/LockHistoryEntry";
import {Card} from "../../interfaces/card/Card";
import {UserDTO} from "../../interfaces/user/UserDTO";

export class CardApiService {
    private static baseUrl = process.env.BACKEND_BASE_URL;

    static async getCards(): Promise<Card[]> {
        // Mock data for demo
        return [
            { id: '1', code: 'c988e99', name: 'persik', access: 'PERMIT' },
            { id: '2', code: 'c988e98', name: 'office', access: 'DENIED' },
        ]
    }

    static async updateCard(id: string, updates: Partial<Card>): Promise<void> {
        console.log(`PUT ${this.baseUrl}/cards/${id}`, updates);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    static async updateCardStatus(id: string, status: string): Promise<void> {
        console.log(`PUT ${this.baseUrl}/cards/${id}/status`, { status });
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    static async deleteCard(id: string): Promise<void> {
        console.log(`DELETE ${this.baseUrl}/cards/${id}`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    static async getLockHistory(): Promise<LockHistoryEntry[]> {
        // Mock data for demo
        return [
            { id: '1', time: '2025-09-06 14:30:25', cardName: 'persik', cardCode: 'c988e99' },
            { id: '2', time: '2025-09-06 12:15:42', cardName: 'office', cardCode: 'c988e98' },
            { id: '3', time: '2025-09-06 09:45:10', cardName: 'persik', cardCode: 'c988e99' },
        ];
    }

    static async getLockStatus(): Promise<'opened' | 'closed'> {
        // Mock random status for demo
        return Math.random() > 0.5 ? 'opened' : 'closed';
    }

    static async getCurrentUser(): Promise<UserDTO> {
        return { firstName: 'Aliaskei', lastName:'Marchuk' };
    }
}