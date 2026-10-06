import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interfaces/product";

const emptyProduct: Product = {
    id: '',
    title: 'Nuevo producto',
    price: 0,
    description: '',
    images: [],
    slug: '',
    gender: Gender.Men,
    sizes: [],
    stock: 0,
    tags: []
}

export const getProductByIdActions = async (id: string): Promise<Product> => {

    console.log({ id })

    if (id === 'new') return emptyProduct;

    try {
        const { data } = await productsApi.get<Product>(`/products/${id}`);

        return {
            ...data,
            images: data.images.map(img => `${API_URL}/files/product/${img}`)
        }
    } catch (error) {
        throw new Error(`Product with id ${id} not found`);
    }
}