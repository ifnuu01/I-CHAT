import { useFriends } from "@/hooks/useFriends";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

export default function CardFriend({ email, friendship_status, id, friendship_id }: {
    email: string;
    friendship_status: "none" | "friends" | "pending_sent" | "pending_received";
    id: number;
    friendship_id: number;
}) {
    const { loading, error, addFriend, removeFriend, acceptFriend, cancelAddFriend } = useFriends();
    const [friendshipStatus, setFriendshipStatus] = useState(friendship_status);
    const [currentFriendshipId, setCurrentFriendshipId] = useState(friendship_id);

    const handleAddFriend = async () => {
        const result = await addFriend(id);

        if (result?.message) {
            Alert.alert("Success", "Friend request sent successfully");
            setFriendshipStatus("pending_sent");
            setCurrentFriendshipId(result.friendship_id);
        }
    };

    const handleRemoveFriend = async () => {
        const result = await removeFriend(currentFriendshipId);
        if (result?.message) {
            Alert.alert("Success", "Friend removed successfully");
            setFriendshipStatus("none");
        }
    };

    const handleAcceptFriend = async () => {
        const result = await acceptFriend(currentFriendshipId);
        if (result?.message) {
            Alert.alert("Success", "Friend request accepted successfully");
            setFriendshipStatus("friends");
        }
    };

    const handleCancelAddFriend = async () => {
        const result = await cancelAddFriend(currentFriendshipId);
        if (result?.message) {
            Alert.alert("Success", "Friend request canceled successfully");
            setFriendshipStatus("none");
        }
    };

    useEffect(() => {
        if (error?.message) {
            Alert.alert("Error", error.message || "An error occurred");
        }
    }, [error]);

    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#222',
                marginBottom: 8,
                paddingBottom: 8,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    gap: 8,
                }}
            >
                <Image
                    source={{ uri: 'https://i.pinimg.com/originals/00/f8/6b/00f86b1463e599e15d0cc3d870505a2e.jpg' }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        borderColor: '#333',
                        borderWidth: 1,
                        backgroundColor: '#181818',
                    }}
                    className="mr-3"
                />
                <Text className='text-base flex-1 ml-2' style={{ color: '#fff' }} numberOfLines={1}>
                    {email}
                </Text>
            </View>

            <TouchableOpacity
                onPress={
                    friendshipStatus === 'none' ? handleAddFriend
                        : friendshipStatus === 'friends' ? handleRemoveFriend
                            : friendshipStatus === 'pending_sent' ? handleCancelAddFriend
                                : friendshipStatus === 'pending_received' ? handleAcceptFriend
                                    : undefined
                }
                style={{
                    backgroundColor: '#222',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#333',
                }}
                disabled={loading}
            >
                {loading ? (
                    <Feather name="loader" size={20} color="#fff" />
                ) : friendshipStatus === 'none' ? (
                    <Feather name="user-plus" size={20} color="#fff" />
                ) : friendshipStatus === 'friends' ? (
                    <Feather name="user-minus" size={20} color="#fff" />
                ) : friendshipStatus === 'pending_sent' ? (
                    <Feather name="x" size={20} color="#fff" />
                ) : friendshipStatus === 'pending_received' ? (
                    <Feather name="check" size={20} color="#fff" />
                ) : null}
            </TouchableOpacity>
        </View>
    )
}