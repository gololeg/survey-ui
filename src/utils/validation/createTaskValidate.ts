import {FormikCreateTaskErrorsType} from "types/formikCreateTaskErrorsType";
import {FormikValues} from "formik";

export const createTaskValidate = (values: FormikValues) => {
  const errors: FormikCreateTaskErrorsType = {};

  if (!values.taskName) {
    errors.taskName = 'All fields must be filled in!'
  }
  if (!values.descriptionTask) {
    errors.descriptionTask = 'All fields must be filled in!'
  }
  if (!values.taskLevel) {
    errors.taskLevel = 'All fields must be filled in!'
  }
  if (!values.answerType) {
    errors.answerType = 'All fields must be filled in!'
  }
  return errors;
}