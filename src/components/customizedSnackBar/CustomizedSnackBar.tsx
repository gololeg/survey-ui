import React, {useEffect, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";
import styles from "./customizedSnackBar.module.css"

type CustomizedSnackBarType = {
    error: any
}
export const CustomizedSnackBar = (props: CustomizedSnackBarType) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.error){
            setOpen(state => !state)
        }
    }, [props.error]);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={styles.main}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {props.error}
                </Alert>
            </Snackbar>

        </div>
    );
};

