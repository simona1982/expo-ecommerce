import ProductList from '@/presentation/products/components/ProductList';
import { useProducts } from '@/presentation/products/hooks/useProducts';
import { FAB } from '@/presentation/theme/components/FAB';
import { useTheme } from '@/presentation/theme/hooks/use-theme';
import { router } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

    const { productsQuery, loadNextPage } = useProducts()
    const primaryColor = useTheme().primary;

    if (productsQuery.isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator color={primaryColor} size={30} />
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View style={{ paddingHorizontal: 10 }}>
                <ProductList
                    products={productsQuery.data?.pages.flatMap(page => page) ?? []}
                    loadNextPage={loadNextPage}
                />

                <FAB
                    iconName={'add-outline'}
                    onPress={() => router.push("/(products-app)/product/new")}
                />
            </View>
        </SafeAreaView>
    )
}
export default HomeScreen