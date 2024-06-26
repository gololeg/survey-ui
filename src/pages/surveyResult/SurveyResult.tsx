import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import styles from "./surveyResult.module.css"
import {InputWrapper} from "components/inputWrapper/InputWrapper";
import InsertEmoticonSharpIcon from '@mui/icons-material/InsertEmoticonSharp';
import MoodBadSharpIcon from '@mui/icons-material/MoodBadSharp';
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import PlayCircleFilledSharpIcon from '@mui/icons-material/PlayCircleFilledSharp';
import {Navigate, useNavigate} from "react-router-dom";

export const SurveyResult = () => {
    const surveyIdLocalStorage = localStorage.getItem('surveyId');
    const surveyId = JSON.parse(surveyIdLocalStorage as string);
    const {surveyResult} = useAppDispatch();
    const surveyResultData = useAppSelector(state => state.survey.result);
    const navigate = useNavigate();
    const tasksIds = localStorage.getItem('tasksIds');
    const arrayTasksIds = JSON.parse(tasksIds as string);

    useEffect(() => {
        if (arrayTasksIds.length){
            return ;
        }
        surveyResult(surveyId);
    }, []);

    const redirectToGenerateSurvey = () => {
        navigate('/generate/survey');
    }

    if (arrayTasksIds.length){
        return  <Navigate to={'/'}/>
    }
    return (
        <div className={styles.main}>
            <div className={styles.block}>
                <div className={styles.content}>
                    <div className={styles.resultPercent}>
                        <div className={styles.resultPercentContent}>
                                <h1>Your result is </h1>

                            <p
                                className={Math.round(surveyResultData?.commonPercent as number) < 50 ? styles.lowPercent : styles.highPercent}>{Math.round(surveyResultData?.commonPercent as number)}%</p>
                            {
                                surveyResultData?.commonPercent && surveyResultData?.commonPercent < 50 ?
                                    <MoodBadSharpIcon fontSize={'large'}/> : <InsertEmoticonSharpIcon/>
                            }

                        </div>
                    </div>

                    {
                        surveyResultData?.results.map(el => <div className={styles.contentBlock}>
                            <h2>{el.task.description}</h2>
                            <div>
                                {
                                    el.task.image && <img src={el.task.imageStr} alt={el.task.description}/>
                                }

                            </div>

                            <h3>{'Your answers:'}</h3>
                            {
                                el.clientAnswers.map(el => <div className={styles.inputWrapperBlock}>
                                    <InputWrapper value={el.text}/>
                                </div>)
                            }

                        </div>)
                    }
                    <div className={styles.buttonBlock}>
                        <ButtonWrapper text={'Try again'} variant={"contained"} size={'large'}
                                       onclick={redirectToGenerateSurvey}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
