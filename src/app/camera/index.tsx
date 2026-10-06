import { useCameraStore } from '@/presentation/store/useCameraStore';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { useTheme } from '@/presentation/theme/hooks/use-theme';
import Ionicons from '@react-native-vector-icons/ionicons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { requestPermissionsAsync } from 'expo-media-library';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function CameraScreen() {

    const { addSelectedImage } = useCameraStore();

    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    // const [mediaPermission, requestMediaPermission] = usePermissions();

    const [selectedImage, setSelectedImage] = useState<string>();

    const cameraRef = useRef<CameraView>(null);

    const onRequestPermissions = async () => {
        try {
            const { status: cameraPermissionStatus } = await requestCameraPermission();

            if (cameraPermissionStatus !== 'granted') {
                Alert.alert('Error', 'Necesitamos permisos a la camara para tomar fotos');
                return;
            }

            const { status: mediaPermissionStatus } = await requestPermissionsAsync();

            if (mediaPermissionStatus !== 'granted') {
                Alert.alert('Error', 'Necesitamos permisos a la galeria para guardar las imagenes');
                return;
            }

        } catch (error) {
            console.log(`No se pudo obtener los permisos`)
            Alert.alert('Error', 'Algo salio mal con los permisos');
        }
    }


    if (!cameraPermission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!cameraPermission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View
                style={{
                    ...styles.container,
                    marginHorizontal: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={styles.message}>
                    Necesitamos permiso para usar la cámara y la galeria
                </Text>
                <TouchableOpacity
                    onPress={onRequestPermissions}
                >
                    <ThemedText>Solicitar Permiso</ThemedText>
                </TouchableOpacity>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const onPickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            // allowsEditing: true,
            aspect: [4, 3], // cuatro de ancho y tres de alto
            quality: 0.5,
            allowsMultipleSelection: true,
            selectionLimit: 3
        });

        if (result.canceled) return;

        console.log(result.assets);

        result.assets.forEach(asset => {
            addSelectedImage(asset.uri);
        });

        router.dismiss();

    }

    const onShutterButtonPress = async () => {
        if (!cameraRef.current) return;

        const picture = await cameraRef.current.takePictureAsync({
            quality: 0.7
        });

        console.log(picture)

        if (!picture.uri) {
            return;
        }

        setSelectedImage(picture.uri);

        //TODO guardar imagen
    }

    const onReturnCancel = () => {

        //TODO limpiar estado

        router.dismiss();
    }

    const onPictureAccepted = async () => {

        if (!selectedImage) return;

        //Crear el Asset en mi galeria 
        // await Asset.create(selectedImage);

        addSelectedImage(selectedImage);

        router.dismiss();
    }

    const onRetakePhoto = () => {
        setSelectedImage(undefined);
    }

    if (selectedImage) {
        return (
            <View style={styles.container}>

                <Image
                    source={{ uri: selectedImage }}
                    style={styles.camera}
                />
                <ConfirmImageButton onPress={onPictureAccepted} />
                <RetakeImageButton onPress={onRetakePhoto} />
                <ReturnCancelButton onPress={onReturnCancel} />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
            />

            <ShutterButton onPress={onShutterButtonPress} />

            <FlipCameraButton onPress={toggleCameraFacing} />

            {/* TODO  */}
            <GaleriaButton onPress={onPickImages} />

            <ReturnCancelButton onPress={onReturnCancel} />
        </View>
    );
}

// Custom components
const ShutterButton = ({ onPress = () => { } }) => {

    const dimension = useWindowDimensions()
    const primaryColor = useTheme().primary;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 32,
                    left: dimension.width / 2 - 32,
                    borderColor: primaryColor
                }
            ]}
        >

        </TouchableOpacity>
    )
}

const FlipCameraButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.flipCameraButton}
        >
            <Ionicons name="camera-reverse-outline" size={30} color='white' />
        </TouchableOpacity>
    )
}

const GaleriaButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.galleryButton}
        >
            <Ionicons name="images-outline" size={30} color='white' />
        </TouchableOpacity>
    )
}

const ReturnCancelButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.returnCancelButton}
        >
            <Ionicons name="arrow-back-outline" size={30} color='white' />
        </TouchableOpacity>
    )
}

const ConfirmImageButton = ({ onPress = () => { } }) => {

    const dimension = useWindowDimensions()
    const primaryColor = useTheme().primary;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 32,
                    left: dimension.width / 2 - 32,
                    borderColor: primaryColor
                }
            ]}
        >
            <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
        </TouchableOpacity>
    )
}

const RetakeImageButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.flipCameraButton}
        >
            <Ionicons name="close-outline" size={30} color='white' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    shutterButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
        // borderColor: 'red',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipCameraButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        right: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    returnCancelButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        top: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
});