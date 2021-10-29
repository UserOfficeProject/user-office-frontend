import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { FC } from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import TitledContainer from 'components/common/TitledContainer';
import { QuestionTemplateRelationFormProps } from 'components/questionary/QuestionaryComponentRegistry';

import QuestionDependencyList from '../QuestionDependencyList';
import { QuestionExcerpt } from '../QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationRichTextInputForm: FC<QuestionTemplateRelationFormProps> =
  (props) => {
    return (
      <QuestionTemplateRelationFormShell
        {...props}
        validationSchema={Yup.object().shape({
          question: Yup.object({
            config: Yup.object({
              required: Yup.boolean(),
            }),
          }),
        })}
      >
        {(formikProps) => (
          <>
            <QuestionExcerpt question={props.questionRel.question} />

            <TitledContainer label="Constraints">
              <Field
                name="config.required"
                component={FormikUICustomCheckbox}
                label="Is required"
                margin="normal"
                fullWidth
                data-cy="required"
              />

              <Field
                name="config.max"
                label="Max"
                id="Max-input"
                type="text"
                component={TextField}
                margin="normal"
                fullWidth
                data-cy="max"
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
