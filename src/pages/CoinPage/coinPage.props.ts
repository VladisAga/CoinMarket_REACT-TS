interface CoinData {
    logo: string;
}

export interface CoinDataMap {
    [symbol: string]: CoinData[]; 
}

interface IInterval {
    interval: string;
    dataPoints: number;
}

export interface IintervalInf {
    '1d'?: IInterval;
    '12h'?: IInterval;
    '1h'?: IInterval;
}