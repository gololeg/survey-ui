import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, {ChangeEvent} from "react";
import styles from "components/uploadFileButtonWrapper/uploadFileButtonWrapper.module.css"
import {UploadFileButtonPropsType} from "types/componentsPropsType/UploadFileButtonPropsType";

export const UploadFileButtonWrapper = (props: UploadFileButtonPropsType) => {
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
        {props.error ? <div style={{color: 'red'}}>{'Add image!'}</div> : null}
      </div>
    </div>
  )
}