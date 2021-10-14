import { Field } from 'formik';
import React, { FC } from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import TitledContainer from 'components/common/TitledContainer';
import { QuestionTemplateRelationFormProps } from 'components/questionary/QuestionaryComponentRegistry';
import { QuestionExcerpt } from 'components/questionary/questionaryComponents/QuestionExcerpt';

import QuestionDependencyList from '../QuestionDependencyList';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationBooleanForm: FC<QuestionTemplateRelationFormProps> =
  (props) => {
    return (
      <QuestionTemplateRelationFormShell
        {...props}
        template={props.template}
        validationSchema={Yup.object().shape({
          question: Yup.object({
            config: Yup.object({
              required: Yup.bool(),
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
                label="User must check it to continue"
                margin="normal"
                fullWidth
                data-cy="required"
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
