import Bubble from "@/components/Bubble";
import InputMessage from "@/components/InputMessage";
import { useMessage } from "@/hooks/useMessage";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ImageBackground, Text, View } from "react-native";

export default function Message() {
    const navigation = useNavigation();
    const flatListRef = useRef<FlatList<any>>(null);
    const [activeBubbleId, setActiveBubbleId] = useState<number | null>(null);
    const { name, id } = useLocalSearchParams<{
        name: string;
        id: string;
    }>();
    const { messages, loading, error, fetchMessages } = useMessage(id ? Number(id) : 0);
    const [editMessage, setEditMessage] = useState<{ id: number; content: string } | null>(null);
    const [replyToMessage, setReplyToMessage] = useState<{ id: number; content: string } | null>(null);

    useEffect(() => {
        fetchMessages();
    }, [id]);
    // console.log("Messages:", messages);

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            });
            return () => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: { display: 'flex' },
                });
            }
        }, [navigation])
    );

    const renderItem = ({ item }: {
        item:
        {
            content: string;
            sender_id: number;
            id: number;
            updated_at: string;
            is_deleted: boolean;
            is_edited: boolean;
            reply_to?: {
                id: number;
                content: string;
                sender_name: string;
            } | null;
        }
    }) => (
        <Bubble
            text={item.content}
            senderId={item.sender_id}
            messageId={item.id}
            isActive={activeBubbleId === item.id}
            onOpenMenu={() => setActiveBubbleId(item.id)}
            onCloseMenu={() => setActiveBubbleId(null)}
            onEdit={() => {
                console.log("Editing message:", item);
                setEditMessage({ id: item.id, content: item.content })
            }}
            onReply={() => {
                console.log("Replying to message:", item);
                setReplyToMessage({ id: item.id, content: item.content });
            }}
            updated_at={item.updated_at}
            is_deleted={item.is_deleted}
            reply_to={item.reply_to}
            is_edited={item.is_edited}
        />
    );

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#aaa', fontSize: 16 }}>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('@/assets/images/bg-chat.png')}
            style={{
                flex: 1,
            }}
            resizeMode="cover"
        >
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#aaa', fontSize: 16 }}>Loading...</Text>
                    </View>
                ) : messages.length > 0 ? (
                    <FlatList
                        ref={flatListRef}
                        data={messages as any[]}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={renderItem}
                        inverted
                        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }}
                        keyboardShouldPersistTaps="handled"
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#aaa', fontSize: 16 }}>Tidak ada pesan</Text>
                    </View>
                )
            }
            <InputMessage
                name={name}
                conversationId={id}
                editMessage={editMessage}
                setEditMessage={setEditMessage}
                replyToMessage={replyToMessage}
                setReplyToMessage={setReplyToMessage}
            />
        </ImageBackground>
    )
}