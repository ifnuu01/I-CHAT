import { Stack } from 'expo-router';

export default function SettingLayout() {
    return (
        <Stack
            screenOptions={{
            }}
        >
            <Stack.Screen name="index" options={{
                title: 'Pengaturan',
            }} />
        </Stack>
    );
}