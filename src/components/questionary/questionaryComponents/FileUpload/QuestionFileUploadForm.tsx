import { Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import React, { FC } from 'react';
import * as Yup from 'yup';

import FormikUICustomSelect from 'components/common/FormikUICustomSelect';
import TitledContainer from 'components/common/TitledContainer';
import { QuestionFormProps } from 'components/questionary/QuestionaryComponentRegistry';
import { useNaturalKeySchema } from 'utils/userFieldValidationSchema';

import { QuestionFormShell } from '../QuestionFormShell';

export const QuestionFileUploadForm: FC<QuestionFormProps> = (props) => {
  const field = props.question;
  const naturalKeySchema = useNaturalKeySchema(field.naturalKey);

  return (
    <QuestionFormShell
      {...props}
      validationSchema={Yup.object().shape({
        naturalKey: naturalKeySchema,
        question: Yup.string().required('Question is required'),
        config: Yup.object({
          file_type: Yup.array().required().min(1, 'File type is required'),
          small_label: Yup.string(),
          max_files: Yup.number(),
        }),
      })}
    >
      {() => (
        <>
          <Field
            name="naturalKey"
            id="Key-Input"
            label="Key"
            type="text"
            component={TextField}
            fullWidth
            inputProps={{ 'data-cy': 'natural_key' }}
          />
          <Field
            name="question"
            id="Question-Input"
            label="Question"
            type="text"
            component={TextField}
            fullWidth
            inputProps={{ 'data-cy': 'question' }}
          />

          <TitledContainer label="Options">
            <Field
              name="config.small_label"
              label="Helper text"
              id="Helper-Text-Input"
              placeholder="(e.g. only PDF accepted)"
              type="text"
              component={TextField}
              fullWidth
              data-cy="small_label"
            />
          </TitledContainer>

          <TitledContainer label="Constraints">
            <Field
              name="config.required"
              id="Is-Required-Input"
              component={CheckboxWithLabel}
              type="checkbox"
              Label={{
                label: 'Is required',
              }}
              fullWidth
              data-cy="required"
            />
            <Field
              name="config.file_type"
              label="Accepted file types"
              id="fileType"
              component={FormikUICustomSelect}
              multiple
              availableOptions={[
                '.pdf',
                '.doc',
                '.docx',
                'audio/*',
                'video/*',
                'image/*',
              ]}
              fullWidth
              data-cy="file_type"
              required
            />
            <Field
              name="config.max_files"
              id="Max-number-Input"
              label="Max number of files"
              type="text"
              component={TextField}
              fullWidth
              data-cy="max_files"
            />
          </TitledContainer>
        </>
      )}
    </QuestionFormShell>
  );
};
