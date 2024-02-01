import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, {ChangeEvent} from "react";
import styles from "./uploadButton.module.css"

export type UploadButtonType = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: boolean
  base64String: string | null
}
export const UploadButton = (props: UploadButtonType) => {
  return (
    <div className={styles.mainBlock}>
      <div>
        <Button size={'medium'} component="label" variant="outlined" startIcon={<CloudUploadIcon/>}>
          Upload file
          <input
            type="file"
            onChange={props.onChange}
            hidden
          />
        </Button>
      </div>
      <div className={styles.errorBlock}>
        {props.error ? <div style={{color: 'red'}}>{'добавьте изображение'}</div> : null}
      </div>
    </div>
        )}