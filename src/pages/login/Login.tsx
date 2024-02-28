import React from 'react';
import {useFormik} from "formik";
import styles from './login.module.css'
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {InputTypePasswordWrapper} from "components/inputTypePasswordWrapper/InputTypePasswordWrapper";
import {useAppDispatch} from "hooks/useAppDispatch";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "hooks/useAppSelector";
import {CustomizedSnackBar} from "components/customizedSnackBar/CustomizedSnackBar";


export const Login = () => {
    const {login} = useAppDispatch();
    const error = useAppSelector(state => state.error);
    const {isLoggedIn} = useAppSelector(state => state.users);
    const allErrors = Object.values(error).find(el => el !== null)

    const loginForm = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        onSubmit: (values) => {
            login(values);

        }
    })


    if (isLoggedIn) {
        return <Navigate to={'/admin/tasks/all'}/>
    }


    return (
        <form onSubmit={loginForm.handleSubmit}>
            <div className={styles.main}>
                <div className={styles.block}>
                    <div className={styles.content}>
                        <div className={styles.login}>
                            <InputWrapper
                                text={'Login'}
                                getFieldProps={loginForm.getFieldProps('login')}
                            />
                        </div>
                        <div className={styles.password}>
                            <InputTypePasswordWrapper
                                getFieldProps={loginForm.getFieldProps('password')}
                            />
                        </div>
                        <div className={styles.submit}>
                            <ButtonWrapper
                                text={'Submit'}
                                variant={'contained'}
                                type={'submit'}
                            />
                        </div>
                    </div>
                </div>

            </div>
            {
                allErrors && <div className={styles.snackBar}><CustomizedSnackBar error={allErrors}/></div>
            }
        </form>
    );
};
