import React, {useEffect, useState} from 'react';
import styles from './timer.module.css'

type TimerPropsType = {
    seconds: number
}
export const Timer = (props: TimerPropsType) => {
    const [time, setTime] = useState(props.seconds);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
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

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timerBar}
                 style={{width: `${(time / props.seconds) * 100}%`, backgroundColor: barColor}}/>
            <div className={styles.timerText}>{formatTime(time)}</div>
        </div>
    );
};



