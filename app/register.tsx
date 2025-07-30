import { useAuth } from "@/hooks/useAuth";
import { Entypo, Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function registerScreen() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const { loading, error, registrasi } = useAuth();

    const handleRegister = () => {
        registrasi(inputs.name, inputs.email, inputs.password, inputs.password_confirmation);
    };

    useEffect(() => {
        if (error?.message) {
            Alert.alert("Error", error.message || "An error occurred");
        }
    }, [error]);

    return (
        <View style={{ flex: 1, backgroundColor: '#181818', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
                width: '90%',
                backgroundColor: '#222',
                borderRadius: 18,
                padding: 24,
                shadowColor: '#000',
                shadowOpacity: 0.12,
                shadowRadius: 12,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
                    <Entypo name="message" size={32} color={'#fff'} />
                    <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#fff' }}>I CHAT</Text>
                </View>
                <View style={{ marginBottom: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Feather name="user" size={16} color="#fff" />
                        <Text style={{ color: '#fff' }}>Nama</Text>
                    </View>
                    <TextInput
                        placeholder="Masukkan nama"
                        placeholderTextColor="#aaa"
                        value={inputs.name}
                        onChangeText={(text) => setInputs({ ...inputs, name: text })}
                        style={{
                            borderWidth: 1,
                            borderColor: '#333',
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            marginTop: 6,
                            color: '#fff',
                            backgroundColor: '#181818',
                        }}
                    />
                    {error?.name && (<Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>{error?.name}</Text>)}
                </View>
                <View style={{ marginBottom: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Entypo name="email" size={16} color="#fff" />
                        <Text style={{ color: '#fff' }}>Email</Text>
                    </View>
                    <TextInput
                        placeholder="Masukkan email"
                        placeholderTextColor="#aaa"
                        value={inputs.email}
                        onChangeText={(text) => setInputs({ ...inputs, email: text })}
                        style={{
                            borderWidth: 1,
                            borderColor: '#333',
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            marginTop: 6,
                            color: '#fff',
                            backgroundColor: '#181818',
                        }}
                    />
                    {error?.email && (<Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>{error?.email}</Text>)}
                </View>
                <View style={{ marginBottom: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Entypo name="lock" size={16} color="#fff" />
                        <Text style={{ color: '#fff' }}>Password</Text>
                    </View>
                    <TextInput
                        placeholder="Masukkan password"
                        placeholderTextColor="#aaa"
                        value={inputs.password}
                        onChangeText={(text) => setInputs({ ...inputs, password: text })}
                        secureTextEntry={true}
                        style={{
                            borderWidth: 1,
                            borderColor: '#333',
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            marginTop: 6,
                            color: '#fff',
                            backgroundColor: '#181818',
                        }}
                    />
                    {error?.password && (<Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>{error?.password}</Text>)}
                </View>
                <View style={{ marginBottom: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Entypo name="lock" size={16} color="#fff" />
                        <Text style={{ color: '#fff' }}>Konfirmasi Password</Text>
                    </View>
                    <TextInput
                        placeholder="Masukkan konfirmasi password"
                        placeholderTextColor="#aaa"
                        value={inputs.password_confirmation}
                        onChangeText={(text) => setInputs({ ...inputs, password_confirmation: text })}
                        secureTextEntry={true}
                        style={{
                            borderWidth: 1,
                            borderColor: '#333',
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            marginTop: 6,
                            color: '#fff',
                            backgroundColor: '#181818',
                        }}
                    />
                    {error?.password_confirmation && (<Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>{error?.password_confirmation}</Text>)}
                </View>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={{
                        backgroundColor: '#2563eb',
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 12,
                        marginTop: 8,
                        gap: 8,
                    }}>
                    <Feather name="user-plus" size={18} color="#fff" />
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
                        {loading ? "Loading..." : "Daftar"}
                    </Text>
                </TouchableOpacity>
                <View style={{ marginTop: 16 }}>
                    <Text style={{ color: '#aaa', textAlign: 'center', fontSize: 14 }}>
                        Sudah punya akun? <Link href={'/login'} style={{ color: '#2563eb' }}>Masuk</Link>
                    </Text>
                </View>
            </View>
        </View>
    )
}