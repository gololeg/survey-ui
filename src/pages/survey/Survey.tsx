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
    const {getSurveyTask, createSurvey} = useAppDispatch();
    const surveyTask = useAppSelector(state => state.survey.surveyTask);
    //description, image if not null, list answers, button, timer
    const [taskId, setTaskId] = useState<number[]>([]);

    useEffect(() => {
        const taskId = JSON.parse(tasksIds as string);
        getSurveyTask(taskId[0]);

    }, []);


    // console.log(surveyTask?.answers);
    // console.log(taskId);
    const setTaskIds = (taskId: number) => {
        setTaskId((state) => [...state, taskId])
    }

    const surveyFormik = useFormik({
        enableReinitialize: true,

        initialValues: {

            id: surveyTask?.id,
            nextTaskId: 0,
            name: '',
            image: [
                ''
            ],
            file: '',
            level: {
                id: 0,
                name: ''
            },
            type: {
                id: 0,
                name: ''
            },
            answers: [
                {
                    id: 0,
                    name: '',
                    text: '',
                    value: '',
                    rowTextNum: 0,
                    right: true
                }
            ],
            ars: taskId,
            strAnswers: '',
            description: '',
            imageStr: ''

        },

        onSubmit: values => {
            const payload = {

                id: values.id,
                nextTaskId: 0,
                name: '',
                image: [
                    ''
                ],
                file: '',
                level: {
                    id: 0,
                    name: ''
                },
                type: {
                    id: 0,
                    name: ''
                },
                answers: [
                    {
                        id: 0,
                        name: '',
                        text: '',
                        value: '',
                        rowTextNum: 0,
                        right: true
                    }
                ],
                ars: values.ars,
                strAnswers: '',
                description: '',
                imageStr: ''
            }
            console.log(payload)
            createSurvey(JSON.parse(surveyId as string), payload)
        }
    })

    return (
        <form onSubmit={surveyFormik.handleSubmit}>
            <div className={styles.main}>
                <div className={styles.block}>
                    <div className={styles.content}>
                        <div className={styles.description}>
                            <h1>{surveyTask?.description}</h1>
                        </div>

                        <img className={styles.image} src={surveyTask?.imageStr} alt="survey"/>
                        {
                            surveyTask?.answers.map(survey =>
                                <div key={survey.id}
                                     className={styles.answer}
                                >
                                    <CheckboxWrapper value={survey.id}
                                                     setTaskId={setTaskIds}
                                    />
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

