import React, {ChangeEvent, useEffect} from "react";
import {useFormik} from "formik";
import styles from "./createTask.module.css"
import {LinearProgress} from '@mui/material';
import {Itask} from "types/Itask";
import {SelectWrapper} from "components/selectWrapper/SelectWrapper";
import {CheckboxWrapper} from "components/checkboxWrapper/CheckboxWrapper";
import {ButtonWrapper} from "components/buttonWrapper/ButtonWrapper";
import {v1} from "uuid";
import {useAppSelector} from "hooks/selectors";
import {useAppDispatch} from "hooks/dispatch";
import {Navigate, useNavigate} from "react-router-dom"
import {useUploadImageToFormatBase64} from "hooks/useUploadImageToFormatBase64";
import {useDeploadedBase64FormatToString} from "hooks/useDeploadedBase64FormatToString";

import {InputWrapper} from "components/inputWrapper/InputWrapper";
import {UploadFileButtonWrapper} from "components/uploadFileButtonWrapper/UploadFileButtonWrapper";
import {createTaskValidate} from "utils/validation/createTaskValidate";
import {SideBar} from "components/sideBar/SideBar";


export const CreateTask = () => {
    const answer = useAppSelector(state => state.answer);
    const {statusLoading} = useAppSelector(state => state.loading);
    const {setNewAnswer, setNewAnswerValue, setChecked, createTask} = useAppDispatch();
    const {base64, handleImageFileChange} = useUploadImageToFormatBase64();
    const {deploadedFromBase64} = useDeploadedBase64FormatToString(base64 as string);
    const navigate = useNavigate();
    const {isLoggedIn} = useAppSelector(state => state.users)

    const addNewAnswer = () => {
        setNewAnswer({id: v1(), value: '', checked: false})
    }

    const handleInputChange = (id: string, value: string) => {
        setNewAnswerValue({id, value})
    }

    const isChecked = (id: string, value: boolean) => {
        setChecked({id: id, isChecked: value})
    }

    const encodingImageStringToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
        handleImageFileChange(event)
    }

    const arrayFromStrAnswers = answer.map(el => ({
        text: el.value.split(' ').join('\n'),
        isRight: el.checked
    }));

    const formik = useFormik({
        validate: createTaskValidate,

        initialValues : {
            taskName: '',
            image: '',
            taskLevel: '',
            answerType: '',
            strAnswers: '',
            strAnswers1: '',
            descriptionTask: '',
            isRight: false,
            isRight1: false
        },

        onSubmit: (values) => {
            const payload: Itask = {
                id: 0,
                nextTaskId: 0,
                name: values.taskName,
                image: base64 as string,
                file: null,
                level: {
                    id: values.taskLevel,
                    name: null
                },
                type: {
                    id: values.answerType,
                    name: null
                },
                answers: [],
                ars: null,
                strAnswers: JSON.stringify(arrayFromStrAnswers),
                description: values.descriptionTask
            }

            createTask(payload);
            navigate('/admin/tasks/all')

        }
    })


    if (!isLoggedIn){
        return <Navigate to={'/'}/>
    }

    return (
        <form onSubmit={formik.handleSubmit} encType="myltipart/form-data">
            {statusLoading === 'loading' && <LinearProgress/>}
            <div className={styles.content}>
                <SideBar/>
                <div className={styles.main}>
                    <div className={styles.block}>
                        <div className={styles.taskName_descriptionTask}>
                            <div className={styles.taskName}>
                                <InputWrapper
                                    text={'TaskName'}
                                    error={Boolean(formik.touched.taskName && formik.errors.taskName)}
                                    getFieldProps={formik.getFieldProps('taskName')}/>
                                {formik.touched.taskName && formik.errors.taskName ?
                                    <div className={styles.errors}>{formik.errors.taskName}</div> : null}

                            </div>
                            <div className={styles.descriptionTask}>
                                <InputWrapper
                                    text={'Description'}
                                    error={Boolean(formik.touched.descriptionTask && formik.errors.descriptionTask)}
                                    getFieldProps={formik.getFieldProps('descriptionTask')}/>
                                {formik.touched.descriptionTask && formik.errors.descriptionTask ?
                                    <div className={styles.errors}>{formik.errors.descriptionTask }</div> : null}
                            </div>
                        </div>

                        <div className={styles.selectes}>
                            <div className={styles.firstSelect}>
                                <SelectWrapper
                                    inputLabel={'Level'}
                                    inputValue={{first: 1, second: 2, third: 3}}
                                    level={{first: 'Low', second: 'Middle', third: 'High'}}
                                    isError={Boolean(formik.touched.taskLevel && formik.errors.taskLevel)}
                                    getFieldProps={formik.getFieldProps('taskLevel')}
                                />
                                {formik.touched.taskLevel && formik.errors.taskLevel ?
                                    <div className={styles.errors}>{formik.errors.taskLevel}</div> : null}
                            </div>

                            <div className={styles.secondSelect}>
                                <SelectWrapper
                                    inputLabel={'Type'}
                                    inputValue={{first: 1, second: 2}}
                                    level={{first: 'Radio', second: 'Checkbox'}}
                                    isError={Boolean(formik.touched.answerType && formik.errors.answerType)}
                                    getFieldProps={formik.getFieldProps('answerType')}
                                />
                                {formik.touched.answerType && formik.errors.answerType ?
                                    <div className={styles.errors}>{formik.errors.answerType}</div> : null}
                            </div>
                        </div>
                        <div className={styles.downloadFile}>
                            <ButtonWrapper
                                text={' New answer'}
                                onclick={addNewAnswer}
                                variant={'outlined'}

                            />
                            <UploadFileButtonWrapper
                                onChange={encodingImageStringToBase64}
                                error={!base64}
                                base64String={base64}
                            />
                        </div>
                        {base64 ?
                            <div className={styles.image}><img src={deploadedFromBase64} alt={'Image'}/></div> : null}
                        <div className={styles.strAnswers}>
                            {answer.map(el => <div key={el.id} className={styles.newAnswerElement}>
                                <InputWrapper
                                    id={el.id}
                                    text={'Answers'}
                                    getValue={handleInputChange}
                                    error={!el.value}
                                />

                                <CheckboxWrapper
                                    id={el.id}
                                    isChecked={isChecked}
                                    label={'Is this the correct answer?'}/>
                                <div>
                                    {!el.value ?
                                        <div className={styles.errors}>{'2 field must be required!'}</div> : null}
                                    {answer.every(el => !el.checked) && (
                                        <div
                                            className={styles.errors}>{'There must be at least 1 correct answer!'}</div>
                                    )}
                                </div>
                            </div>)}

                        </div>

                        <div className={styles.buttonsBlock}>
                            <ButtonWrapper
                                text={'Send task'}
                                type={"submit"} variant={'contained'}
                                disable={!formik.isValid || base64 === null || !answer.every(el => el.value) || !answer.some(el => el.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
};
