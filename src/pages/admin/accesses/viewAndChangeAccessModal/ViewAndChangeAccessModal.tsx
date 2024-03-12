import React, {useEffect} from 'react';
import styles from 'pages/admin/accesses/viewAndChangeAccessModal/viewAndChangeAccessModal.module.css';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "hooks/useAppSelector";
import {useAppDispatch} from "hooks/useAppDispatch";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {InputTypeNumberWrapper} from "components/inputTypeNumberWrapper/InputTypeNumberWrapper";
import {useFormik} from "formik";
import {LinearProgress} from "@mui/material";
import {ResponseStatusEnum} from "enums/responseStatusEnum";

export const ViewAndChangeAccessModal = () => {
    const {email} = useParams<{ email: string }>();
    const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
    const {isAuthMe} = useAppDispatch();
    const {getAccess} = useAppDispatch();
    const {createAccesses} = useAppDispatch();
    const navigate = useNavigate();
    const access = useAppSelector(state => state.accesses.access);
    const {statusLoading} = useAppSelector(state => state.loading);

    useEffect(() => {
        //delete symbol ':' in URL
        let string = email?.split('').slice(1, email?.length).join('')
        isAuthMe()
            .then((response: any) => {
                if (response.payload) {
                    getAccess(string)
                }
            })
    }, []);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: access?.email,
            attemptsCount: access?.attemptsCount
        },

        onSubmit: (values) => {
            createAccesses(values)
            navigate('/admin/accesses/all')
        }
    })


    if (isLoggedIn === false) {
        return <Navigate to={'/login'}/>
    }


    return (
        <form onSubmit={formik.handleSubmit}>
            {statusLoading === 'loading' && <LinearProgress/>}
            <div className={styles.modalContainer}>
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.title}>
                            <h1>Show and change access</h1>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.email}>
                                <InputWrapper
                                    disabled={true}
                                    getFieldProps={formik.getFieldProps('email')}
                                />
                            </div>
                            <div className={styles.attemptsCount}>
                                <InputTypeNumberWrapper
                                    label={'AttemptsCount'}
                                    value={String(access?.attemptsCount)}
                                    getFieldProps={formik.getFieldProps('attemptsCount')}/>
                            </div>
                            <div className={styles.buttonBlock}>
                                <ButtonWrapper
                                    text={'Save'}
                                    variant={"contained"}
                                    type={'submit'}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    );
};
