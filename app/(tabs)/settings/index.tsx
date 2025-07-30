import { useAuth } from '@/hooks/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
    const { loading, logout, user } = useAuth();

    return (
        <ScrollView style={{ backgroundColor: '#181818' }}>
            <View style={{ padding: 16, alignItems: 'center' }}>
                <View style={{
                    width: '100%',
                    backgroundColor: '#222',
                    borderColor: '#333',
                    borderWidth: 1,
                    padding: 16,
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    marginTop: 16,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/originals/00/f8/6b/00f86b1463e599e15d0cc3d870505a2e.jpg' }}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                borderColor: '#444',
                                borderWidth: 2,
                                backgroundColor: '#333',
                            }}
                        />
                        <View style={{ gap: 4 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{user?.name}</Text>
                            <Text style={{ fontSize: 13, color: '#ccc' }}>{user?.email}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={logout}
                        style={{
                            backgroundColor: '#b71c1c',
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 0,
                            marginTop: 24,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <MaterialCommunityIcons name="logout" size={24} color="#fff" />
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                            {loading ? 'Logging out...' : 'Logout'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}