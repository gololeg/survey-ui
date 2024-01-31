import Button from "@mui/material/Button";
import React from "react";
import {ButtonsVariantType} from "types/buttonsVariant";

export type LabelButtonType = {
  variant?: ButtonsVariantType;
  onclick?: () => void;
  text: string;
  type?: string
  disable?: boolean
}

export const LabelButton = (props: LabelButtonType) => {
  return (
    <div>
      <Button
        size={"medium"}
        disabled={props.disable}
        type={props.type ? "submit" : undefined}
        variant={props.variant}
        onClick={props.onclick}
      >{props.text}</Button>
    </div>
  )
}