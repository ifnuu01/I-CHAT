import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Platform } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Profile {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
    is_blocked: boolean;
}

async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (err) {
        console.error("Error retrieving token:", err);
        return null;
    }
}

function getMimeType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'png') return 'image/png';
    if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
    if (ext === 'webp') return 'image/webp';
    return 'image/jpeg';
}

export const useProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();

            const response = await fetch(`${API_URL}/user/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result.message || 'Failed to fetch profile');
                return;
            }

            setProfile(result.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateProfile = async (name: string, email: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();

            const response = await fetch(`${API_URL}/profile/update?_method=PUT`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email }),
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result.message || 'Failed to update profile');
                return;
            }
            setProfile(result.data);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    }

    const updatePassword = async (current_password: string, new_password: string, new_password_confirmation: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();

            const response = await fetch(`${API_URL}/profile/password?_method=PUT`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ current_password, new_password, new_password_confirmation }),
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result.message || 'Gagal mengubah password');
                return result.message || 'Gagal mengubah password';
            }

            return result.message || 'Password berhasil diubah';
        } catch (error) {
            console.error("Error updating password:", error);
            return 'Gagal mengubah password';
        } finally {
            setLoading(false);
        }
    }

    const updateAvatar = async (asset: { uri: string; type: string | undefined; name: string }) => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();

            let uri = asset.uri;
            if (Platform.OS === 'android' && !uri.startsWith('file://')) {
            uri = 'file://' + uri.replace('file:/', '');
            }

            const filename = asset.name || uri.split('/').pop() || `avatar.jpg`;
            const contentType = asset.type?.includes('/') ? asset.type : getMimeType(filename);

            const formData = new FormData();
            (formData as any).append('avatar', {
            uri,
            name: filename,
            type: contentType,
            });

            const response = await fetch(`${API_URL}/profile/avatar`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            });

            const result = await response.json();
            if (!response.ok) {
            throw new Error(result.message || 'Failed to update avatar');
            }
            setProfile(prev => prev ? { ...prev, avatar: result.data.avatar } : prev);
            return result;

        } catch (err: any) {
            console.error('UpdateAvatar failed:', err);
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
        };

    return {
        profile,
        loading,
        error,
        getProfile,
        updateProfile,
        updatePassword,
        updateAvatar,
    }
}