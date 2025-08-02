import { useSendMessage, useUpdateMessage } from "@/hooks/useMessage";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function InputMessage({ conversationId,
    name,
    editMessage,
    setEditMessage,
    replyToMessage,
    setReplyToMessage
}: {
    conversationId: string | number | undefined;
    name: string;
    editMessage: { id: number; content: string } | null;
    setEditMessage: (message: { id: number; content: string } | null) => void;
    replyToMessage: { id: number; content: string } | null;
    setReplyToMessage: (message: { id: number; content: string } | null) => void;
}) {
    const { sendMessage, loading, error } = useSendMessage();
    const { updateMessage, loading: updating } = useUpdateMessage();
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (editMessage) {
            setText(editMessage.content);
        }
    }, [editMessage]);

    const handleSend = async () => {
        if (text.trim() === '') return;
        if (editMessage) {
            await updateMessage(editMessage.id, text);
            setEditMessage(null);
            setText('');
        } else {
            await sendMessage(Number(conversationId), text, replyToMessage ? replyToMessage.id : null);
            if (replyToMessage) {
                setReplyToMessage(null);
            }
            setText('');
        }
    }

    const handleCancel = () => {
        setEditMessage(null);
        setReplyToMessage(null);
        setText('');
    }

    if (error) {
        console.error("Error sending message:", error);
    }

    function getContentText(msg: { id: number; content: string } | null) {
        if (!msg) return "";
        return msg.content;
    }

    return (
        <>
            {(editMessage || replyToMessage) && (
                <View
                    style={{
                        alignItems: 'flex-start',
                        paddingHorizontal: 20,
                        paddingBottom: 4,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#222',
                            padding: 10,
                            borderRadius: 16,
                            width: '100%',
                            gap: 4,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >

                        <Text style={{
                            backgroundColor: '#fff',
                            padding: 10,
                            borderRadius: 8,
                            color: '#222',
                            flex: 1,
                        }}>
                            {getContentText(editMessage || replyToMessage).slice(0, 25)}
                            {getContentText(editMessage || replyToMessage).length > 25 && '...'}
                        </Text>
                        <TouchableOpacity onPress={handleCancel}>
                            <AntDesign name="closesquare" size={46} color="white" />
                        </TouchableOpacity>
                    </View>
                </View >
            )
            }
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
                    disabled={loading || updating}
                >
                    {
                        (loading || updating) ? (
                            <ActivityIndicator color="#333" size="small" />
                        ) : (
                            <Ionicons name="send" size={22} color="#222" />
                        )
                    }

                </TouchableOpacity>
            </View>
        </>
    )
}
