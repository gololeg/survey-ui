import React from 'react';
import styles from './sideBar.module.css'
import {Link} from "react-router-dom";

export const SideBar = () => {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div className={styles.createTask}>
                    <div className={styles.createTaskContent}>
                        <Link to={'/admin/tasks/create'}>Create task</Link>
                    </div>
                </div>
                <div className={styles.allTasks}>
                    <div className={styles.allTasksContent}>
                        <Link to={'/admin/tasks/all'}>All tasks</Link>
                    </div>
                </div>
                <div className={styles.settings}>
                    <div className={styles.settingsContent}>
                        <Link to={'/admin/settings'}>Settings</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

