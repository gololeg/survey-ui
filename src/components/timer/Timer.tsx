import React, {useEffect, useState} from 'react';

type TimerPropsType = {
    seconds: number
}
export const Timer = (props: TimerPropsType) => {
    const [seconds, setSeconds] = useState<number>(props.seconds);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(state => state - 1);
        }, 1000)

        return () => clearInterval(seconds);
    }, []);

    return (
        <div>

        </div>
    );
};

