import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PasswordSectionProps {
    currentPassword: string;
    setCurrentPassword: (v: string) => void;
    newPassword: string;
    setNewPassword: (v: string) => void;
    confirmPassword: string;
    setConfirmPassword: (v: string) => void;
    handleUpdatePassword: () => void;
    passwordMsg: string | null;
    setPasswordMsg: (v: string) => void;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    passwordMsg,
    setPasswordMsg,
}) => (
    <View style={{ backgroundColor: '#222', borderColor: '#333', borderWidth: 1, padding: 16, borderRadius: 16, marginBottom: 18 }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Ganti Password</Text>
        <Text style={{ color: '#aaa', marginBottom: 4 }}>Password Lama</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
            <MaterialIcons name="lock-outline" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
            <TextInput
                style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                placeholder="Password Lama"
                placeholderTextColor="#888"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
            />
        </View>
        <Text style={{ color: '#aaa', marginBottom: 4 }}>Password Baru</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
            <MaterialIcons name="lock" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
            <TextInput
                style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                placeholder="Password Baru"
                placeholderTextColor="#888"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
        </View>
        <Text style={{ color: '#aaa', marginBottom: 4 }}>Konfirmasi Password Baru</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
            <MaterialIcons name="lock-reset" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
            <TextInput
                style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                placeholder="Konfirmasi Password Baru"
                placeholderTextColor="#888"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563eb', borderRadius: 8, paddingVertical: 10, justifyContent: 'center', marginTop: 4 }} onPress={handleUpdatePassword}>
            <MaterialIcons name="lock" size={20} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 }}>Ganti Password</Text>
        </TouchableOpacity>
        {passwordMsg && (
            <Text onPress={() => setPasswordMsg('')} style={{ color: passwordMsg.includes('berhasil') ? 'green' : 'red', marginTop: 8 }}>{passwordMsg}</Text>
        )}
    </View>
);

export default PasswordSection;
