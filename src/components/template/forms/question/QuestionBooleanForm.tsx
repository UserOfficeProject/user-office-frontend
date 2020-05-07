import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import * as Yup from 'yup';
import { BooleanConfig, Question } from '../../../../generated/sdk';
import { EventType } from '../../../../models/QuestionaryEditorModel';
import { useNaturalKeySchema } from '../../../../utils/userFieldValidationSchema';
import { BooleanConfigFragment } from '../fragments/BooleanConfigFragment';
import { QuestionFormShell } from './QuestionFormShell';
import { TFormSignature } from '../TFormSignature';

export const QuestionBooleanForm: TFormSignature<Question> = props => {
  const field = props.field;
  const naturalKeySchema = useNaturalKeySchema(field.naturalKey);

  return (
    <Formik
      initialValues={field}
      onSubmit={async vals => {
        props.dispatch({
          type: EventType.UPDATE_FIELD_REQUESTED,
          payload: {
            field: { ...field, ...vals },
          },
        });
        props.closeMe();
      }}
      validationSchema={Yup.object().shape({
        question: Yup.object({
          naturalKey: naturalKeySchema,
          question: Yup.string().required('Question is required'),
          config: Yup.object({
            required: Yup.bool(),
          }),
        }),
      })}
    >
      {formikProps => (
        <Form style={{ flexGrow: 1 }}>
          <QuestionFormShell {...props}>
            <Field
              name="question.naturalKey"
              label="Key"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              inputProps={{ 'data-cy': 'natural_key' }}
            />
            <Field
              name="question.question"
              label="Question"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              inputProps={{ 'data-cy': 'question' }}
            />

            <BooleanConfigFragment
              config={formikProps.values.config as BooleanConfig}
            />
          </QuestionFormShell>
        </Form>
      )}
    </Formik>
  );
};
