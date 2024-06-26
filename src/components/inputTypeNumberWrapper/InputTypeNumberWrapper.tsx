import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";
import {InputTypeNumberWrapperPropsType} from "types/componentsPropsType/InputTypeNumberWrapperPropsType";

export const InputTypeNumberWrapper = (props: InputTypeNumberWrapperPropsType) => {
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
        value={ value  }
        onChange={handleTextFieldValueChange}
        {...props.getFieldProps}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};
