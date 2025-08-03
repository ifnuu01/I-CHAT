import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useFriends = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{message:string} | null>(null);
    
    async function getToken() {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (err) {
            console.error("Error retrieving token:", err);
            return null;
        }
    }
    
    const searchFriends = async (query:string) => {
        setLoading(true);
        setError(null);
        if (!query) {
            setFriends([]);
            setLoading(false);
            return;
        }
        try {
            const token = await getToken();
            console.log(token);
            
            const response = await fetch(`${API_URL}/friends/search?query=${encodeURIComponent(query)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (!response.ok) {
                console.log("Error fetching friends:", result);
                return;
            }
            // console.log("Friends fetched successfully:", result);
            setFriends(result);
        } catch (err) {
            console.log("Error fetching friends:", err);
        } finally {
            setLoading(false);
        }
    }
    
    const addFriend = async(friend_id:number) => {
        setLoading(true);
        setError(null);
        
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/friends/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ friend_id }),
            });
            const result = await response.json();
            if (!response.ok) {
                console.log("Error adding friend:", result);
                return;
            }
            // console.log("Friend added successfully:", result);
            return result;
        } catch (err) {
            console.log("Error adding friend:", err);
        } finally {
            setLoading(false);
        }
    }
    
    const removeFriend = async(friendship_id:number) => {
        setLoading(true);
        setError(null);
        
        try {
            const token = await getToken();
            console.log('tets jalan');
            const response = await fetch(`${API_URL}/friends/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ friendship_id }),
            });
            const result = await response.json();
            if (!response.ok) {
                console.log("Error removing friend:", result);
                return;
            }
            return result;
        } catch (err) {
            console.log("Error removing friend:", err);
        } finally {
            setLoading(false);
        }
    }
    
    const acceptFriend = async(friendship_id:number) => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/friends/accept`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ friendship_id }),
            })
            
            const result = await response.json();
            
            if (!response.ok) {
                console.log("Error accepting friend request:", result);
                return;
            }
            // console.log("Friend request accepted successfully:", result);
            return result;
        } catch (error) {
            console.log("Error accepting friend request:", error);
        }finally {
            setLoading(false);
        }
    }
    
    const cancelAddFriend = async(friendship_id:number) => {
        setLoading(true);
        setError(null);
        
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/friends/cancel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ friendship_id }),
            });
            const result = await response.json();
            if (!response.ok) {
                console.log("Error canceling friend request:", result);
                return;
            }
            // console.log("Friend request canceled successfully:", result);
            return result;
        } catch (error) {
            console.log("Error canceling friend request:", error);
        } finally {
            setLoading(false);
        }
    }
    
    const getFriends = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/friends`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            
            const result = await response.json();
            if (!response.ok) {
                console.log("Error fetching friends:", result);
                setError(result);
                return;
            }
            // console.log("Friends fetched successfully:", result);
            setFriends(result);
        } catch (error) {
            console.log("Error fetching friends:", error);
        } finally {
            setLoading(false);
        }
    }
    
    const getRequestFriends = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/friends/requests`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            const result = await response.json();
            if (!response.ok) {
                console.log("Error fetching friends:", result);
                setError(result);
                return;
            }
            // console.log("Friends fetched successfully:", result);
            setFriends(result);
        } catch (error) {
            console.log("Error fetching friends:", error);
        } finally {
            setLoading(false);
        }
    }


    return {
        friends,
        loading,
        error,
        searchFriends,
        addFriend,
        removeFriend,
        acceptFriend,
        cancelAddFriend,
        getFriends,
        getRequestFriends
    };
}


interface Friend {
    email: string;
    name: string;
    friendship_status: "none" | "friends" | "pending_sent" | "pending_received"| 'accepted' | 'pending';
    id: number;
    friendship_id: number;
    avatar?: string;
}