import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import React, { FC } from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import TitledContainer from 'components/common/TitledContainer';
import { QuestionFormProps } from 'components/questionary/QuestionaryComponentRegistry';
import { useNaturalKeySchema } from 'utils/userFieldValidationSchema';

import { QuestionFormShell } from '../QuestionFormShell';

export const QuestionDateForm: FC<QuestionFormProps> = (props) => {
  const field = props.question;

  const naturalKeySchema = useNaturalKeySchema(field.naturalKey);

  return (
    <QuestionFormShell
      {...props}
      validationSchema={Yup.object().shape({
        naturalKey: naturalKeySchema,
        question: Yup.string().required('Question is required'),
      })}
    >
      {() => (
        <>
          <Field
            name="naturalKey"
            label="Key"
            id="Key-Input"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'natural_key' }}
          />
          <Field
            name="question"
            label="Question"
            id="Question-Input"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'question' }}
          />
          <Field
            name="config.includeTime"
            id="Include-time-Input"
            label="Include time"
            component={FormikUICustomCheckbox}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'includeTime' }}
          />
          <Field
            name="config.tooltip"
            id="Tooltip-Input"
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
              id="Is-Required-Input"
              label="Is required"
              component={FormikUICustomCheckbox}
              margin="normal"
              fullWidth
              data-cy="required"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Field
                name="config.minDate"
                id="Min-Time-Input"
                label="Min"
                format="yyyy-MM-dd"
                component={KeyboardDatePicker}
                margin="normal"
                fullWidth
                data-cy="minDate"
              />
              <Field
                name="config.maxDate"
                id="Max-Time-Input"
                label="Max"
                format="yyyy-MM-dd"
                component={KeyboardDatePicker}
                margin="normal"
                fullWidth
                data-cy="maxDate"
              />
              <Field
                name="config.defaultDate"
                id="Default-Time-Input"
                label="Default"
                format="yyyy-MM-dd"
                component={KeyboardDatePicker}
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
