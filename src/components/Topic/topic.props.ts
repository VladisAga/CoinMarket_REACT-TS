import { HTMLAttributes, ReactNode } from "react";

export interface ITopic extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}