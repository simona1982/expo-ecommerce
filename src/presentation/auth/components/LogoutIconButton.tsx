import { useTheme } from '@/presentation/theme/hooks/use-theme';
import Ionicons from '@react-native-vector-icons/ionicons';
import { TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';


const LogoutIconButton = () => {

    const primaryColor = useTheme().primary;
    const { logout } = useAuthStore()

    return (
        <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={logout}
        >
            <Ionicons name="log-out-outline" size={24} color={primaryColor} />
        </TouchableOpacity>
    )
}
export default LogoutIconButton