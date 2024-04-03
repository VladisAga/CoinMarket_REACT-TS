import { IInput } from './input.props';
import styles from './Input.module.scss';
import cn from 'classnames';
import { forwardRef, LegacyRef } from 'react';

const Input: React.FC<IInput> = forwardRef(function Input({ className, ...props }, ref: LegacyRef<HTMLInputElement>) {
    return (
        <input ref={ref} className={cn(styles.input, className)} {...props} />
    )
});

export default Input;