import {FormikValues} from "formik";
import {FormikSettingsErrorsType} from "types/formikSettingsErrorsType";


export const settingsValidate = (values: FormikValues) => {
  const errors: FormikSettingsErrorsType = {};

  if (values.lowLevelTaskCount < 0) {
    errors.lowLevelTaskCount = 'Field lowLevelTaskCount must be more that 0'
  }
  if (values.middleLevelTaskCount < 0) {
    errors.middleLevelTaskCount = 'Field lowLevelTaskCount must be more that 0'
  }
  if (values.highLevelTaskCount < 0) {
    errors.highLevelTaskCount = 'Field lowLevelTaskCount must be more that 0'
  }
  if (values.lowLevelTaskTime < 0) {
    errors.lowLevelTaskTime = 'Field lowLevelTaskCount must be more that 0'
  }
  if (values.middleLevelTaskTime < 0) {
    errors.middleLevelTaskTime = 'Field lowLevelTaskCount must be more that 0'
  }
  if (values.highLevelTaskTime < 0) {
    errors.highLevelTaskTime = 'Field lowLevelTaskCount must be more that 0'
  }
  return errors;
}