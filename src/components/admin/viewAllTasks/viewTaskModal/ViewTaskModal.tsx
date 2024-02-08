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
            <h2 className={styles.name}>{task?.name}</h2>
            <p className={styles.description}>Description: {task?.description}</p>
            <p className={styles.typeName}>Type: {task?.type.name}</p>
            <p className={styles.levelName}>Level: {task?.level.name}</p>
            <img className={styles.image} src={task?.imageStr}/>
          </div>
          {/*<button onClick={toggleModal} className={styles.closeButton}>Закрыть</button>*/}
          <div className={styles.closeButton}>
            <LabelButton variant={"contained"} onclick={toggleModal} text={'close'}/>
          </div>
        </div>
      </div>
    </div>
  );
};

