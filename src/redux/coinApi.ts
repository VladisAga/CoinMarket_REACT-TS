import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.coincap.io/v2/',
        credentials: 'same-origin'
    }),
    endpoints: (build) => ({
        getCoins: build.query({
            query: ( limit) => ({
                url: `assets?limit=${limit}`,
                method: 'GET',
                redirect: 'follow',
                credentials: 'same-origin',
            }),
        })
    })
});

export const { useLazyGetCoinsQuery } = coinApi;
