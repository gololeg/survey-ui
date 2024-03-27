import React from 'react';
import styles from './generateSurvey.module.css'
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {useFormik} from "formik";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {Navigate, useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {CustomizedSnackBar} from "components/customizedSnackBar/CustomizedSnackBar";
import {generateSurveyValidate} from "utils/validation/generateSurveyValidate";

export const GenerateSurvey = () => {
    const {getStartSurvey} = useAppDispatch();
    const startSurvey = useAppSelector(state => state.survey.startSurvey);
    const statusLoading = useAppSelector(state => state.loading.statusLoading);
    const surveyError = useAppSelector(state => state.error.surveyError);
    const navigate = useNavigate();
    const tasksIds = localStorage.getItem('tasksIds');
    const arrayTasksIds = JSON.parse(tasksIds as string);

    const generateSurveyFormik = useFormik({
        validate: generateSurveyValidate,
        initialValues: {
            email: ''
        },

        onSubmit: values => {
            getStartSurvey(values.email)
            navigate('/')
            generateSurveyFormik.resetForm()

        }
    })


    // if (arrayTasksIds.length) {
    //     return <Navigate to={'/'}/>
    // }

    return (
        <form onSubmit={generateSurveyFormik.handleSubmit}>
            {statusLoading === 'loading' && <LinearProgress/>}
            <div className={styles.block}>
                <div className={styles.contentBlock}>
                    <div className={styles.content}>
                        <div className={styles.item1}>
                            <h1>Write email</h1>
                        </div>

                        <InputWrapper
                            text={'Email'}
                            getFieldProps={generateSurveyFormik.getFieldProps('email')}/>
                        {generateSurveyFormik.touched && generateSurveyFormik.errors.email ?
                            <p style={{color: 'red'}}>{generateSurveyFormik.errors.email}</p> : null}
                        <ButtonWrapper
                            variant={"contained"}
                            text={'Send'}
                            type={'submit'}
                            disable={!generateSurveyFormik.isValid}
                        />
                    </div>
                </div>
            </div>
            {
                surveyError && <CustomizedSnackBar error={surveyError}/>
            }
        </form>
    );
};

