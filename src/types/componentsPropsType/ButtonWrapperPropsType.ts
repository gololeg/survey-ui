

export type ButtonWrapperPropsType = {
    variant?: "text" | "outlined" | "contained";
    onclick?: () => void;
    text: string;
    type?: string;
    disable?: boolean;
    size?: 'small' | 'medium' | 'large';
    endIcon?: JSX.Element;
    startIcon?:JSX.Element;
}