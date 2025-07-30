import Bubble from "@/components/Bubble";
import InputMessage from "@/components/InputMessage";
import { useMessage } from "@/hooks/useMessage";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { FlatList, Text, View } from "react-native";

export default function Message() {
    const navigation = useNavigation();
    const flatListRef = useRef<FlatList<any>>(null);
    const { name, id } = useLocalSearchParams<{
        name: string;
        id: string;
    }>();
    const { messages, loading, error, fetchMessages } = useMessage(id ? Number(id) : 0);

    useEffect(() => {
        fetchMessages();
    }, [id]);

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

    const renderItem = ({ item }: { item: { content: string; sender_id: number } }) => (
        <Bubble text={item.content} senderId={item.sender_id} />
    );

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#aaa', fontSize: 16 }}>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <>
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
            <InputMessage name={name} conversationId={id} />
        </>
    )
}