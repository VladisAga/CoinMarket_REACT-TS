import { IButton } from "./button.props";
import styles from './Button.module.scss';
import cn from "classnames";

const Button: React.FC<IButton> = ({ children, className, appearence = 'small', ...props }) => {
    return (
        <button className={cn(className, styles['btn'], )} {...props}>{children}</button>
    )
}

export default Button;