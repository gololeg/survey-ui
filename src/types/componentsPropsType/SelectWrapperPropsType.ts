export type SelectWrapperPropsType = {
    inputLabel: string,
    inputValue: {
        first: number,
        second: number,
        third?: number
    },

    level: {
        first: string,
        second: string,
        third?: string
    },

    getFieldProps: any,
    isError: boolean
}