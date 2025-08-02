import { useAuth } from "@/hooks/useAuth";
import { useDeleteMessage } from "@/hooks/useMessage";
import formatTime from "@/utils/formatTime";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Alert, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function Bubble({
    text,
    senderId,
    messageId,
    isActive,
    onOpenMenu,
    onCloseMenu,
    updated_at,
    is_deleted,
    onEdit,
    reply_to,
    onReply,
    is_edited
}: {
    text: string;
    senderId: number;
    messageId?: number;
    isActive?: boolean;
    updated_at: string;
    onOpenMenu?: () => void;
    onCloseMenu?: () => void;
    is_deleted?: boolean;
    onEdit?: () => void;
    reply_to?: {
        id: number;
        content: string;
        sender_name: string;
    } | null;
    onReply?: () => void;
    is_edited?: boolean;
}) {
    const { user } = useAuth();
    const sent = user?.id === senderId;
    const { deleteMessage, loading } = useDeleteMessage();

    const handleDelete = async () => {
        if (!messageId) return;
        try {
            await deleteMessage(messageId);
            onCloseMenu?.();
        } catch (error) {
            Alert.alert("Error", "Failed to delete message.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={onCloseMenu}>
            <View style={{ marginBottom: 8, alignItems: sent ? "flex-end" : "flex-start" }}>
                <Pressable onLongPress={is_deleted ? undefined : onOpenMenu}>
                    <View
                        style={{
                            maxWidth: "75%",
                            backgroundColor: sent ? "#fff" : "#222",
                            paddingVertical: 10,
                            paddingHorizontal: 14,
                            borderRadius: 16,
                            borderTopLeftRadius: sent ? 16 : 4,
                            borderTopRightRadius: sent ? 4 : 16,
                        }}
                    >
                        {reply_to && !is_deleted && (
                            <View
                                style={{
                                    backgroundColor: sent ? "#f0f0f0" : "#333",
                                    padding: 8,
                                    borderRadius: 8,
                                    marginBottom: 6,
                                }}
                            >
                                <Text style={{ color: sent ? "#222" : "#fff", fontWeight: "bold" }}>
                                    {reply_to.sender_name}
                                </Text>
                                <Text style={{ color: sent ? "#222" : "#fff" }}>{reply_to.content}</Text>
                            </View>
                        )}

                        <Text
                            style={{
                                color: sent ? "#222" : "#fff",
                                fontSize: 16,
                                lineHeight: 22,
                            }}
                        >
                            {
                                loading ? "Loading..." : is_deleted ? "Pesan ini telah dihapus." : text
                            }
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                textAlign: "right",
                                color: sent ? "#222" : "#aaa",
                            }}
                        > {is_edited && !is_deleted ? " Diedit" : ""} {formatTime(updated_at)}</Text>
                    </View>
                </Pressable>

                {isActive && (
                    <View
                        style={{
                            backgroundColor: "#444",
                            paddingVertical: 6,
                            borderRadius: 10,
                            marginTop: 6,
                            width: 180,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                onReply?.();
                                onCloseMenu?.();
                            }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 10,
                                borderBottomWidth: sent ? 1 : 0,
                                borderBottomColor: "#ccc",
                            }}
                        >
                            <Text style={{ color: "#fff" }}>Balas Pesan</Text>
                            <Entypo name="reply" size={20} color="white" />
                        </TouchableOpacity>
                        {sent && (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        onEdit?.();
                                        onCloseMenu?.();
                                    }}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#ccc",
                                    }}
                                >
                                    <Text style={{ color: "#fff" }}>Edit Pesan</Text>
                                    <MaterialIcons name="edit" size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDelete();
                                        onCloseMenu?.();
                                    }}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: 10,
                                    }}
                                >
                                    <Text style={{ color: "#fff" }}>Hapus Pesan</Text>
                                    <MaterialIcons name="delete-forever" size={20} color="white" />
                                </TouchableOpacity>
                            </>
                        )}

                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}
