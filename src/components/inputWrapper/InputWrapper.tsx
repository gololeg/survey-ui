import {TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";


export type InputTypes = {
    id?: string
    text: string;
    getFieldProps?: any;
    getValue?: (id: string, value: string) => void;
    error?: boolean;
}
export const InputWrapper = (props: InputTypes) => {
    const [state, setState] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.getValue?.(props.id as string, e.target.value)
        setState(e.target.value)

    }

    return (
        <div>
            <TextField
                id="outlined-multiline-flexible"
                label={props.text}
                error={props.error}
                multiline
                maxRows={4}
                onChange={handleChange}
                value={state}
                {...props.getFieldProps}
            />
        </div>
    )
}