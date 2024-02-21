import React from 'react';
import {useFormik} from "formik";
import styles from './login.module.css'
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {InputTypePasswordWrapper} from "components/inputTypePasswordWrapper/InputTypePasswordWrapper";
import {useAppDispatch} from "hooks/dispatch";
import {useAppSelector} from "hooks/selectors";
import {useNavigate} from "react-router-dom";


export const Login = () => {
    const {login} = useAppDispatch();
    const loginSelector = useAppSelector(state => state.users.isLoggedIn);
    const navigate = useNavigate();

    const loginForm = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        onSubmit(values) {
            login(values);
            navigate('/admin/tasks/all')
            console.log(loginSelector)
        }
    })
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
        </form>
    );
};
