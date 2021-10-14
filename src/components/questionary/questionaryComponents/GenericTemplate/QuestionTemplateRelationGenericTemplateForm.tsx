import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import { Field } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import { default as React, FC } from 'react';
import * as Yup from 'yup';

import TitledContainer from 'components/common/TitledContainer';
import { QuestionTemplateRelationFormProps } from 'components/questionary/QuestionaryComponentRegistry';
import { SubTemplateConfig, TemplateGroupId } from 'generated/sdk';
import { useTemplates } from 'hooks/template/useTemplates';

import QuestionDependencyList from '../QuestionDependencyList';
import { QuestionExcerpt } from '../QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationGenericTemplateForm: FC<QuestionTemplateRelationFormProps> =
  (props) => {
    const templateId = (props.questionRel.question.config as SubTemplateConfig)
      .templateId;
    const { templates } = useTemplates({
      isArchived: false,
      group: TemplateGroupId.GENERIC_TEMPLATE,
      templateIds: templateId ? [templateId] : null,
    });

    if (!templates) {
      return null;
    }

    return (
      <QuestionTemplateRelationFormShell
        {...props}
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
        {(formikProps) => (
          <>
            <QuestionExcerpt question={props.questionRel.question} />
            <TitledContainer label="Options">
              <Field
                name="config.addEntryButtonLabel"
                label="Add button label"
                id="add-button-input"
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
                name="config.minEntries"
                label="Min entries"
                id="Min-input"
                placeholder="(e.g. 1, leave blank for unlimited)"
                type="text"
                component={TextField}
                margin="normal"
                fullWidth
                data-cy="min-entries"
              />
              <Field
                name="config.maxEntries"
                label="Max entries"
                id="Max-input"
                type="text"
                component={TextField}
                margin="normal"
                fullWidth
                data-cy="max-entries"
              />
            </TitledContainer>

            <TitledContainer label="Options">
              <FormControl fullWidth>
                <InputLabel>Template name</InputLabel>
                <Field
                  name="config.templateId"
                  type="text"
                  component={Select}
                  margin="normal"
                  data-cy="templateId"
                  defaultValue={''}
                >
                  {templates.length ? (
                    templates.map((template) => {
                      return (
                        <MenuItem
                          value={template.templateId}
                          key={template.templateId}
                        >
                          {template.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value="noTemplates" key="noTemplates" disabled>
                      No active templates
                    </MenuItem>
                  )}
                </Field>
                <Link href="/GenericTemplates/" target="blank">
                  View all templates
                </Link>
              </FormControl>
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
