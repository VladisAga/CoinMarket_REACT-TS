import { ICoin } from "../../../types/types";

export interface IModalBuyCoins {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    coinInf: ICoin;
    img: string;
}