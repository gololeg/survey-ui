import React, {useEffect, useState} from 'react';
import styles from "./allTasksModal.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "hooks/dispatch";
import {useAppSelector} from "hooks/selectors";

export const AllTasksModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {id} = useParams<{ id: string }>()
  const {getTask} = useAppDispatch()
  const task = useAppSelector(state => state.tasks)
  const navigate = useNavigate();


  useEffect(() => {
    getTask(Number(id))
  }, []);


  const toggleModal = () => {
    // setIsOpen(!isOpen);
    navigate('/admin/tasks/all')
  };

  console.log(task)
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalOverlay} onClick={toggleModal}>
        <div className={styles.modalContent}>
          {task.map((taskItem) => (
            <div key={taskItem.id}>
              <h2>{taskItem.name}</h2>
              <p>Description: {taskItem.description}</p>
              <p>Type: {taskItem.type.name}</p>
              <p>Level: {taskItem.level.name}</p>
              <img src={taskItem.imageStr}/>
            </div>
          ))}

          <button onClick={toggleModal} className={styles.closeButton}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

