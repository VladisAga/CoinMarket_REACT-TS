export interface SortSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value?: string; label: string; disabled?: boolean;}[];
    className?: string;
}