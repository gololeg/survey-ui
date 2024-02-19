import Button from "@mui/material/Button";
import React from "react";
import {ButtonsVariantType} from "types/buttonsVariant";
import styles from "./buttonWrapper.module.css"

export type LabelButtonType = {
    variant?: ButtonsVariantType;
    onclick?: () => void;
    text: string;
    type?: string;
    disable?: boolean;
    size?: 'small' | 'medium' | 'large';
}

export const ButtonWrapper = (props: LabelButtonType) => {
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