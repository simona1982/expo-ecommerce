import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';


interface Props {
    iconName: React.ComponentProps<typeof Ionicons>['name'];
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const FAB = ({ style, iconName, onPress }: Props) => {
    return (
        <TouchableOpacity
            style={[
                {
                    zIndex: 99,
                    position: 'absolute',
                    bottom: 30,
                    right: 20,

                    width: 60,
                    height: 60,

                    shadowColor: 'black',
                    backgroundColor: 'black',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 10,
                    elevation: 3,
                    borderRadius: 13,

                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}
            onPress={onPress}
        >
            <Ionicons name={iconName} size={30} color="white" />
        </TouchableOpacity>
    );
};