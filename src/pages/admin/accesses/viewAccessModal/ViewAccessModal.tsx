import React, {useEffect} from 'react';
import styles from './viewAccessModal.module.css';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "hooks/useAppSelector";
import {useAppDispatch} from "hooks/useAppDispatch";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";

export const ViewAccessModal = () => {
    const {email} = useParams<{ email: string }>();
    const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
    const {isAuthMe} = useAppDispatch();
    const {getAccess} = useAppDispatch();
    const navigate = useNavigate();
    const access = useAppSelector(state => state.accesses.access)

    //delete symbol ':' in URL
    let string = email?.split('').slice(1, email?.length).join('')

    useEffect(() => {
        isAuthMe()
            .then((response: any) => {
                if (response.payload) {
                    getAccess(string)
                }
            })
    }, []);


    const toggleModal = () => {
     navigate('/admin/accesses/all')
    }

    if (isLoggedIn === false) {
        return <Navigate to={'/login'}/>
    }
    console.log(access)

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.title}>
                        <h1>Show access</h1>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.email}>
                            <label>Email: </label>
                            <div>
                             {access?.email}
                         </div>
                        </div>
                        <div className={styles.attemptsCount}>
                            <label>AttemptsCount: </label>
                            <div>
                             {
                                 access?.attemptsCount
                             }
                         </div>
                        </div>
                        <div className={styles.buttonBlock}>
                            <ButtonWrapper text={'close'} onclick={toggleModal} variant={"contained"}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
