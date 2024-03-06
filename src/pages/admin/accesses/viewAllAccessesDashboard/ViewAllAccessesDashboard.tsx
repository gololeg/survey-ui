import React, {useEffect} from 'react';
import styles from './viewAllAccessesDashboard.module.css'
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";

export const ViewAllAccessesDashboard = () => {
    const {fetchAllAccesses} = useAppDispatch();
    const accesses = useAppSelector(state => state.accesses.allAccesses);

    useEffect(() => {
        fetchAllAccesses();
    }, []);

    console.log(accesses)
    return (
        <div>
            ViewAllAccessesDashboard
        </div>
    );
};

