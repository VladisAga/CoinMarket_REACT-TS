import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IgetCoinCandle {
    interval: string;
    coin: string;
}

const getRequestOptions = () => ({
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
    credentials: 'same-origin' as RequestCredentials,
});

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.coincap.io/v2/',
        credentials: 'same-origin' as RequestCredentials,
    }),
    endpoints: (build) => ({
        getCoins: build.query({
            query: (number) => ({
                url: `assets?limit=${number}`,
                ...getRequestOptions(),
            }),
        }),
        getCoinsPrice: build.query({
            query: (coins) => ({
                url: `assets?ids=${coins}`,
                ...getRequestOptions(),
            }),
        }),
        getCoinCandle: build.query({
            query: ({ coin, interval }: IgetCoinCandle) => ({
                url: `assets/${coin}/history?interval=${interval}`,
                ...getRequestOptions(),
            }),
        }),
    })
});

export const { useLazyGetCoinsQuery, useLazyGetCoinCandleQuery, useLazyGetCoinsPriceQuery } = coinApi;