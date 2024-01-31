import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, {ChangeEvent} from "react";

export type UploadButtonType = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error:boolean
}
export const UploadButton = (props: UploadButtonType) => {
  return (
    <div>
      <Button size={'medium'} component="label" variant="outlined" startIcon={<CloudUploadIcon/>}>
        Upload file
        <input
          type="file"
          onChange={props.onChange}
          hidden
        />
      </Button>
      {props.error ? <div style={{color: 'red'}}>{'добавьте изображение'}</div> : null}
    </div>
        )}