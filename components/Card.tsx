import formatTime from "@/utils/formatTime";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Card({
    name,
    message,
    time,
    id,
    is_deleted,
}: {
    name: string;
    message: string;
    time: string;
    id: number | string;
    is_deleted: boolean;
}) {
    return (
        <TouchableOpacity
            style={{
                paddingHorizontal: 10,
                marginBottom: 14,
            }}
            onPress={() => router.push({
                pathname: `/(tabs)/conversations/message`,
                params: { name, id: id.toString() }
            })}
        >
            <View
                style={{
                    backgroundColor: '#141414',
                    borderBottomColor: '#333',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        paddingVertical: 10,
                    }}
                >
                    <Image
                        source={{ uri: 'https://i.pinimg.com/originals/00/f8/6b/00f86b1463e599e15d0cc3d870505a2e.jpg' }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            borderColor: '#444',
                            borderWidth: 1,
                            backgroundColor: '#222',
                        }}
                    />
                    <View>
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>{name}</Text>
                        <Text style={{ color: '#ccc' }}>
                            {is_deleted ? "Pesan ini telah dihapus." : (message || 'Belum ada pesan baru').slice(0, 20)}{message && message.length > 20 && '...'}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        paddingTop: 10,
                    }}
                >
                    <Text style={{ color: '#aaa', fontSize: 12 }}>{formatTime(time) || '20:20'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}