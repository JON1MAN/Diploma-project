import {Card} from "../interfaces/card/Card";
import {CardUpdateDTO} from "../interfaces/card/CardUpdateDTO";
import {UserDTO} from "../interfaces/user/UserDTO";
import {LockEntryDTO} from "../interfaces/lock_history/LockEntryDTO";
import {Page} from "../interfaces/lock_history/Page";

class ApiService {
    private static baseUrl = 'http://localhost:8080'; // Replace with actual backend URL

    static async getCards(): Promise<Card[]> {
        try {
            const response = await fetch(`${this.baseUrl}/users/cards`);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Invalid cards response format");
            }

            return data;
        } catch (error) {
            console.error("Error fetching cards:", error);

            // fallback mock data
            return [
                { id: "1", name: "mocked1", accessType: "PERMIT" },
                { id: "2", name: "mocked2", accessType: "DENIED" },
            ];
        }
    }


    static async updateCard(id: string, updates: CardUpdateDTO): Promise<Card> {
        if (!id) throw new Error('Card id is required');
        if (!updates || (updates.name == null && updates.accessType == null)) {
            throw new Error('At least one field to update is required');
        }

        console.log("NAME API: " + updates.name);
        console.log("ACCESS API: " + updates.accessType);
        console.log("ID API: " + id);
        const response = await fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`Update failed: ${response.status} ${response.statusText} ${text}`);
        }

        const data: Card = await response.json();
        console.log("JSON NAME API: " + data.name);
        console.log("JSON ACCESS API: " + data.accessType);

        if (!data || typeof data.id !== 'string' || typeof data.name !== 'string' ||
            (data.accessType !== 'PERMIT' && data.accessType !== 'DENIED')) {
            throw new Error('Invalid card payload from server');
        }
        return data as Card;
    }

    static async deleteCard(id: string): Promise<void> {
        if (!id) throw new Error("Card id (hexCode) is required");

        const response = await fetch(`${this.baseUrl}/cards/${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Accept": "application/json" },
        });

        if (!response.ok) {
            const text = await response.text().catch(() => "");
            throw new Error(`Failed to delete card: ${response.status} ${response.statusText} ${text}`);
        }

        // Optional: consume response body if you care about it
        const result = await response.text();
        console.log("Delete response:", result); // should be "deleted"
    }


    static async getLockStatus(): Promise<'opened' | 'closed'> {
        // Mock random status for demo
        return Math.random() > 0.5 ? 'opened' : 'closed';
    }

    static async getCurrentUserDetails(): Promise<UserDTO> {
        const res = await fetch(`${this.baseUrl}/users`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            // credentials: 'include', // uncomment if you rely on cookies/session
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`Failed to load current user: ${res.status} ${res.statusText} ${text}`);
        }

        const dto = await res.json();

        const firstName = dto.firstName ?? '';
        const lastName = dto.lastName ?? '';
        const email = dto.email ?? '';

        return { firstName, lastName, email };
    }

    static async searchPaginatedLockEntries(
        page: number = 0,
        size: number = 20,
        date?: string,
        cardName?: string,
        cardHexCode?: string
    ): Promise<Page<LockEntryDTO>> {
        try {
            // Build query parameters
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('size', size.toString());

            if (date) {
                params.append('date', date);
            }
            if (cardName) {
                params.append('card_name', cardName);
            }
            if (cardHexCode) {
                params.append('card_hex_code', cardHexCode);
            }

            const response = await fetch(
                `${this.baseUrl}/lock_entries/search?${params.toString()}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error searching lock entries:', error);
            throw error;
        }
    }

    static async getPaginatedLockEntries(
        page: number = 0,
        size: number = 20
    ): Promise<Page<LockEntryDTO>> {
        try {
            const response = await fetch(
                `${this.baseUrl}/lock_entries?page=${page}&size=${size}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching lock entries:', error);
            throw error;
        }
    }
}

export default ApiService;