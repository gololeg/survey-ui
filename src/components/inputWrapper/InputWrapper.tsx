import {TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {InputWrapperPropsType} from "types/componentsPropsType/InputWrapperPropsType";


export const InputWrapper = (props: InputWrapperPropsType) => {
    const [state, setState] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.getValue?.(props.id as string, e.target.value)
        setState(e.target.value)

    }

    return (
        <div>
            <TextField
                id="outlined-multiline-flexible"
                disabled={props.disabled}
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