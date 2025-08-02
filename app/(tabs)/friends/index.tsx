import CardFriend from "@/components/CardFriend";
import { useFriends } from "@/hooks/useFriends";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Friendship() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { loading, searchFriends, friends } = useFriends();

    const handleSearch = async () => {
        await searchFriends(searchQuery);
        setSearchQuery('');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#181818', padding: 16 }}>
            <View style={{ flexDirection: 'row', marginBottom: 16, gap: 8 }}>
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/friends/request')}
                    style={{
                        backgroundColor: '#222',
                        borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 18,
                        marginRight: 4,
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Permintaan pertemanan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/friends/list')}
                    style={{
                        backgroundColor: '#222',
                        borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 18,
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Teman</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
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
                        placeholder='Cari Temanmu...'
                        placeholderTextColor="#aaa"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={{
                            flex: 1,
                            color: '#fff',
                            marginLeft: 8,
                            fontSize: 16,
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleSearch}
                    style={{
                        backgroundColor: '#222',
                        borderRadius: 10,
                        padding: 14,
                        borderWidth: 1,
                        borderColor: '#333',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {loading ? (
                        <Feather name="loader" size={26} color="#fff" />
                    ) : (
                        <Feather name="search" size={26} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, width: '100%' }}>
                {friends.length > 0 ? (
                    <>
                        <Text style={{ fontWeight: 'bold', marginBottom: 12, marginLeft: 4, color: '#fff', fontSize: 16 }}>Hasil Pencarian</Text>
                        <FlatList
                            data={friends}
                            renderItem={({ item }) => (
                                <CardFriend
                                    email={item.email}
                                    friendship_status={item.friendship_status}
                                    id={item.id}
                                    friendship_id={item.friendship_id}
                                />
                            )}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={{ paddingBottom: 32 }}
                        />
                    </>
                ) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Feather name="user-x" size={32} color="#aaa" />
                        <Text style={{ color: '#aaa', marginTop: 8 }}>Tidak ada hasil pencarian</Text>
                    </View>
                )}
            </View>
        </View>
    )
}