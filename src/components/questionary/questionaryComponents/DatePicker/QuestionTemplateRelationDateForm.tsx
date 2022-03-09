import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import React, { FC } from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import TitledContainer from 'components/common/TitledContainer';
import { QuestionTemplateRelationFormProps } from 'components/questionary/QuestionaryComponentRegistry';

import QuestionDependencyList from '../QuestionDependencyList';
import { QuestionExcerpt } from '../QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationDateForm: FC<
  QuestionTemplateRelationFormProps
> = (props) => {
  return (
    <QuestionTemplateRelationFormShell
      {...props}
      validationSchema={Yup.object().shape({})}
    >
      {(formikProps) => (
        <>
          <QuestionExcerpt question={props.questionRel.question} />
          <Field
            name="config.includeTime"
            label="Include time"
            component={FormikUICustomCheckbox}
            fullWidth
            inputProps={{ 'data-cy': 'includeTime' }}
          />
          <Field
            name="config.tooltip"
            label="Tooltip"
            id="tooltip-input"
            type="text"
            component={TextField}
            fullWidth
            data-cy="tooltip"
          />
          <TitledContainer label="Constraints">
            <Field
              name="config.required"
              label="Is required"
              component={FormikUICustomCheckbox}
              fullWidth
              data-cy="required"
            />

            <LocalizationProvider dateAdapter={DateAdapter}>
              <Field
                name="config.minDate"
                label="Min"
                id="Min-input"
                inputFormat="yyyy-MM-dd"
                component={DatePicker}
                textField={{
                  fullWidth: true,
                  'data-cy': 'minDate',
                }}
              />
              <Field
                name="config.maxDate"
                label="Max"
                id="Max-input"
                inputFormat="yyyy-MM-dd"
                component={DatePicker}
                textField={{
                  fullWidth: true,
                  'data-cy': 'maxDate',
                }}
              />
              <Field
                name="config.defaultDate"
                label="Default"
                id="Default-input"
                inputFormat="yyyy-MM-dd"
                component={DatePicker}
                textField={{
                  fullWidth: true,
                  'data-cy': 'defaultDate',
                }}
              />
            </LocalizationProvider>
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
