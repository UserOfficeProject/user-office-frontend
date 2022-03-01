import { Field } from 'formik';
import { TextField } from 'formik-mui';
import React, { FC } from 'react';
import * as Yup from 'yup';

import { QuestionFormProps } from 'components/questionary/QuestionaryComponentRegistry';
import { useNaturalKeySchema } from 'utils/userFieldValidationSchema';

import { QuestionFormShell } from '../QuestionFormShell';

export const QuestionGenericTemplateBasisForm: FC<QuestionFormProps> = (
  props
) => {
  const field = props.question;
  const naturalKeySchema = useNaturalKeySchema(field.naturalKey);

  return (
    <QuestionFormShell
      {...props}
      validationSchema={Yup.object().shape({
        naturalKey: naturalKeySchema,
        question: Yup.string().required('Question is required'),
        config: Yup.object({
          titlePlaceholder: Yup.string(),
          questionLabel: Yup.string(),
        }),
      })}
    >
      {() => (
        <>
          <Field
            name="naturalKey"
            label="Key"
            id="Key-input"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'natural_key' }}
          />
          <Field
            name="question"
            label="Default Sub template Question"
            id="Question-input"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'question' }}
          />
        </>
      )}
    </QuestionFormShell>
  );
};
