export interface ICoin {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    imgId?: string
}

export interface ICryptoData {
    circulatingSupply: string;
    date: string;
    priceUsd: string;
    time: number;
}