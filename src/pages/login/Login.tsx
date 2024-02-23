import React from 'react';
import {useFormik} from "formik";
import styles from './login.module.css'
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {InputTypePasswordWrapper} from "components/inputTypePasswordWrapper/InputTypePasswordWrapper";
import {useAppDispatch} from "hooks/dispatch";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "hooks/selectors";


export const Login = () => {
    const {login} = useAppDispatch();
    const {error} = useAppSelector(state => state.error);
    const {isLoggedIn} = useAppSelector(state => state.users)

    const loginForm = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        onSubmit: (values) => {
           login(values);
        }
    })

    if (isLoggedIn){
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
                            {
                                error ? <p className={styles.error}>{error}</p> : null
                            }
                        </div>
                        <div className={styles.password}>
                            <InputTypePasswordWrapper
                                getFieldProps={loginForm.getFieldProps('password')}
                            />
                            {
                                error ? <p className={styles.error}>{error}</p> : null
                            }
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
        </form>
    );
};
