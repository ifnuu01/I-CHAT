import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Conversation {
    id?: number | string;
    user1_id?: number;
    user2_id?: number;
    user1_last_read_at?: string;
    user2_last_read_at?: string;
    last_message_at?: string;
    created_at?: string;
    updated_at?: string;
    other_participant?: {
        name?: string;
    };
    last_message?: {
        content?: string;
        created_at?: string;
        is_deleted?: boolean;
    };
    unread_count?: 0
}

export const useConversations = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 


    async function getToken() {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (err) {
            console.error("Error retrieving token:", err);
            return null;
        }
    }

    const getConversations = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/conversations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const result = await response.json();
                setError(result);
                console.error("Error fetching conversations:", result);
                return;
            }

            const result = await response.json();
            setConversations(result);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        } finally {
            setLoading(false);
        }
    }
    
    const search = async (query:string) => {
        setLoading(true);
        setError(null);

        if (!query) {
            setConversations([]);
            setLoading(false);
            return;
        }

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/conversations/search?query=${encodeURIComponent(query)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result);
                console.error("Error searching conversations:", result);
                return;
            }
            console.log("Conversations searched successfully:", result);
            setConversations(result);
        } catch (error) {
            console.error("Error searching conversations:", error);
        } finally {
            setLoading(false);
        }
    }

    return {
        conversations,
        loading,
        error,
        getConversations,
        search
    };
}