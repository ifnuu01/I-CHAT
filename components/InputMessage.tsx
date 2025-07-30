import { useSendMessage } from "@/hooks/useMessage";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, TextInput, TouchableOpacity, View } from "react-native";

export default function InputMessage({ conversationId, name }: { conversationId: string | number | undefined; name: string }) {
    const { sendMessage, loading, error } = useSendMessage();
    const [text, setText] = useState<string>('');
    // console.log(text);

    const handleSend = async () => {
        if (text.trim() === '') return;
        await sendMessage(Number(conversationId), text);
        setText('');
    }
    if (error) {
        console.error("Error sending message:", error);
    }


    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingBottom: 42,
                paddingTop: 10,
                backgroundColor: '#222',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                borderTopWidth: 1,
                borderColor: '#333',
            }}
        >
            <TextInput
                placeholder={`Ketik pesan untuk ${name}...`}
                placeholderTextColor="#aaa"
                style={{
                    flex: 1,
                    backgroundColor: '#181818',
                    color: '#fff',
                    borderRadius: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: '#333',
                    fontSize: 16,
                }}
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity
                style={{
                    marginLeft: 10,
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => handleSend()}
                disabled={loading}
            >
                {
                    loading ? (
                        <ActivityIndicator color="#333" size="small" />
                    ) : (
                        <Ionicons name="send" size={22} color="#222" />
                    )
                }

            </TouchableOpacity>
        </View>
    )
}
