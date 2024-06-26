import { SortSelectProps } from "./select.props";

const Select: React.FC<SortSelectProps> = ({ value, onChange, options, className }) => {
    return (
        <select id="sort-select" value={value} className={className} onChange={(e) => onChange(e.target.value)}>
            {options.map((option, index) => (
                <option id={option.id} key={index} value={option.value} disabled={option.disabled}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;