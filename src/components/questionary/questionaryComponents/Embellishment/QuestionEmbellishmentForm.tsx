import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { FC } from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import FormikUICustomEditor from 'components/common/FormikUICustomEditor';
import { QuestionFormProps } from 'components/questionary/QuestionaryComponentRegistry';
import { EmbellishmentConfig } from 'generated/sdk';
import { useNaturalKeySchema } from 'utils/userFieldValidationSchema';

import { QuestionFormShell } from '../QuestionFormShell';

export const QuestionEmbellishmentForm: FC<QuestionFormProps> = (props) => {
  const field = props.question;
  const naturalKeySchema = useNaturalKeySchema(field.naturalKey);

  return (
    <QuestionFormShell
      {...props}
      validationSchema={Yup.object().shape({
        naturalKey: naturalKeySchema,
        config: Yup.object({
          html: Yup.string().required('Content is required'),
          plain: Yup.string().required('Plain description is required'),
        }),
      })}
    >
      {(formikProps) => (
        <>
          <Field
            name="naturalKey"
            label="Key"
            id="naturalKey-Input"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            inputProps={{ 'data-cy': 'natural_key' }}
          />
          <Field
            name="config.html"
            id="HTML-Input"
            type="text"
            component={FormikUICustomEditor}
            margin="normal"
            fullWidth
            init={{
              skin: false,
              content_css: false,
              plugins: ['link', 'preview', 'image', 'code'],
              toolbar: 'bold italic',
              branding: false,
            }}
            data-cy="html"
          />

          <Field
            name="config.plain"
            id="Plain-Description-Input"
            label="Plain description"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            data-cy="plain"
          />

          <Field
            name="config.omitFromPdf"
            id="Omit-from-pdf-checkbox"
            checked={
              (formikProps.values.config as EmbellishmentConfig).omitFromPdf
            }
            component={FormikUICustomCheckbox}
            label="Omit from PDF"
            margin="normal"
            fullWidth
            data-cy="omit"
          />
        </>
      )}
    </QuestionFormShell>
  );
};
