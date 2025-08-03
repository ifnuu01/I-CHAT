import { useFriends } from "@/hooks/useFriends";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

export default function Request() {
    const { friends, loading, getRequestFriends, acceptFriend } = useFriends();

    useEffect(() => {
        getRequestFriends();
    }, []);

    const handleAcceptFriend = (friendship_id: number) => {
        Alert.alert(
            "Tambah Pertemanan",
            "Apakah Anda yakin ingin menambahkan pertemanan ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Tambah",
                    onPress: async () => {
                        await acceptFriend(friendship_id);
                        await getRequestFriends();
                    }
                }
            ]
        )
    }

    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 16, flex: 1, backgroundColor: '#181818' }}>
            <View style={{ gap: 12 }}>
                {loading ? (
                    <Text style={{ color: '#aaa', fontSize: 16 }}>Loading...</Text>
                ) : friends.length > 0 ? (
                    friends.map((friend) => (
                        <View
                            key={friend.id}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#222',
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor: '#333',
                                padding: 12,
                                marginBottom: 8,
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Image
                                    source={{ uri: friend.avatar || 'https://i.pinimg.com/originals/00/f8/6b/00f86b1463e599e15d0cc3d870505a2e.jpg' }}
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 22,
                                        borderColor: '#333',
                                        borderWidth: 1,
                                        backgroundColor: '#181818',
                                        marginRight: 12,
                                    }}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#fff' }}>{friend.name.slice(0, 10)}{friend.name.length > 10 && '...'}</Text>
                                    <Text style={{ fontSize: 13, color: '#ccc' }}>{friend.email}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleAcceptFriend(friend.friendship_id)}
                                style={{
                                    backgroundColor: '#2563eb',
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 8,
                                }}
                            >
                                <Feather name="check" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
                        <Feather name="user-x" size={32} color="#aaa" />
                        <Text style={{ color: '#aaa', fontSize: 16 }}>Tidak ada permintaan pertemanan</Text>
                    </View>
                )}
            </View>
        </View>
    )
}