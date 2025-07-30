import AsyncStorage from "@react-native-async-storage/async-storage";
import Pusher from 'pusher-js/react-native';
import { useEffect, useState } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (err) {
        console.error("Error retrieving token:", err);
        return null;
    }
}

export const useMessage = (conversationId: number) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState({ page: 1, limit: 50, has_more: false });


    const fetchMessages = async (page: number = 1, limit: number = 50) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/messages/conversation/${conversationId}?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch messages');
            }

            setMessages(result.data);
            setPagination({
                page: result.pagination.page,
                limit: result.pagination.limit,
                has_more: result.pagination.has_more,
            });
        } catch (err) {
            console.log("Error fetching messages:", err);
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const pusher = new Pusher(process.env.EXPO_PUBLIC_REVERB_APP_KEY || 'yhjkgq2adzbhhconqnd0', {
            cluster: process.env.EXPO_PUBLIC_REVERB_APP_CLUSTER || 'mt1',
            wsHost: process.env.EXPO_PUBLIC_REVERB_HOST || '10.243.107.82',
            wsPort: Number(process.env.EXPO_PUBLIC_REVERB_PORT) || 8080,
            wssPort: Number(process.env.EXPO_PUBLIC_REVERB_PORT) || 8080,
            forceTLS: (process.env.EXPO_PUBLIC_REVERB_SCHEME) === 'https',
            disableStats: true,
            enabledTransports: ['ws'],
        } as any);

        pusher.connection.bind('connected', () => {
            console.log('Pusher connected');
        });

        pusher.connection.bind('error', (err: any) => {
            console.error('Pusher connection error:', err);
        });

        const channel = pusher.subscribe(`chat.${conversationId}`);
        console.log('Subscribed to channel:', `chat.${conversationId}`);

        channel.bind('App\\Events\\MessageSent', (data: Message) => {
            console.log("New message received:", data);
            setMessages(prev => [data, ...prev]);
        });


        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [conversationId]);

    return {
        messages,
        loading,
        error,
        fetchMessages,
        pagination,
        setPagination,
    };
};

export const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    const sendMessage = async (conversation_id: number, content: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ conversation_id, content }),
            });
            const result = await response.json();

            if (!response.ok) {
                setError(new Error(result.message || 'Failed to send message'));
            }
            return true;
        } catch (err) {
            console.error("Error sending message:", err);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        sendMessage,
        loading,
        error,
    };
}


interface Message {
    id: number;
    conversation_id: number;
    sender_id: number | string;
    content: string | null;
    is_edited: boolean;
    edited_at: string | null;
    created_at: string;
    updated_at: string;
    reply_to: {
        id: number;
        content: string;
        sender_name: string;
    } | null;
    sender: {
        id: number;
        name: string;
        email: string;
    };
}
