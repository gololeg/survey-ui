import Button from "@mui/material/Button";
import React from "react";
import styles from "./buttonWrapper.module.css"
import {ButtonWrapperPropsType} from "types/componentsPropsType/ButtonWrapperPropsType";



export const ButtonWrapper = (props: ButtonWrapperPropsType) => {
    return (
        <div className={styles.content}>
            <Button
                size={props.size}
                disabled={props.disable}
                type={props.type ? "submit" : undefined}
                variant={props.variant}
                onClick={props.onclick}
            >{props.text}</Button>
        </div>
    )
}