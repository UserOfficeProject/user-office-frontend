import { Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import React, { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';

import FormikDropdown from 'components/common/FormikDropdown';
import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import FormikUICustomTable from 'components/common/FormikUICustomTable';
import TitledContainer from 'components/common/TitledContainer';
import { FormComponent } from 'components/questionary/QuestionaryComponentRegistry';
import {
  QuestionTemplateRelation,
  SelectionFromOptionsConfig,
} from 'generated/sdk';

import QuestionDependencyList from '../QuestionDependencyList';
import { QuestionExcerpt } from '../QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationMultipleChoiceForm: FormComponent<QuestionTemplateRelation> = props => {
  const config = props.field.config as SelectionFromOptionsConfig;
  const [
    showIsMultipleSelectCheckbox,
    setShowIsMultipleSelectCheckbox,
  ] = useState(config.variant === 'dropdown');

  return (
    <QuestionTemplateRelationFormShell
      closeMe={props.closeMe}
      dispatch={props.dispatch}
      questionRel={props.field}
      template={props.template}
      validationSchema={Yup.object().shape({
        question: Yup.object({
          config: Yup.object({
            required: Yup.bool(),
            variant: Yup.string().required('Variant is required'),
          }),
        }),
      })}
    >
      {formikProps => (
        <>
          <QuestionExcerpt question={props.field.question} />
          <TitledContainer label="Constraints">
            <Field
              name="config.required"
              label="Is required"
              component={FormikUICustomCheckbox}
              margin="normal"
              fullWidth
              inputProps={{ 'data-cy': 'required' }}
            />
          </TitledContainer>

          <TitledContainer label="Options">
            <FormikDropdown
              name="config.variant"
              label="Variant"
              items={[
                { text: 'Radio', value: 'radio' },
                { text: 'Dropdown', value: 'dropdown' },
              ]}
              data-cy="variant"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setShowIsMultipleSelectCheckbox(e.target.value === 'dropdown');
              }}
            />
            {showIsMultipleSelectCheckbox && (
              <Field
                name="config.isMultipleSelect"
                component={CheckboxWithLabel}
                Label={{ label: 'Is multiple select' }}
                margin="normal"
              />
            )}
          </TitledContainer>

          <TitledContainer label="Items">
            <Field
              title=""
              name="config.options"
              component={FormikUICustomTable}
              columns={[{ title: 'Answer', field: 'answer' }]}
              dataTransforms={{
                toTable: (options: string[]) => {
                  return options.map(option => {
                    return { answer: option };
                  });
                },
                fromTable: (rows: any[]) => {
                  return rows.map(row => row.answer);
                },
              }}
              margin="normal"
              fullWidth
              data-cy="options"
            />
          </TitledContainer>
          <TitledContainer label="Dependencies">
            <QuestionDependencyList
              field={formikProps.values}
              template={props.template}
            />
          </TitledContainer>
        </>
      )}
    </QuestionTemplateRelationFormShell>
  );
};
