import { Stack } from 'expo-router';

export default function FriendshipLayout() {
    return (
        <Stack
            screenOptions={{
            }}
        >
            <Stack.Screen name="index" options={{
                title: 'Cari Teman',
            }} />
            <Stack.Screen name="request" options={{
                title: 'Permintaan Pertemanan',
            }} />
            <Stack.Screen name="list" options={{
                title: 'Daftar Teman',
            }} />
        </Stack>
    );
}