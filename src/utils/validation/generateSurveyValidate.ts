import {FormikValues} from "formik";
import {FormikGenerateSurveyErrorsType} from "types/formikErrorTypes/FormikGenerateSurveyErrorsType";


export const generateSurveyValidate = (values: FormikValues) => {
    const errors: FormikGenerateSurveyErrorsType = {}

    if (!values.email) {
        errors.email = 'This field cannot be empty'
    }
    return errors;
}