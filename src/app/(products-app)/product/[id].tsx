import { Size } from '@/core/products/interfaces/product'
import ProductImages from '@/presentation/products/components/ProductImages'
import { useProduct } from '@/presentation/products/hooks/useProduct'
import { useCameraStore } from '@/presentation/store/useCameraStore'
import MenuIconButton from '@/presentation/theme/components/MenuIconButton'
import ThemedButtonGroup from '@/presentation/theme/components/themed-button-group'
import ThemedTextInput from '@/presentation/theme/components/themed-text-input'
import { ThemedView } from '@/presentation/theme/components/themed-view'
import ThemedButton from '@/presentation/theme/themed-button'
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { Formik } from 'formik'
import { useEffect } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, View } from 'react-native'



const ProductScreen = () => {

    const { selectedImages, clearImages } = useCameraStore();

    const { id } = useLocalSearchParams();
    const navigation = useNavigation()

    const { productQuery, productMutation } = useProduct(`${id}`);


    useEffect(() => {
        return () => {
            clearImages();
        }
    }, [])

    useEffect(() => {
        if (productQuery.data) {
            navigation.setOptions({
                title: productQuery.data.title
            });
        }
    }, [productQuery.data]);

    useEffect(() => {

        // Icono de foto
        navigation.setOptions({
            // headerRight: () => (
            //     <Ionicons name="camera-outline" size={30} />
            // )
            headerRight: () => (
                <MenuIconButton
                    icon="camera-outline"
                    onPress={() => router.push('/camera')}
                />
            )
        })
    }, []);

    if (productQuery.isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size={30} />
            </View>
        )
    }

    if (!productQuery.data) {
        return <Redirect href="/(products-app)/(home)" />
    }

    const product = productQuery.data!;

    return (
        <Formik
            initialValues={product}
            onSubmit={(productLike) => productMutation.mutate({
                ...productLike,
                images: [...productLike.images, ...selectedImages]
            })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={productQuery.isFetching}
                                onRefresh={async () => {
                                    await productQuery.refetch();
                                }}
                            />
                        }
                    >
                        {/* TODO imagenes del product  */}
                        <ProductImages
                            // images={values.images}
                            images={[...product.images, ...selectedImages]}
                        />

                        <ThemedView
                            style={{
                                marginHorizontal: 10,
                                marginTop: 20
                            }}
                        >
                            <ThemedTextInput
                                style={{
                                    marginVertical: 5
                                }}
                                placeholder='Título'
                                value={values.title}
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                            />

                            <ThemedTextInput
                                style={{
                                    marginVertical: 5
                                }}
                                placeholder='Slug'
                            />

                            <ThemedTextInput
                                style={{
                                    marginVertical: 5
                                }}
                                multiline
                                numberOfLines={5}
                                placeholder='Descripción'
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                            />
                        </ThemedView>

                        <ThemedView
                            style={{
                                marginHorizontal: 10,
                                marginVertical: 5,
                                flexDirection: 'row',
                                gap: 10
                            }}
                        >
                            <ThemedTextInput
                                style={{
                                    flex: 1
                                }}
                                placeholder='Precio'
                                value={values.price.toString()}
                                onChangeText={handleChange('price')}
                                onBlur={handleBlur('price')}
                            />

                            <ThemedTextInput
                                style={{
                                    flex: 1
                                }}
                                placeholder='Inventario'
                                value={values.stock.toString()}
                                onChangeText={handleChange('stock')}
                                onBlur={handleBlur('stock')}
                            />

                        </ThemedView>

                        <ThemedView
                            style={{
                                marginHorizontal: 10
                            }}
                        >

                            <ThemedButtonGroup
                                options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                                selectedOption={values.sizes}
                                onSelect={(selectedOptions) => {

                                    const newSizeValue = values.sizes.includes(selectedOptions as Size)
                                        ? values.sizes.filter(s => s !== selectedOptions) : [...values.sizes, selectedOptions];

                                    setFieldValue('sizes', newSizeValue);
                                }}
                            />

                            <ThemedButtonGroup
                                options={['kid', 'men', 'women', 'unisex']}
                                selectedOption={[values.gender]}
                                onSelect={(selectedOption) => setFieldValue('gender', selectedOption)}
                            />
                        </ThemedView>

                        {/* Button para guardar  */}
                        <View
                            style={{
                                marginHorizontal: 10,
                                marginBottom: 50,
                                marginTop: 20
                            }}
                        >
                            <ThemedButton
                                icon='save-outline'
                                onPress={() => handleSubmit()}
                            >
                                Guardar
                            </ThemedButton>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </Formik>
    )
}
export default ProductScreen