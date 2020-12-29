import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import React from 'react';
import * as Yup from 'yup';

import { DataType } from 'generated/sdk';

import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
import { QuestionaryComponentSampleDeclaration } from './QuestionaryComponentSampleDeclaration';
import { QuestionSampleDeclarationForm } from './QuestionSampleDeclarationForm';
import { QuestionTemplateRelationSampleDeclarationForm } from './QuestionTemplateRelationSampleDeclarationForm';
import SamplesAnswerRenderer from './SamplesAnswerRenderer';

export const sampleDeclarationDefinition: QuestionaryComponentDefinition = {
  dataType: DataType.SAMPLE_DECLARATION,
  name: 'Sample Declaration',
  questionaryComponent: QuestionaryComponentSampleDeclaration,
  questionForm: () => QuestionSampleDeclarationForm,
  questionTemplateRelationForm: () =>
    QuestionTemplateRelationSampleDeclarationForm,
  readonly: false,
  creatable: true,
  icon: <CheckBoxOutlineBlankIcon />,
  answerRenderer: ({ answer }) => <SamplesAnswerRenderer answer={answer} />,
  createYupValidationSchema: answer => {
    const schema = Yup.array().of(Yup.number());

    return schema;
  },
  getYupInitialValue: ({ answer }) => answer.value || [],
};
