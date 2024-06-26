import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICarrier, ICarriersQueryParams } from '@/types/carriers';

export const carriersAPI = createApi({
    reducerPath: 'carriersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        fetchCarriers: builder.query<ICarrier[], ICarriersQueryParams | null>({
            query: (params) => ({ url: 'affiliate/carriers/', params })
        })
    }),
})

export const {
    useFetchCarriersQuery
} = carriersAPI;
