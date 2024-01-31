import React, {ChangeEvent, useEffect, useState} from "react";
import {Formik, useFormik} from "formik";
import styles from "./survey_styles.module.css"
import {API} from "API/api";
import {handleFileChange} from "utils/transformStringToBase64";
import {LinearProgress} from '@mui/material';
import {StatusLoading} from "types/statusLoading";
import {Itask} from "types/Itask";
import {NewAnswer} from "types/newAnswer";
import {FieldInput} from "components/TextField/FieldInput";
import {SelectOption} from "components/Select/SelectOption";
import {LabelCheckbox} from "components/labelCheckbox/LabelCheckbox";
import {LabelButton} from "components/LabelButton/LabelButton";
import {UploadButton} from "components/UploadFileButton/UploadButton";
import {v1} from "uuid";
import {FormikErrorsType} from "types/formikErrorsType";


export const SurveyAdmin = () => {
  const [base64String, setBase64String] = useState<string | null>(null);
  const [loading, setLoading] = useState<StatusLoading>('successful')
  const [inputs, setInputs] = useState<NewAnswer[]>([{id: v1(), value: '', checked: false}, {
    id: v1(),
    value: '',
    checked: false
  },]);

  const addNewAnswer = () => {
    setInputs(state => [...state,
      {
        id: v1(),
        value: '',
        checked: false
      }
    ]);
  }

  const handleInputChange = (id: string, value: string) => {
    const newInputs = inputs.map((input) =>
      input.id === id ? {...input, value: value} : input
    );
    setInputs(newInputs);
  };

  const isChecked = (id: string, value: boolean) => {
    const checked = inputs.map((check) =>
      check.id === id ? {...check, checked: value} : check
    )
    setInputs(checked)
  }

  const transformStringToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event, setBase64String)
  }


  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorsType = {};

      if (!values.taskName) {
        errors.taskName = 'Все поля обязательны к заполнению!'
      }
      if (!values.descriptionTask) {
        errors.descriptionTask = 'Все поля обязательны к заполнению!'
      }
      if (!values.taskLevel) {
        errors.taskLevel = 'Все поля обязательны к заполнению!'
      }
      if (!values.answerType) {
        errors.answerType = 'Все поля обязательны к заполнению!'
      }
      return errors;
    },

    initialValues: {
      taskName: '',
      image: '',
      taskLevel: '',
      answerType: '',
      strAnswers: '',
      strAnswers1: '',
      descriptionTask: '',
      isRight: false,
      isRight1: false,

    },

    onSubmit: async (value) => {
      setLoading('loading')

      const arrayFromStrAnswers = inputs.map(el => ({
        text: el.value.split(' ').join('\n'),
        isRight: el.checked
      }));

      const payload: Itask = {
        id: 0,
        nextTaskId: 0,
        name: value.taskName,
        image: base64String as string,
        file: null,
        level: {
          id: value.taskLevel,
          name: null
        },
        type: {
          id: value.answerType,
          name: null
        },
        answers: [],
        ars: null,
        strAnswers: JSON.stringify(arrayFromStrAnswers),
        description: value.descriptionTask
      }
      const request = await API.createTask(JSON.stringify(payload));
      try {
        console.log(request)
      } catch (e) {

      } finally {
        setLoading('successful')
      }


    }
  })
  console.log(inputs.every(el => el.value))
  return (
    <form onSubmit={formik.handleSubmit} encType="myltipart/form-data">
      {loading === 'loading' && <LinearProgress/>}
      <div className={styles.main}>
        <div className={styles.block}>
          <div className={styles.taskName_descriptionTask}>
            <div className={styles.taskName}>
              <FieldInput
                label={'Имя таски:'}
                text={'TaskName'}
                error={Boolean(formik.touched.taskName && formik.errors.taskName)}
                getFieldProps={formik.getFieldProps('taskName')}/>
              {formik.touched.taskName && formik.errors.taskName ?
                <div className={styles.errors}>{formik.errors.taskName}</div> : null}

            </div>
            <div className={styles.descriptionTask}>
              <FieldInput
                label={'Описание таски:'}
                text={'Description'}
                error={Boolean(formik.touched.descriptionTask && formik.errors.descriptionTask)}
                getFieldProps={formik.getFieldProps('descriptionTask')}/>
              {formik.touched.descriptionTask && formik.errors.descriptionTask ?
                <div className={styles.errors}>{formik.errors.descriptionTask}</div> : null}
            </div>
          </div>

          <div className={styles.selectes}>
            <div className={styles.firstSelect}>
              <SelectOption
                forLabel={'Выберите уровень:'}
                inputLabel={'Level'}
                inputValue={{first: 1, second: 2, third: 3}}
                level={{first: 'Low', second: 'Middle', third: 'High'}}
                error={Boolean(formik.touched.taskLevel && formik.errors.taskLevel)}
                getFieldProps={formik.getFieldProps('taskLevel')}
              />
              {formik.touched.taskLevel && formik.errors.taskLevel ?
                <div className={styles.errors}>{formik.errors.taskLevel}</div> : null}
            </div>

            <div className={styles.secondSelect}>
              <SelectOption
                forLabel={'Выберите тип ответа:'}
                inputLabel={'Type'}
                inputValue={{first: 1, second: 2}}
                level={{first: 'Radio', second: 'Checkbox'}}
                error={Boolean(formik.touched.answerType && formik.errors.answerType)}
                getFieldProps={formik.getFieldProps('answerType')}
              />
              {formik.touched.answerType && formik.errors.answerType ?
                <div className={styles.errors}>{formik.errors.answerType}</div> : null}
            </div>
          </div>
          <div className={styles.downloadFile}>
            <LabelButton text={'Добавить ответ'} onclick={addNewAnswer} variant={'outlined'}/>
            <UploadButton onChange={transformStringToBase64} error={!base64String}/>
          </div>
          <div className={styles.strAnswers}>
            {inputs.map(el => <div key={el.id} className={styles.newAnswerElement}>
              <FieldInput
                id={el.id}
                label={'Варианты ответа:'}
                text={'Answers'}
                getValue={handleInputChange}
                error={!el.value}
              />

              <LabelCheckbox
                id={el.id}
                isChecked={isChecked}
                label={'Это верный ответ?'}/>
              <div>
                {!el.value ? <div className={styles.errors}>{'2 поля обязательны к заполнению!'}</div> : null}
                {inputs.every(el => !el.checked) && (
                  <div className={styles.errors}>Должен быть хотя бы 1 правильный ответ!</div>
                )}
              </div>
            </div>)}

          </div>

          <div className={styles.buttonsBlock}>
            <LabelButton text={'получить все таски'} variant={'contained'}/>
            <LabelButton
              text={'Отправить таску'}
              type={"submit"} variant={'contained'}
              disable={!formik.isValid || base64String === null || !inputs.every(el => el.value) || !inputs.some(el => el.checked)}
            />
          </div>
        </div>
      </div>
    </form>


  );
};

