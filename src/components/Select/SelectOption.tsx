import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React, {ChangeEvent} from "react";
import styles from "./selectOption.module.css";

export type SelectOptionType = {
  forLabel: string,
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
  getFieldProps:any,
  error: boolean
}
export const SelectOption = (props: SelectOptionType) => {
  return (
    <div>
      <div className={styles.level_label}>
        <label>{props.forLabel}</label>
      </div>
      <FormControl sx={{m: 1, minWidth: 120}} error={props.error}>
        <InputLabel id="demo-simple-select-helper-label">{props.inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          {...props.getFieldProps}

        >
          <MenuItem value={props.inputValue.first}>{props.level.first}</MenuItem>
          <MenuItem value={props.inputValue.second}>{props.level.second}</MenuItem>
          {props.inputValue.third ? <MenuItem value={props.inputValue.third}>{props.level.third}</MenuItem> : null}
        </Select>
      </FormControl>
    </div>
  )
}