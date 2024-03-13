import React from 'react';
import styles from './generateSurvey.module.css'
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {useFormik} from "formik";
import {useAppDispatch} from "hooks/useAppDispatch";

export const GenerateSurvey = () => {
    const {getStartSurvey} = useAppDispatch()
    const generateSurveyFormik = useFormik({
        initialValues: {
            email: ''
        },

        onSubmit: values => {
            getStartSurvey(values.email)
            alert(values.email)
        }
    })
    return (
        <form onSubmit={generateSurveyFormik.handleSubmit}>
            <div className={styles.block}>
                <div className={styles.contentBlock}>
                    <div className={styles.content}>
                        <h1>Write email</h1>
                        <InputWrapper text={'Email'} getFieldProps={generateSurveyFormik.getFieldProps('email')}/>
                        <ButtonWrapper variant={"contained"} text={'Send'} type={'submit'}/>
                    </div>
                </div>
            </div>
        </form>
    );
};

