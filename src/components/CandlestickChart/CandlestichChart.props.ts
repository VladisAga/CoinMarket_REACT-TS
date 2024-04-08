import { ICryptoData } from "../../types/types"

export interface ICandlestickChart {
    graphicData: ICryptoData[];
    timePeriod: string;
}