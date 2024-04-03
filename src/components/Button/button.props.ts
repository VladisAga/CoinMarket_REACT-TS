import { ButtonHTMLAttributes, ReactNode } from "react"

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    appearence?: 'small' | 'big';
}