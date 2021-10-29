import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { FC } from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import FormikUICustomSelect from 'components/common/FormikUICustomSelect';
import TitledContainer from 'components/common/TitledContainer';
import { QuestionTemplateRelationFormProps } from 'components/questionary/QuestionaryComponentRegistry';

import QuestionDependencyList from '../QuestionDependencyList';
import { QuestionExcerpt } from '../QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationFileUploadForm: FC<QuestionTemplateRelationFormProps> =
  (props) => {
    return (
      <QuestionTemplateRelationFormShell
        {...props}
        validationSchema={Yup.object().shape({
          question: Yup.object({
            config: Yup.object({
              file_type: Yup.array(),
              small_label: Yup.string(),
              max_files: Yup.number(),
            }),
          }),
        })}
      >
        {(formikProps) => (
          <>
            <QuestionExcerpt question={props.questionRel.question} />
            <TitledContainer label="Options">
              <Field
                name="config.small_label"
                label="Helper text"
                id="helper-text-id"
                placeholder="(e.g. only PDF accepted)"
                type="text"
                component={TextField}
                margin="normal"
                fullWidth
                data-cy="small_label"
              />
            </TitledContainer>

            <TitledContainer label="Constraints">
              <Field
                name="config.required"
                label="Is required"
                component={FormikUICustomCheckbox}
                margin="normal"
                fullWidth
                data-cy="required"
              />
              <Field
                name="config.file_type"
                label="Accepted file types (leave empty for any)"
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
              />
              <Field
                name="config.max_files"
                label="Max number of files"
                id="Max-files-id"
                type="text"
                component={TextField}
                margin="normal"
                fullWidth
                data-cy="max_files"
              />
            </TitledContainer>

            <TitledContainer label="Dependencies">
              <QuestionDependencyList
                form={formikProps}
                template={props.template}
              />
            </TitledContainer>
          </>
        )}
      </QuestionTemplateRelationFormShell>
    );
  };
