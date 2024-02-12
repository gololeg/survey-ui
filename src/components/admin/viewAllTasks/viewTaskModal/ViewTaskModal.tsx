import React, {useEffect} from 'react';
import styles from "components/admin/viewAllTasks/viewTaskModal/viewTaskModal.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "hooks/dispatch";
import {useAppSelector} from "hooks/selectors";
import {LabelButton} from "components/LabelButton/LabelButton";


export const ViewTaskModal = () => {
  const {id} = useParams<{ id: string }>()
  const {getTask} = useAppDispatch()
  const task = useAppSelector(state => state.tasks.currentTasks)
  const navigate = useNavigate();


  useEffect(() => {
    getTask(Number(id));
  }, []);


  const toggleModal = () => {
    navigate('/admin/tasks/all')
  };

  console.log(task)

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalOverlay} onClick={toggleModal}>
        <div className={styles.modalContent}>
          <div className={styles.block}>
            <h2>Show task</h2>
            <div className={styles.description}>
              <label>Description: </label>
              <div>{task?.description}</div>
            </div>
            <div className={styles.image}>
              <img src={task?.imageStr}/>
            </div>
            {task?.answers.map((answer) => (
              <div className={styles.answers} key={answer.id}>
                <label>Answer options:</label>
                <div>
                  {answer.text}
                </div>
                <label>IsRight:</label>
                <div>{answer.right.toString()}</div>
              </div>
            ))}


          </div>
          <div className={styles.closeButton}>
            <LabelButton variant={"contained"} onclick={toggleModal} text={'close'}/>
          </div>
        </div>
      </div>
    </div>
  );
};

