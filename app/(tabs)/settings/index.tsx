import PasswordSection from '@/components/PasswordSection';
import ProfileSection from '@/components/ProfileSection';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
    const { loading: authLoading, logout, user } = useAuth();
    const { profile, loading, error, updateProfile, updatePassword, getProfile } = useProfile();
    const [Profil, setProfile] = useState({
        name: '',
        email: '',
    });

    useFocusEffect(
        useCallback(() => {
            getProfile();
        }, [])
    );

    useEffect(() => {
        setProfile({
            name: profile?.name || '',
            email: profile?.email || '',
        });
    }, [profile]);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMsg, setPasswordMsg] = useState<string | null>(null);

    const handleUpdateProfile = async () => {
        await updateProfile(Profil.name, Profil.email);
    };

    const handleUpdatePassword = async () => {
        setPasswordMsg(null);
        if (newPassword !== confirmPassword) {
            setPasswordMsg('Konfirmasi password tidak cocok!');
            return;
        }
        const msg = await updatePassword(currentPassword, newPassword, confirmPassword);
        setPasswordMsg(msg);
        setCurrentPassword('');
        setConfirmPassword('');
        setNewPassword('');
    };
    return (
        <ScrollView style={{ backgroundColor: '#181818', minHeight: '100%' }} contentContainerStyle={{ padding: 16 }}>
            <ProfileSection
                profile={profile ? { ...profile, avatar: profile.avatar || '' } : { name: '', email: '', avatar: '' }}
                Profil={Profil}
                setProfile={setProfile}
                handleUpdateProfile={handleUpdateProfile}
                error={error}
            />
            <PasswordSection
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                handleUpdatePassword={handleUpdatePassword}
                passwordMsg={passwordMsg}
                setPasswordMsg={setPasswordMsg}
            />
            <View style={{ backgroundColor: '#222', borderColor: '#333', borderWidth: 1, padding: 16, borderRadius: 16, marginBottom: 18 }}>
                <TouchableOpacity
                    onPress={logout}
                    style={{ backgroundColor: '#b71c1c', borderRadius: 8, paddingVertical: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                >
                    <MaterialCommunityIcons name="logout" size={24} color="#fff" />
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 }}>
                        {authLoading ? 'Logging out...' : 'Logout'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}