import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/use-theme';
import { ThemedText } from './themed-text';

interface Props {
    options: string[];
    selectedOption: string[];

    onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOption, onSelect }: Props) => {

    const primaryColor = useTheme().primary

    return (
        <View style={styles.container}>
            {
                options.map(option => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.button,
                            selectedOption.includes(option) && {
                                backgroundColor: primaryColor
                            }
                        ]}
                        onPress={() => onSelect(option)}
                    >
                        <ThemedText
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={[
                                styles.buttonText,
                                selectedOption.includes(option) && styles.selectedButtonText
                            ]}
                        >
                            {option[0].toUpperCase() + option.slice(1)}
                        </ThemedText>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}
export default ThemedButtonGroup

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonText: {
        fontSize: 16
    },
    selectedButtonText: {
        color: '#fff'
    }
})