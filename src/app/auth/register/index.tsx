import ThemedLink from '@/presentation/theme/components/themed-link'
import { ThemedText } from '@/presentation/theme/components/themed-text'
import ThemedTextInput from '@/presentation/theme/components/themed-text-input'
import { useTheme } from '@/presentation/theme/hooks/use-theme'
import ThemedButton from '@/presentation/theme/themed-button'
import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'


const RegisterScreen = () => {

    const backgroundColor = useTheme().background;
    const { height } = useWindowDimensions()

    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{
                flex: 1,
            }}
        >
            <ScrollView
                style={{
                    paddingHorizontal: 40,
                    backgroundColor: backgroundColor
                }}
            >
                <View
                    style={{
                        paddingTop: height * 0.35
                    }}
                >
                    <ThemedText type="title">Crear cuenta</ThemedText>
                    <ThemedText style={{ color: 'grey' }}>Por favor crea una cuenta para continuar.</ThemedText>

                </View>


                {/* Email y Password  */}
                <View
                    style={{
                        marginTop: 20
                    }}
                >
                    <ThemedTextInput
                        placeholder='Nombre completo'
                        autoCapitalize='words'
                        icon='person-outline'
                    />

                    <ThemedTextInput
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        icon='mail-outline'
                    />

                    <ThemedTextInput
                        placeholder='Contraseña'
                        secureTextEntry
                        autoCapitalize='none'
                        icon='lock-closed-outline'
                    />
                </View>

                {/* Spacer  */}
                <View style={{ marginTop: 10 }} />

                {/* Botones  */}
                <ThemedButton
                    icon='arrow-forward-outline'
                >
                    Crear cuenta
                </ThemedButton>

                {/* Spacer  */}
                <View style={{ marginTop: 50 }} />

                {/* Enlace a registro */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ThemedText>¿ Ya tienes cuenta ?</ThemedText>
                    <ThemedLink href='/auth/login' style={{ marginHorizontal: 5 }}>Ingresar</ThemedLink>
                </View>


            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen