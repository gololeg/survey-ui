import React, {useEffect} from 'react';
import styles from './createAccesses.module.css';
import {useFormik} from "formik";
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {useAppDispatch} from "hooks/useAppDispatch";
import {AccessesType} from "types/accessesType/AccessesType";
import {useAppSelector} from "hooks/useAppSelector";
import {Navigate, useNavigate} from "react-router-dom";

export const CreateAccesses = () => {
    const {createAccesses} = useAppDispatch();
    const {isAuthMe} = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(state => state.users.isLoggedIn)
    useEffect(() => {
        isAuthMe()
            .then((response: any) => {
            })

    }, []);

    const createAccessesFormik = useFormik({

        initialValues: {
            email: '',
        },
        onSubmit: values => {
            const payload: AccessesType = {
                email: values.email,
                attemptsCount: 10
            }
            createAccesses(payload)
            createAccessesFormik.resetForm()
            navigate('/admin/accesses/all')
        }
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    // if (createAccess !== null) {
    //     return <Navigate to={'/admin/accesses/all'}/>
    // }
    return (
        <form onSubmit={createAccessesFormik.handleSubmit}>
            <div className={styles.main}>
                <div className={styles.block}>
                    <div className={styles.content}>
                        <h1>Write your email</h1>
                        <div className={styles.contentItem1}>
                            <InputWrapper getFieldProps={createAccessesFormik.getFieldProps('email')} text={'Email'}/>
                        </div>
                        <div className={styles.contentItem2}>
                            <ButtonWrapper text={'Send'}
                                           endIcon={<SendRoundedIcon/>}
                                           variant={"contained"}
                                           type={'submit'}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </form>
    );
};

