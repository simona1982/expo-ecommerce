import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interfaces/product";


export const getProductsActions = async (limit = 20, offset = 0) => {

    try {
        const { data } = await productsApi.get<Product[]>(`/products`, {
            params: {
                limit: limit,
                offset: offset
            }
        });

        console.log(data);

        return data.map(product => ({
            ...product,
            images: product.images.map(img => `${API_URL}/files/product/${img}`)
        }))
    } catch (error) {
        throw new Error(`Unable to load products`)
    }
}