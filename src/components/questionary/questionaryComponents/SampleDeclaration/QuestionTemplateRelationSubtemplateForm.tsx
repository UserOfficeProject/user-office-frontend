import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import { Field } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import React from 'react';
import * as Yup from 'yup';

import FormikUICustomDependencySelector from 'components/common/FormikUICustomDependencySelector';
import TitledContainer from 'components/common/TitledContainer';
import { FormComponent } from 'components/questionary/QuestionaryComponentRegistry';
import { QuestionTemplateRelation, TemplateCategoryId } from 'generated/sdk';
import { useTemplates } from 'hooks/template/useTemplates';

import { QuestionExcerpt } from '../QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationSubtemplateForm: FormComponent<QuestionTemplateRelation> = props => {
  const { templates } = useTemplates(
    false,
    TemplateCategoryId.SAMPLE_DECLARATION
  );

  return (
    <QuestionTemplateRelationFormShell
      closeMe={props.closeMe}
      dispatch={props.dispatch}
      questionRel={props.field}
      template={props.template}
      validationSchema={Yup.object().shape({
        question: Yup.object({
          config: Yup.object({
            addEntryButtonLabel: Yup.string(),
            maxEntries: Yup.number().nullable(),
            templateId: Yup.number().required('Template is required'),
          }),
        }),
      })}
    >
      {formikProps => (
        <>
          <QuestionExcerpt question={props.field.question} />
          <TitledContainer label="Options">
            <Field
              name="config.addEntryButtonLabel"
              label="Add button label"
              placeholder='(e.g. "add new")'
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="addEntryButtonLabel"
            />
          </TitledContainer>

          <TitledContainer label="Constraints">
            <Field
              name="config.maxEntries"
              label="Max entries"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="maxEntries"
            />
          </TitledContainer>

          <TitledContainer label="Options">
            <FormControl fullWidth>
              <InputLabel htmlFor="age-simple">Template name</InputLabel>
              <Field
                name="config.templateId"
                type="text"
                component={Select}
                margin="normal"
                data-cy="templateId"
              >
                {templates &&
                  templates.map(template => {
                    return (
                      <MenuItem
                        value={template.templateId}
                        key={template.templateId}
                      >
                        {template.name}
                      </MenuItem>
                    );
                  })}
              </Field>
              <Link href="/SampleDeclarationTemplates/" target="blank">
                View all templates
              </Link>
            </FormControl>
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
