import React, {useEffect} from 'react';
import styles from "./viewTaskModal.module.css"
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {LinearProgress} from "@mui/material";
import {CustomizedSnackBar} from "components/customizedSnackBar/CustomizedSnackBar";
import {useAuthValidation} from "hooks/useAuthValidation";


export const ViewTaskModal = () => {
    const {id} = useParams<{ id: string }>();
    const {getTask} = useAppDispatch();
    const task = useAppSelector(state => state.tasks.currentTasks);
    const {statusLoading} = useAppSelector(state => state.loading);
    const getTaskError = useAppSelector(state => state.error.getTaskError);
    const navigate = useNavigate();
    const isLoggedIn = useAuthValidation()



    useEffect(() => {
        if (isLoggedIn){
            getTask(Number(id));
        }else{
            return;
        }

    }, [id, isLoggedIn]);


    const toggleModal = () => {
        navigate('/admin/tasks/all')
    };
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.modalContainer}>
            {statusLoading === 'loading' && <LinearProgress/>}
            <div className={styles.modalOverlay} onClick={toggleModal}>
                <div className={styles.modalContent}>
                            <div className={styles.block}>
                                <h2>Show task</h2>
                                <div className={styles.description}>
                                    <label>Description: </label>
                                    <div>{task?.description}</div>
                                </div>
                                <div className={styles.image}>
                                    <img src={task?.imageStr} alt={`${task?.description}`}/>
                                </div>
                                {task?.answers.map((answer:any) => (
                                    <div className={styles.answers} key={answer.id}>
                                        <label>Answer options:</label>
                                        <div>
                                            {answer.text}
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className={styles.closeButton}>
                                <ButtonWrapper variant={"contained"} onclick={toggleModal} text={'close'}/>
                            </div>
                </div>
            </div>
            {
                getTaskError && <CustomizedSnackBar error={getTaskError}/>
            }
        </div>
    );
};

