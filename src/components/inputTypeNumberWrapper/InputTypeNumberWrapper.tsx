import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./inputTypeNumberWrapper.module.css";
import {TextField} from "@mui/material";

type InputTypeNumberWrapperType = {
  label: string;
  value: string;
  getFieldProps:any
}
export const InputTypeNumberWrapper = (props: InputTypeNumberWrapperType) => {
  const [value, setValue] = useState<string>('')

  const handleTextFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <TextField
        id="outlined-number"
        label={props.label}
        type="number"
        value={ value ? value : props.value  }
        onChange={handleTextFieldValueChange}
        {...props.getFieldProps}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};
