import { getProductsActions } from "@/core/products/actions/get-products-actions";
import { useInfiniteQuery } from "@tanstack/react-query";


export const useProducts = () => {

    // Queries
    const productsQuery = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        queryFn: ({ pageParam }) => getProductsActions(20, pageParam * 20),
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60, // 1 hora
        getNextPageParam: (lastPage, allPages) => allPages.length,
    })

    // [[p1,p2,p3], [p4,p5,p6]]

    return {
        // Properties
        productsQuery,

        // Methods
        loadNextPage: productsQuery.fetchNextPage
    }
}