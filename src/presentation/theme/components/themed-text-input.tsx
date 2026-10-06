import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { useTheme } from "../hooks/use-theme";

interface Props extends Omit<TextInputProps, 'style'> {
    icon?: React.ComponentProps<typeof Ionicons>['name'];
    style?: ViewProps['style'];
}

const ThemedTextInput = ({ icon, style, ...rest }: Props) => {

    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const primaryColor = useTheme().primary;
    const textColor = useTheme().text;

    return (
        <View
            onTouchStart={() => inputRef.current?.focus()}
            style={[
                {
                    ...styles.border,
                    borderColor: isActive ? primaryColor : '#ccc'
                },
                style
            ]}
        >
            {
                icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={textColor}
                        style={{
                            marginRight: 10
                        }}
                    />
                )
            }
            <TextInput
                ref={inputRef}
                placeholderTextColor="#5c5c5c"
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                style={{
                    color: textColor,
                    marginRight: 10,
                    flex: 1
                }}
                {...rest}
            >

            </TextInput>
        </View>
    )
}
export default ThemedTextInput


const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row'
    }
})