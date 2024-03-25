import React, {useEffect} from 'react';
import styles from "./viewTaskModal.module.css"
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {Checkbox, LinearProgress} from "@mui/material";
import {CustomizedSnackBar} from "components/customizedSnackBar/CustomizedSnackBar";
import {CheckboxWrapper} from "components/checkboxWrapper/CheckboxWrapper";
import {RadioWrapper} from "components/radioWrapper/RadioWrapper";
import {InputWrapper} from "components/inputWrapper/InputWrapper";


export const ViewTaskModal = () => {
    const {id} = useParams<{ id: string }>();
    const {getTask} = useAppDispatch();
    const task = useAppSelector(state => state.tasks.currentTasks);
    const {statusLoading} = useAppSelector(state => state.loading);
    const getTaskError = useAppSelector(state => state.error.getTaskError);
    const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
    const navigate = useNavigate();
    const {isAuthMe} = useAppDispatch();


    useEffect(() => {
        isAuthMe()
            .then((response: any) => {
                if (response.payload === true) {
                    getTask(Number(id))
                }
            })

    }, [id]);


    const toggleModal = () => {
        navigate('/admin/tasks/all')
    };

    if (isLoggedIn === false) {
        return <Navigate to={'/login'}/>
    }

    return (
        // <div className={styles.modalContainer}>
        //     {statusLoading === 'loading' && <LinearProgress/>}
        //     <div className={styles.modalOverlay}>
        //         <div className={styles.modalContent}>
        //             <div className={styles.block}>
        //                 <div className={styles.title}>
        //                     <h1>Show task</h1>
        //                 </div>
        //                 <div className={styles.image}>
        //                     <img src={task?.imageStr}/>
        //                 </div>
        //                 {
        //                     task?.answers.map(el => <div className={styles.answerContent} key={el.id}>
        //                         {
        //                             task?.type.name === 'CHECKBOX' ? <CheckboxWrapper/> :
        //                                 <RadioWrapper/>
        //                         }
        //                         <InputWrapper value={el.text}/>
        //                     </div>)
        //                 }
        //
        //             </div>
        //             <div className={styles.closeButton}>
        //                 <ButtonWrapper variant={"contained"} onclick={toggleModal} text={'close'}/>
        //             </div>
        //         </div>
        //     </div>
        //     {
        //         getTaskError && <CustomizedSnackBar error={getTaskError}/>
        //     }
        // </div>
        <div className={styles.main}>
            <div className={styles.block}>
                <div className={styles.content}>
                    <h1>Show task</h1>
                    <h2>{task?.description}</h2>
                    <div>{
                        task?.imageStr && <img src={task?.imageStr} alt={task?.description}/>
                    }</div>
                    {
                        task?.answers.map(el => <div className={styles.answerContent} key={el.id}>
                            {
                                task?.type.name === 'CHECKBOX' ? <CheckboxWrapper/> :
                                    <RadioWrapper/>
                            }
                            <InputWrapper value={el.text}/>
                        </div>)
                    }
                    <div className={styles.button}>
                        <ButtonWrapper text={'Back'} variant={'contained'} onclick={toggleModal}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

