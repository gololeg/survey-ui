import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import styles from "components/selectWrapper/selectWrapper.module.css";

export type SelectOptionType = {
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
export const SelectWrapper = (props: SelectOptionType) => {
  return (
    <div>
      <FormControl sx={{m: 1, minWidth: 120}} error={props.isError}>
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