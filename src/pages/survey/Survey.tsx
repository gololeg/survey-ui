import React, {useEffect, useState} from 'react';
import styles from './survey.module.css';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {CheckboxWrapper} from "components/checkboxWrapper/CheckboxWrapper";
import {RadioWrapper} from "components/radioWrapper/RadioWrapper";
import {useFormik} from "formik";
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
export const Survey = () => {
    const tasksIds = localStorage.getItem('tasksIds');
    const secondsCount = localStorage.getItem('secondsCount');
    const surveyId = localStorage.getItem('surveyId');
    const {getSurveyTask} = useAppDispatch();
    const surveyTask = useAppSelector(state => state.survey.surveyTask);
    //description, image if not null, list answers, button, timer


    useEffect(() => {
        const taskId = JSON.parse(tasksIds as string);
        // console.log(tasksIds, secondsCount, surveyId);
        getSurveyTask(taskId[0]);
    }, []);


    console.log(surveyTask);


    const surveyFormik = useFormik({
        initialValues: {},

        onSubmit: values => {
            alert(values)
        }
    })

    return (
        <form onSubmit={surveyFormik.handleSubmit}>
            <div className={styles.main}>
                <div className={styles.block}>
                    <div className={styles.content}>
                        <div className={styles.description}>
                            <h1 >{surveyTask?.description}</h1>
                        </div>

                        <img className={styles.image} src={surveyTask?.imageStr} alt="survey"/>
                        {
                            surveyTask?.answers.map(survey =>
                                <div key={survey.id}
                                     className={styles.answer}
                                >
                                    <RadioWrapper/>
                                    <InputWrapper value={survey.text}/>
                                </div>
                            )
                        }
                        <div className={styles.buttonBlock}>
                            <ButtonWrapper text={'Next'}
                                           variant={"contained"}
                                           type={'submit'}
                                           endIcon={<SendRoundedIcon/>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

