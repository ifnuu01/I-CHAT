import { useProfile } from '@/hooks/useProfile';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';

export default function AvatarUploader({ avatar }: { avatar: string }) {
    const { updateAvatar } = useProfile();
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [avatarImage, setAvatarImage] = useState(avatar);

    useEffect(() => {
        setAvatarImage(avatar);
    }, [avatar]);

    const handlePickImage = async () => {
        setAvatarLoading(true);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });
        if (!result.canceled) {
            const file = result.assets[0];
            const response = await updateAvatar({
                uri: file.uri,
                type: file.type ?? 'image/jpeg',
                name: file.fileName ?? 'avatar.jpg',
            });
            if (response) {
                setAvatarImage(response.data.avatar);
            }
        }
        setAvatarLoading(false);
    };

    return (
        <View style={{ alignItems: 'center', gap: 16, position: 'relative' }}>
            <Image
                source={{ uri: avatarImage || 'https://i.pinimg.com/originals/00/f8/6b/00f86b1463e599e15d0cc3d870505a2e.jpg' }}
                style={{ width: 80, height: 80, borderRadius: 40, borderColor: '#444', borderWidth: 2, backgroundColor: '#333' }}
            />
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        backgroundColor: '#2563eb',
                        padding: 6,
                        borderRadius: 100,
                    }}
                    onPress={handlePickImage}
                    disabled={avatarLoading}
                >
                    {avatarLoading ? <ActivityIndicator color="#fff" /> : <MaterialIcons name="edit" size={18} color="#fff" />}
                </TouchableOpacity>
            </View>
        </View>
    );
}
