import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import styles from "./surveyResult.module.css"

export const SurveyResult = () => {
    const surveyIdLocalStorage = localStorage.getItem('surveyId');
    const surveyId = JSON.parse(surveyIdLocalStorage as string);
    const {surveyResult} = useAppDispatch();
    const surveyResultData = useAppSelector(state => state.survey.result)

    useEffect(() => {
        surveyResult(surveyId)
    }, []);
    console.log(surveyResultData)

    return (
        <div className={styles.main}>
            <div className={styles.block}>
                <div className={styles.content}>
                    <h1>Your result is {surveyResultData?.commonPercent}</h1>
                </div>
            </div>
        </div>
    );
};
