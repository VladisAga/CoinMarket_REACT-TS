export interface IPagination {
    page: number;
    setPage: (number: number) => void;
    setLimit: (number: number) => void;
    limit: number;
}