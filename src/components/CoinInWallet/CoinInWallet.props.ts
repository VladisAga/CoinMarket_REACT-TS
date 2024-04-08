import { ICoin } from "../../types/types";

export interface ICoinInWallet {
    coin: ICoin;
    id: number;
    triger: boolean;
    setTriger: (value: boolean) => void;
}