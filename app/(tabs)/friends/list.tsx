import { useFriends } from "@/hooks/useFriends";
import Feather from "@expo/vector-icons/build/Feather";
import { useEffect } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

export default function List() {
    const { friends, loading, getFriends, removeFriend, cancelAddFriend } = useFriends();

    useEffect(() => {
        getFriends();
        console.log(friends);
    }, []);



    const handleRemoveFriend = (friendship_id: number) => {
        Alert.alert(
            "Hapus Pertemanan",
            "Apakah Anda yakin ingin menghapus pertemanan ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    onPress: async () => {
                        await removeFriend(friendship_id);
                        await getFriends();
                    }
                }
            ]
        )
    }

    const handleCancelAddFriend = async (friendship_id: number) => {
        Alert.alert(
            "Batalkan Menambahkan Pertemanan",
            "Apakah Anda yakin ingin membatalkan permintaan pertemanan ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Batalkan",
                    onPress: async () => {
                        await cancelAddFriend(friendship_id);
                        await getFriends();
                    }
                }
            ]
        )
    };

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
                                borderBottomWidth: 1,
                                borderBottomColor: '#222',
                                paddingBottom: 10,
                                marginBottom: 4,
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Image
                                    source={{ uri: friend.avatar || 'https://i.pinimg.com/originals/00/f8/6b/00f86b1463e599e15d0cc3d870505a2e.jpg' }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                        borderColor: '#333',
                                        borderWidth: 1,
                                        backgroundColor: '#181818',
                                        marginRight: 12,
                                    }}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>{friend.name}</Text>
                                    <Text style={{ fontSize: 14, color: '#ccc' }}>{friend.email}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={
                                    friend.friendship_status === 'accepted' ? () => handleRemoveFriend(friend.friendship_id)
                                        : () => handleCancelAddFriend(friend.friendship_id)
                                }
                                style={{
                                    backgroundColor: '#2563eb',
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#333',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Feather name={friend.friendship_status === 'accepted' ? "user-minus" : "x"} size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
                        <Text style={{ color: '#aaa', fontSize: 16 }}>Tidak ada teman yang ditemukan :(</Text>
                    </View>
                )}
            </View>
        </View>
    )
}