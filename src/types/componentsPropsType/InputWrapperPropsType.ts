export type InputWrapperPropsType = {
    id?: string
    text: string;
    getFieldProps?: any;
    getValue?: (id: string, value: string) => void;
    error?: boolean;
}