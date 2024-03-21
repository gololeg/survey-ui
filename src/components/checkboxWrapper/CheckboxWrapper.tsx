import styles from "components/checkboxWrapper/checkboxWrapper.module.css";
import {Checkbox} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {CheckboxWrapperPropsType} from "types/componentsPropsType/CheckboxWrapperPropsType";


export const CheckboxWrapper = (props: CheckboxWrapperPropsType) => {
    const [state, setState] = useState<boolean | number>(false);

    const saveValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.value) {
            props.setTaskId?.(Number(event.target.value));
        }
        setState(event.target.value === 'false')
        props.isChecked?.(props.id as string, event.target.value === 'false')
    }

    return (
        <div className={styles.checkbox}>
            <div className={styles.firsCheckbox}>
                <Checkbox inputProps={{'aria-label': 'controlled'}}
                          {...props.getFieldProps}
                          onChange={saveValue}
                          value={props.value ? props.value : state}
                          id={props.id}
                />
            </div>
            <label className={styles.label}
                   htmlFor={props.id}>{props.label}</label>
        </div>
    )
}