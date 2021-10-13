import { dateQuestionValidationSchema } from '@esss-swap/duo-validation';
import TodayIcon from '@material-ui/icons/Today';
import React from 'react';

import defaultRenderer from 'components/questionary/DefaultQuestionRenderer';
import { DataType } from 'generated/sdk';

import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
import DateAnswerRenderer from './DateAnswerRenderer';
import DateSearchCriteriaInput from './DateSearchCriteriaInput';
import { preSubmitDateTransform } from './preSubmitDateTransform';
import { QuestionaryComponentDatePicker } from './QuestionaryComponentDatePicker';
import { QuestionDateForm } from './QuestionDateForm';
import { QuestionTemplateRelationDateForm } from './QuestionTemplateRelationDateForm';

export const dateDefinition: QuestionaryComponentDefinition = {
  dataType: DataType.DATE,
  name: 'Date',
  questionaryComponent: QuestionaryComponentDatePicker,
  questionForm: () => QuestionDateForm,
  questionTemplateRelationForm: () => QuestionTemplateRelationDateForm,
  readonly: false,
  creatable: true,
  icon: <TodayIcon />,
  renderers: {
    questionRenderer: defaultRenderer.questionRenderer,
    answerRenderer: DateAnswerRenderer,
  },
  createYupValidationSchema: dateQuestionValidationSchema,
  getYupInitialValue: ({ answer }) => answer.value,
  searchCriteriaComponent: DateSearchCriteriaInput,
  preSubmitTransform: preSubmitDateTransform,
};
