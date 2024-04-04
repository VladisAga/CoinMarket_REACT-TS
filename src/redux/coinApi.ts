import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.coincap.io/v2/',
        credentials: 'same-origin'
    }),
    endpoints: (build) => ({
        getCoins: build.query({
            query: () => ({
                url: `assets?limit=900`,
                method: 'GET',
                redirect: 'follow',
                credentials: 'same-origin',
            }),
        }),
        getCoinCandle: build.query({
            query: ({interval, coin}) => ({
                url: `candles?interval=${interval}&baseId=${coin}`,
                method: 'GET',
                redirect: 'follow',
                credentials: 'same-origin',
            }),
        }),

    })

});

export const { useLazyGetCoinsQuery, useLazyGetCoinCandleQuery } = coinApi;
