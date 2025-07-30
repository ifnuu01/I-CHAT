import { Stack } from 'expo-router';

interface MessageParams {
    name?: string;
}

export default function ConversationLayout() {
    return (
        <Stack
            screenOptions={{
            }}
        >
            <Stack.Screen name="index" options={{
                title: 'Pesan',
                headerTitle: 'I Chat',
            }} />
            <Stack.Screen name="message" options={({ route }) => {
                const { name } = route.params as MessageParams;
                return {
                    title: name || 'Pesan',
                    headerTitle: name || 'I Chat'
                };
            }} />
        </Stack>
    );
}