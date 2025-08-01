import { useAuth } from "@/hooks/useAuth";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Alert, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function Bubble({
    text,
    senderId,
    messageId,
    isActive,
    onOpenMenu,
    onCloseMenu,
}: {
    text: string;
    senderId: number;
    messageId?: number;
    isActive?: boolean;
    onOpenMenu?: () => void;
    onCloseMenu?: () => void;
}) {
    const { user } = useAuth();
    const sent = user?.id === senderId;

    return (
        <TouchableWithoutFeedback onPress={onCloseMenu}>
            <View style={{ marginBottom: 8, alignItems: sent ? "flex-end" : "flex-start" }}>
                <Pressable onLongPress={onOpenMenu} >
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
                        <Text
                            style={{
                                color: sent ? "#222" : "#fff",
                                fontSize: 16,
                                lineHeight: 22,
                            }}
                        >
                            {text}
                        </Text>
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
                                Alert.alert("Reply", "This feature is not implemented yet.");
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
                            <Text style={{ color: "#fff" }}>Balas Pesan</Text>
                            <Entypo name="reply" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert("Edit", "This feature is not implemented yet.");
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
                                Alert.alert("Hapus", "This feature is not implemented yet.");
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
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}
