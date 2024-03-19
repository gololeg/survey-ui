export type CheckboxWrapperPropsType = {
    label?: string;
    getFieldProps?: any;
    id?:string;
    isChecked?: (id:string, value:boolean) => void
}