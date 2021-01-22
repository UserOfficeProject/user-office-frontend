import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import * as Yup from 'yup';

import FormikUICustomCheckbox from 'components/common/FormikUICustomCheckbox';
import FormikUICustomDatePicker from 'components/common/FormikUICustomDatePicker';
import FormikUICustomDependencySelector from 'components/common/FormikUICustomDependencySelector';
import TitledContainer from 'components/common/TitledContainer';
import { FormComponent } from 'components/questionary/QuestionaryComponentRegistry';
import { QuestionTemplateRelation } from 'generated/sdk';

import { QuestionExcerpt } from '../QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationDateForm: FormComponent<QuestionTemplateRelation> = props => {
  return (
    <QuestionTemplateRelationFormShell
      closeMe={props.closeMe}
      dispatch={props.dispatch}
      questionRel={props.field}
      template={props.template}
      validationSchema={Yup.object().shape({})}
    >
      {formikProps => (
        <>
          <QuestionExcerpt question={props.field.question} />
          <Field
            name="config.tooltip"
            label="Tooltip"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            data-cy="tooltip"
          />
          <TitledContainer label="Constraints">
            <Field
              name="config.required"
              label="Is required"
              component={FormikUICustomCheckbox}
              margin="normal"
              fullWidth
              data-cy="required"
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Field
                name="config.minDate"
                label="Min"
                format="yyyy-MM-dd"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="minDate"
              />
              <Field
                name="config.maxDate"
                label="Max"
                format="yyyy-MM-dd"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="maxDate"
              />
              <Field
                name="config.defaultDate"
                label="Default"
                format="yyyy-MM-dd"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="defaultDate"
              />
            </MuiPickersUtilsProvider>
          </TitledContainer>
          <TitledContainer label="Dependencies">
            <Field
              name="dependency"
              component={FormikUICustomDependencySelector}
              templateField={props.field}
              template={props.template}
              margin="normal"
              fullWidth
              data-cy="dependencies"
            />
          </TitledContainer>
        </>
      )}
    </QuestionTemplateRelationFormShell>
  );
};
