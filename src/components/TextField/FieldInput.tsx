
import {TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import styles from "./fieldInput.module.css"

export type FieldInput = {
  label: string;
  id?: string
  text: string;
  getFieldProps?: any;
  getValue?: (id: string, value: string) => void;
  error?: boolean
}
export const FieldInput = (props: FieldInput) => {
  const [state, setState] = useState<string>('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.getValue?.(props.id as string, e.target.value)
    setState(e.target.value)

  }

  return (
    <div>
      <div className={styles.label_text}>
        <label>{props.label}</label>
      </div>
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