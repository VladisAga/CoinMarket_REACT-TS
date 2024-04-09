import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 interface IgetCoinCandle {
    interval: string;
    coin: string;
 }

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.coincap.io/v2/',
        credentials: 'same-origin'
    }),
    endpoints: (build) => ({
        getCoins: build.query({
            query: (number) => ({
                url: `assets?limit=${number}`,
                method: 'GET',
                redirect: 'follow',
                credentials: 'same-origin',
            }),
        }),
        getCoinsPrice: build.query({
            query: (coins) => ({
                url: `assets?ids=${coins}`,
                method: 'GET',
                redirect: 'follow',
                credentials: 'same-origin',
            }),
        }),
        getCoinCandle: build.query({
            query: ({coin, interval}: IgetCoinCandle) => ({
                url: `assets/${coin}/history?interval=${interval}`,
                method: 'GET',
                redirect: 'follow',
                credentials: 'same-origin',
            }),
        }),

    })

});

export const { useLazyGetCoinsQuery, useLazyGetCoinCandleQuery, useLazyGetCoinsPriceQuery } = coinApi;
