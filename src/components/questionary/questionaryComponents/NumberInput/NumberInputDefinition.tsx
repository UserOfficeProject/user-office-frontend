import ExposureZeroIcon from '@material-ui/icons/ExposureZero';
import React from 'react';

import defaultRenderer from 'components/questionary/DefaultQuestionRenderer';
import { DataType } from 'generated/sdk';

import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
import { createNumberInputValidationSchema } from './createNumberInputValidationSchema';
import NumberInputAnswerRenderer from './NumberInputAnswerRenderer';
import NumberSearchCriteriaComponent from './NumberSearchCriteriaComponent';
import { QuestionaryComponentNumber } from './QuestionaryComponentNumberInput';
import { QuestionNumberForm } from './QuestionNumberInputForm';
import { QuestionTemplateRelationNumberForm } from './QuestionTemplateRelationNumberInputForm';

export const numberInputDefinition: QuestionaryComponentDefinition = {
  dataType: DataType.NUMBER_INPUT,
  name: 'Number',
  questionaryComponent: QuestionaryComponentNumber,
  questionForm: () => QuestionNumberForm,
  questionTemplateRelationForm: () => QuestionTemplateRelationNumberForm,
  readonly: false,
  creatable: true,
  icon: <ExposureZeroIcon />,
  renderers: {
    answerRenderer: NumberInputAnswerRenderer,
    questionRenderer: defaultRenderer.questionRenderer,
  },

  createYupValidationSchema: createNumberInputValidationSchema,
  getYupInitialValue: ({ answer }) => answer.value || { value: '', unit: null },
  searchCriteriaComponent: NumberSearchCriteriaComponent,
};
