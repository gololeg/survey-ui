import React, {useEffect} from 'react';
import styles from './survey.module.css';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";

export const Survey = () => {
    const tasksIds = localStorage.getItem('tasksIds');
    const {setSurveyTask} = useAppDispatch();
    const surveyTask = useAppSelector(state => state.survey.surveyTask);

    useEffect(() => {
        const arrayFromLocalStorage = JSON.parse(tasksIds as string);
        setSurveyTask(arrayFromLocalStorage[0]);
    }, []);

    console.log(surveyTask);
    return (
        <div>
            <div>
                <div>

                </div>
            </div>
        </div>
    );
};

