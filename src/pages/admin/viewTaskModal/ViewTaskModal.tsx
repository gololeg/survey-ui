import React, {useEffect} from 'react';
import styles from  "./viewTaskModal.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "hooks/dispatch";
import {useAppSelector} from "hooks/selectors";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import { LinearProgress} from "@mui/material";



export const ViewTaskModal = () => {
  const {id} = useParams<{ id: string }>();
  const {getTask} = useAppDispatch();
  const task = useAppSelector(state => state.tasks.currentTasks);
  const {statusLoading} = useAppSelector(state => state.loading);
  const error = useAppSelector(state => state.error.getTaskError);
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);


  useEffect(() => {
    if (!isLoggedIn){
      navigate('/login');
    }
    getTask(Number(id));
  }, [id]);


  const toggleModal = () => {
    navigate('/admin/tasks/all')
  };

  return (
    <div className={styles.modalContainer}>
      {statusLoading === 'loading' && <LinearProgress/>}
      <div className={styles.modalOverlay} onClick={toggleModal}>
        <div className={styles.modalContent}>
          {
            error ? <h1 className={styles.responseError}>{error}</h1> : <div>
              <div className={styles.block}>
                <h2>Show task</h2>
                <div className={styles.description}>
                  <label>Description: </label>
                  <div>{task?.description}</div>
                </div>
                <div className={styles.image}>
                  <img src={task?.imageStr} alt={`${task?.description}`}/>
                </div>
                {task?.answers.map((answer) => (
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
          }

        </div>
      </div>
    </div>
  );
};

