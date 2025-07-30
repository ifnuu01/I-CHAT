import { useAuth } from "@/hooks/useAuth";
import { Text, View } from "react-native";

export default function Bubble({ text, senderId }: {
    text: string;
    senderId: number;
}) {
    const { user } = useAuth();
    const sent = user?.id === senderId ? true : false;

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: sent ? 'flex-end' : 'flex-start',
                marginBottom: 8,
            }}
        >
            <View
                style={{
                    maxWidth: '75%',
                    backgroundColor: sent ? '#fff' : '#222',
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 16,
                    borderTopLeftRadius: sent ? 16 : 4,
                    borderTopRightRadius: sent ? 4 : 16,
                    alignSelf: sent ? 'flex-end' : 'flex-start',
                }}
            >
                <Text style={{
                    color: sent ? '#222' : '#fff',
                    fontSize: 16,
                    lineHeight: 22,
                }}>
                    {text}
                </Text>
            </View>
        </View>
    );
}