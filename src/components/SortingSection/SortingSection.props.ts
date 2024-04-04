import { ICoin } from "../../types/types"

export interface ISortingSection {
    tableData: ICoin[] ;
    setTableData: (value: ICoin[]) => void
};