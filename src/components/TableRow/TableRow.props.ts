import { ICoin } from "../../types/types"

export interface ITableRow {
    value: ICoin;
    id: number;
    tableData: ICoin[];
}