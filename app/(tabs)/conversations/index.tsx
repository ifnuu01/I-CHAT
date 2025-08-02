import Card from '@/components/Card';
import { Conversation, useConversations } from '@/hooks/useConversations';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Conversation() {
    const { loading, getConversations, conversations, search } = useConversations() as {
        loading: boolean;
        getConversations: () => void;
        conversations: Conversation[];
        search: (query: string) => Promise<void>;
    };
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getConversations();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getConversations();
        }, [])
    );

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            await getConversations();
            return;
        } else {
            await search(searchQuery);
            setSearchQuery('');
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#181818', paddingTop: 16 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                gap: 8,
                marginBottom: 8,
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#222',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#333',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                }}>
                    <Feather name="search" size={22} color="#fff" />
                    <TextInput
                        placeholder='Cari Pesan Temanmu...'
                        placeholderTextColor="#aaa"
                        style={{
                            flex: 1,
                            color: '#fff',
                            marginLeft: 8,
                            fontSize: 16,
                        }}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        returnKeyType="search"
                        onSubmitEditing={handleSearch}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#222',
                        borderRadius: 10,
                        padding: 14,
                        borderWidth: 1,
                        borderColor: '#333',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        handleSearch();
                    }}
                >
                    <Feather name="search" size={26} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, width: '100%', paddingHorizontal: 8, marginTop: 8 }}>
                {loading ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 48 }}>
                        <Feather name="loader" size={32} color="#aaa" />
                        <Text style={{ color: '#aaa', fontSize: 16, marginTop: 8 }}>Loading...</Text>
                    </View>
                ) : conversations.length > 0 ? (
                    <FlatList
                        data={conversations}
                        renderItem={({ item }) => (
                            <Card
                                name={item.other_participant?.name ?? ''}
                                message={item.last_message?.content ?? ''}
                                time={item.last_message?.created_at ?? ''}
                                id={item.id ?? ''}
                                is_deleted={item.last_message?.is_deleted ?? false}
                            />
                        )}
                        keyExtractor={item => item.id?.toString() ?? ''}
                        contentContainerStyle={{ paddingBottom: 32 }}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 48 }}>
                        <Feather name="message-square" size={32} color="#aaa" />
                        <Text style={{ color: '#aaa', fontSize: 16, marginTop: 8 }}>Tidak ada percakapan :(</Text>
                    </View>
                )}
            </View>
        </View>
    );
}