import React, {useEffect, useState} from 'react';
import styles from './timer.module.css'
import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "store/store";
import {errorActions} from "reducers/errorReducer/error.reducer";


type TimerPropsType = {
    seconds: number
}
export const Timer = (props: TimerPropsType) => {
    const dispatch = useDispatch<AppDispatch>()
    const [time, setTime] = useState(() => {
        const savedTime = localStorage.getItem('timerTime');
        return savedTime ? parseInt(savedTime, 10) : props.seconds;
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                let state = prevTime - 1;
                localStorage.setItem('timerTime', JSON.stringify(prevTime))
                return state
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        return () => localStorage.removeItem('timerTime')
    }, []);

    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return time > 0 ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : `Time is over!`;
    };

    let barColor = '';

    if (time >= 60) {
        barColor = '#007bff'
    } else if (time < 60 && time > 30) {
        barColor = '#FFBA00'
    } else {
        barColor = 'red'
    }

    if (time === 0) {
        dispatch(errorActions.setTimerTimeError('Time is over!'))
        return <Navigate to={'/generate/survey'}/>;
    }

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timerBar}
                 style={{width: `${(time / props.seconds) * 100}%`, backgroundColor: barColor}}/>
            <div className={styles.timerText}>{formatTime(time)}</div>
        </div>
    );
};



