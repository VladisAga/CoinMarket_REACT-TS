import { IInput } from './input.props';
import styles from './Input.module.scss';
import cn from 'classnames';
import { forwardRef } from 'react';

const Input: React.ForwardRefRenderFunction<HTMLInputElement, IInput> = ({ className, ...props }, ref) => {
    return (
        <input ref={ref} className={cn(styles.input, className)} {...props} />
    );
};

export default forwardRef(Input);