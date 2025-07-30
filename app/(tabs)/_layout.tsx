import { Entypo, Fontisto, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function RootLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#e8efffff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#222',
          borderTopColor: '#333',
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          color: '#fff',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="conversations" options={{
        tabBarIcon: ({ color }) => <Entypo name="message" size={24} color={color} />,
      }} />
      <Tabs.Screen name="friends" options={{
        tabBarIcon: ({ color }) => <Fontisto name="world" size={24} color={color} />,
      }} />
      <Tabs.Screen name="settings" options={{
        title: 'Pengaturan',
        tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
      }} />
    </Tabs>
  );
}