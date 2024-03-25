import React, {ChangeEvent, useState} from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

export type RadioWrapperPropsType = {
    value?: number;
    checked?: boolean;
    onChange?: (value: number) => void;

}
export const RadioWrapper = (props: RadioWrapperPropsType) => {
    const [value, setValue] = useState<string>('');

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        props.onChange?.(Number(event.target.value));
    }


    return (
        <div>
            <Radio
                checked={props.checked}
                onChange={onHandleChange}
                value={props.value ? props.value : value}
                name="radio-group"
                inputProps={{ 'aria-label': props.value?.toString() }}
            />
        </div>
    );
};

