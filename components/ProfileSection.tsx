import AvatarUploader from '@/components/AvatarUploader';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ProfileSectionProps {
    profile: { name: string; email: string; avatar?: string };
    Profil: { name: string; email: string };
    setProfile: (profile: { name: string; email: string }) => void;
    handleUpdateProfile: () => void;
    error?: string | null;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, Profil, setProfile, handleUpdateProfile, error }) => (
    <>
        <View style={{ width: '100%', backgroundColor: '#222', borderColor: '#333', borderWidth: 1, padding: 16, borderRadius: 16, boxShadow: '0 2px 8px #0002', marginBottom: 18 }}>
            <AvatarUploader avatar={profile?.avatar || ''} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{profile?.name}</Text>
            <Text style={{ fontSize: 13, color: '#ccc', marginBottom: 8, textAlign: 'center' }}>{profile?.email}</Text>
        </View>
        <View style={{ backgroundColor: '#222', borderColor: '#333', borderWidth: 1, padding: 16, borderRadius: 16, marginBottom: 18 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Profil</Text>
            <Text style={{ color: '#aaa', marginBottom: 4 }}>Nama</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
                <MaterialIcons name="person" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
                <TextInput
                    style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                    value={Profil.name}
                    onChangeText={text => setProfile({ ...Profil, name: text })}
                    placeholder="Nama"
                    placeholderTextColor="#888"
                    autoCapitalize="words"
                />
            </View>
            <Text style={{ color: '#aaa', marginBottom: 4 }}>Email</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
                <MaterialIcons name="email" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
                <TextInput
                    style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                    value={Profil.email}
                    onChangeText={text => setProfile({ ...Profil, email: text })}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563eb', borderRadius: 8, paddingVertical: 10, justifyContent: 'center', marginTop: 4 }} onPress={handleUpdateProfile}>
                <MaterialIcons name="save" size={20} color="#fff" />
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 }}>Ubah Profil</Text>
            </TouchableOpacity>
            {error && <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>}
        </View>
    </>
);

export default ProfileSection;
