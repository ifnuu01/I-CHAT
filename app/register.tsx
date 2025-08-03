import { useAuth } from "@/hooks/useAuth";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
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
                width: '95%',
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
                <Text style={{ color: '#aaa', marginBottom: 4 }}>Nama</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
                    <Feather name="user" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
                    <TextInput
                        placeholder="Masukkan nama"
                        placeholderTextColor="#888"
                        value={inputs.name}
                        onChangeText={(text) => setInputs({ ...inputs, name: text })}
                        style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                    />
                </View>
                {error?.name && (<Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>{error?.name}</Text>)}
                <Text style={{ color: '#aaa', marginBottom: 4 }}>Email</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
                    <Entypo name="email" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
                    <TextInput
                        placeholder="Masukkan email"
                        placeholderTextColor="#888"
                        value={inputs.email}
                        onChangeText={(text) => setInputs({ ...inputs, email: text })}
                        style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                    />
                </View>
                {error?.email && (<Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>{error?.email}</Text>)}
                <Text style={{ color: '#aaa', marginBottom: 4 }}>Password</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
                    <Entypo name="lock" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
                    <TextInput
                        placeholder="Masukkan password"
                        placeholderTextColor="#888"
                        value={inputs.password}
                        onChangeText={(text) => setInputs({ ...inputs, password: text })}
                        secureTextEntry={true}
                        style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                    />
                </View>
                {error?.password && (<Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>{error?.password}</Text>)}
                <Text style={{ color: '#aaa', marginBottom: 4 }}>Konfirmasi Password</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 10 }}>
                    <MaterialIcons name="lock-reset" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
                    <TextInput
                        placeholder="Konfirmasi password"
                        placeholderTextColor="#888"
                        value={inputs.password_confirmation}
                        onChangeText={(text) => setInputs({ ...inputs, password_confirmation: text })}
                        secureTextEntry={true}
                        style={{ flex: 1, color: '#fff', paddingHorizontal: 0, paddingVertical: 10, fontSize: 15 }}
                    />
                </View>
                {error?.password_confirmation && (<Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>{error?.password_confirmation}</Text>)}
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
                    <Text style={{ color: '#888', textAlign: 'center', fontSize: 14 }}>
                        Sudah punya akun? <Link href={'/login'} style={{ color: '#2563eb' }}>Masuk</Link>
                    </Text>
                </View>
            </View>
        </View >
    )
}