import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import FormikUICustomDatePicker from 'components/common/FormikUICustomDatePicker';
import TitledContainer from 'components/common/TitledContainer';
import { FormComponent } from 'components/questionary/QuestionaryComponentRegistry';
import { Question } from 'generated/sdk';
import { useNaturalKeySchema } from 'utils/userFieldValidationSchema';

import { QuestionFormShell } from '../QuestionFormShell';

export const QuestionDateForm: FormComponent<Question> = props => {
  const field = props.field;

  const naturalKeySchema = useNaturalKeySchema(field.naturalKey);

  return (
    <QuestionFormShell
      closeMe={props.closeMe}
      dispatch={props.dispatch}
      question={props.field}
      validationSchema={Yup.object().shape({
        naturalKey: naturalKeySchema,
        question: Yup.string().required('Question is required'),
      })}
    >
      {formikProps => (
        <>
          <Field
            name="naturalKey"
            label="Key"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'natural_key' }}
          />
          <Field
            name="question"
            label="Question"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'question' }}
          />
          <Field
            name="config.tooltip"
            label="Tooltip"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'tooltip' }}
          />

          <TitledContainer label="Constraints">
            <Field
              name="config.required"
              label="Is required"
              component={FormikUICustomCheckbox}
              margin="normal"
              fullWidth
              data-cy="required"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Field
                name="config.minDate"
                label="Min"
                format="yyyy-MM-dd"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="minDate"
              />
              <Field
                name="config.maxDate"
                label="Max"
                format="yyyy-MM-dd"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="maxDate"
              />
              <Field
                name="config.defaultDate"
                label="Default"
                format="yyyy-MM-dd"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="defaultDate"
              />
            </MuiPickersUtilsProvider>
          </TitledContainer>
        </>
      )}
    </QuestionFormShell>
  );
};
