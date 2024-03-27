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
import {Navigate, useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";

export const Survey = () => {
    const tasksIds = localStorage.getItem('tasksIds');
    const arrayTasksIds = JSON.parse(tasksIds as string);

    const secondsCount = localStorage.getItem('secondsCount');
    const surveyIdLocalStorage = localStorage.getItem('surveyId');
    const statusLoading = useAppSelector(state => state.loading.statusLoading)
    const {getSurveyTask, createSurvey} = useAppDispatch();
    const surveyTask = useAppSelector(state => state.survey.surveyTask);
    const surveyString = useAppSelector(state => state.survey.surveyString);
    const [taskId, setTaskId] = useState<number[]>([]);



    useEffect(() => {
        getSurveyTask(arrayTasksIds[0]);
    }, [surveyString, tasksIds]);

    const setTaskIdsCheckbox = (taskId: number) => {
        setTaskId((state) => [...state, taskId])
    }
    const setTaskIDsRadio = (taskId: number) => {
        setTaskId(() => [taskId])
    }


    const surveyFormik = useFormik({
        enableReinitialize: true,

        initialValues: {
            id: surveyTask?.id,
            ars: taskId

        },

        onSubmit: values => {
            const surveyId = JSON.parse(surveyIdLocalStorage as string)
            createSurvey({surveyId, values})
            setTaskId([]);

        }
    })

    if (!arrayTasksIds.length) {
        return <Navigate to={'/survey/result'}/>
    }


    return (
        <form onSubmit={surveyFormik.handleSubmit}>
            {statusLoading === 'loading' && <LinearProgress/>}
            <div className={styles.main}>
                <div className={styles.block}>
                    <div className={styles.content}>
                        <div className={styles.description}>
                            <h1>{surveyTask?.description}</h1>
                        </div>
                        {
                            surveyTask?.imageStr &&
                            <img className={styles.image} src={surveyTask?.imageStr} alt="survey"/>
                        }


                        {
                            surveyTask?.answers.map(survey =>
                                <div key={survey.id}
                                     className={styles.answer}
                                >
                                    {
                                        surveyTask.type.name === 'CHECKBOX' ? <CheckboxWrapper value={survey.id}
                                                                                               setTaskId={setTaskIdsCheckbox}
                                        /> : <RadioWrapper
                                            value={survey.id}
                                            checked={survey.id === taskId.find(el => el === survey.id)}
                                            onChange={setTaskIDsRadio}
                                        />
                                    }
                                    <InputWrapper value={survey.text}/>
                                </div>
                            )
                        }
                        <div className={styles.buttonBlock}>
                            <ButtonWrapper text={'Next'}
                                           variant={"contained"}
                                           type={'submit'}
                                           size={'large'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

