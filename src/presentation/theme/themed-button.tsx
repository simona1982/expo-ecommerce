import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { ThemedText } from "./components/themed-text";
import { useTheme } from "./hooks/use-theme";

interface Props extends PressableProps {
    children: string;
    icon?: React.ComponentProps<typeof Ionicons>['name'];
}


const ThemedButton = ({ children, icon, ...rest }: Props) => {

    const textColor = useTheme().text;
    const primaryColor = useTheme().primary;

    return (
        <Pressable
            {...rest}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? primaryColor + '90' : primaryColor
                },
                styles.button
            ]}
        >

            <ThemedText style={{ color: 'white' }}>{children}</ThemedText>

            {
                icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color='white'
                        style={{
                            marginRight: 10
                        }}
                    />
                )
            }
        </Pressable>
    )
}
export default ThemedButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})