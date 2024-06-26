import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICarrier, ICarriersQueryParams } from '@/types/carriers';

export const carriersAPI = createApi({
    reducerPath: 'carriersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        fetchCarriers: build.query<ICarrier[], ICarriersQueryParams>({
            query: (params) => ({ url: 'affiliate/carriers/', params: params })
        }),
    }),
})

export const {
    useFetchCarriersQuery,
    useLazyFetchCarriersQuery,
} = carriersAPI;
