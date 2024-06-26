import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {useFormik} from "formik";
import styles from "./settings.module.css";
import {InputTypeNumberWrapper} from "components/inputTypeNumberWrapper/InputTypeNumberWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {settingsValidate} from "utils/validation/settingsValidate";
import {SideBar} from "components/sideBar/SideBar";
import {LinearProgress} from "@mui/material";
import {Navigate} from "react-router-dom";
import {CustomizedSnackBar} from "components/customizedSnackBar/CustomizedSnackBar";



export const Settings = () => {
    const {fetchSettings, createSettings} = useAppDispatch();
    const settingsSelector = useAppSelector(state => state.settings.setting);
    const {statusLoading} = useAppSelector(state => state.loading);
    const createSettingsError = useAppSelector(state => state.error.createSettingsError)
    const getSettingsError = useAppSelector(state => state.error.getSettingsError)
    const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
    const {isAuthMe} = useAppDispatch();


    useEffect(() => {
        isAuthMe()
            .then((response: any) => {
                if (response.payload) {
                    fetchSettings();
                }
            })

    }, []);


    const formik = useFormik({
        validate: settingsValidate,
        enableReinitialize: true,
        initialValues: {
            name: '',
            lowLevelTaskCount: settingsSelector ? Number(settingsSelector.lowLevelTaskCount) : 0,
            middleLevelTaskCount: settingsSelector ? Number(settingsSelector.middleLevelTaskCount) : 0,
            highLevelTaskCount: settingsSelector ? Number(settingsSelector.highLevelTaskCount) : 0,
            lowLevelTaskTime: settingsSelector ? Number(settingsSelector.lowLevelTaskTime) : 0,
            middleLevelTaskTime: settingsSelector ? Number(settingsSelector.middleLevelTaskTime) : 0,
            highLevelTaskTime: settingsSelector ? Number(settingsSelector.highLevelTaskTime) : 0
        },
        onSubmit: (values) => {
            createSettings(values)
        }
    });


    if (isLoggedIn === false) {
        return <Navigate to={'/login'}/>
    }


    return (
        <form onSubmit={formik.handleSubmit}>
            {statusLoading === 'loading' && <LinearProgress/>}
            <div className={styles.flex}>
                <SideBar/>
                <div className={styles.main}>
                    <div className={styles.block}>
                        <h1 className={styles.responseError}>{createSettingsError}</h1>
                        <div>
                            <div className={styles.content}>
                                <div className={styles.lowLevelTaskCount}>
                                    <InputTypeNumberWrapper
                                        label={'LowLevelTaskCount'}
                                        value={String(settingsSelector?.lowLevelTaskCount)}
                                        getFieldProps={formik.getFieldProps('lowLevelTaskCount')}
                                    />
                                </div>
                                <div className={styles.middleLevelTaskCount}>
                                    <InputTypeNumberWrapper
                                        label={'MiddleLevelTaskCount'}
                                        value={String(settingsSelector?.middleLevelTaskCount)}
                                        getFieldProps={formik.getFieldProps('middleLevelTaskCount')}
                                    />
                                </div>
                                <div className={styles.highLevelTaskCount}>
                                    <InputTypeNumberWrapper
                                        label={'HighLevelTaskCount'}
                                        value={String(settingsSelector?.highLevelTaskCount)}
                                        getFieldProps={formik.getFieldProps('highLevelTaskCount')}
                                    />
                                </div>
                                <div className={styles.lowLevelTaskTime}>
                                    <InputTypeNumberWrapper
                                        label={'LowLevelTaskTime'}
                                        value={String(settingsSelector?.lowLevelTaskTime)}
                                        getFieldProps={formik.getFieldProps('lowLevelTaskTime')}
                                    />
                                </div>
                                <div className={styles.middleLevelTaskTime}>
                                    <InputTypeNumberWrapper
                                        label={'MiddleLevelTaskTime'}
                                        value={String(settingsSelector?.middleLevelTaskTime)}
                                        getFieldProps={formik.getFieldProps('middleLevelTaskTime')}
                                    />
                                </div>
                                <div className={styles.highLevelTaskTime}>
                                    <InputTypeNumberWrapper
                                        label={'HighLevelTaskTime'}
                                        value={String(settingsSelector?.highLevelTaskTime)}
                                        getFieldProps={formik.getFieldProps('highLevelTaskTime')}
                                    />
                                </div>
                            </div>
                            <div className={styles.send}>
                                <ButtonWrapper
                                    text={'Send'}
                                    variant={'contained'}
                                    type={'submit'}
                                    size={'large'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                createSettingsError || getSettingsError ?
                    <CustomizedSnackBar error={createSettingsError && getSettingsError}/> : null
            }
        </form>
    );
};

