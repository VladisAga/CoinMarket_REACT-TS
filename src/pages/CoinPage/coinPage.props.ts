interface CoinData {
    logo: string;
}

export interface CoinDataMap {
    [symbol: string]: CoinData[]; 
}