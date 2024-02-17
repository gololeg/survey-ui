import styles from "components/checkboxWrapper/checkboxWrapper.module.css";
import {Checkbox} from "@mui/material";
import React, {ChangeEvent, useState} from "react";


export type LabelCheckboxType = {
  label: string;
  getFieldProps?: any;
  id?:string;
  isChecked?: (id:string, value:boolean) => void
}
export const CheckboxWrapper = (props: LabelCheckboxType) => {
  const [state, setState] = useState<boolean>(false)
  const saveValue = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value === 'false')
    props.isChecked?.(props.id as string,event.target.value === 'false' )
  }
  return (
    <div className={styles.checkbox}>
      <div className={styles.firsCheckbox}>
        <Checkbox inputProps={{'aria-label': 'controlled'}} {...props.getFieldProps} onChange={saveValue} value={state} id={props.id}/>
      </div>
      <label className={styles.label} htmlFor={props.id}>{props.label}</label>
    </div>
  )
}