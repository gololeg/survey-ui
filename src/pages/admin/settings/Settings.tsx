import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/dispatch";
import {useAppSelector} from "hooks/selectors";
import {useFormik} from "formik";
import styles from "./settings.module.css";
import {InputTypeNumberWrapper} from "components/inputTypeNumberWrapper/InputTypeNumberWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {settingsValidate} from "utils/validation/settingsValidate";
import {SideBar} from "components/sideBar/SideBar";

export const Settings = () => {
  const {fetchSettings, createSettings} = useAppDispatch();
  const settingsSelector = useAppSelector(state => state.settings.setting);

  useEffect(() => {
    fetchSettings();
  }, []);


  const formik = useFormik({
    validate: settingsValidate,

    initialValues: {
      name: '',
      lowLevelTaskCount: 0,
      middleLevelTaskCount: 0,
      highLevelTaskCount: 0,
      lowLevelTaskTime: 0,
      middleLevelTaskTime: 0,
      highLevelTaskTime: 0
    },

    onSubmit: (values) => {
      const payload = {
        name: '',
        lowLevelTaskCount: values.lowLevelTaskCount,
        middleLevelTaskCount: values.middleLevelTaskCount,
        highLevelTaskCount: values.highLevelTaskCount,
        lowLevelTaskTime: values.lowLevelTaskTime,
        middleLevelTaskTime: values.middleLevelTaskTime,
        highLevelTaskTime: values.highLevelTaskTime
      }
      createSettings(payload)

    }
  })
  // console.log(settingsSelector)
  return (
    <form onSubmit={formik.handleSubmit}>
    <div className={styles.flex}>
      <SideBar/>
      <div className={styles.main}>
        <div className={styles.block}>
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
    </form>
  );
};

