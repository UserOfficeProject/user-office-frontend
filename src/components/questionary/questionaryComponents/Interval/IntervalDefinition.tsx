import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';

import defaultRenderer from 'components/questionary/DefaultQuestionRenderer';
import { DataType } from 'generated/sdk';

import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
import { createIntervalValidationSchema } from './createIntervalValidationSchema';
import IntervalSearchCriteriaComponent from './IntervalSearchCriteriaComponent';
import { QuestionaryComponentInterval } from './QuestionaryComponentInterval';
import { QuestionIntervalForm } from './QuestionIntervalForm';
import { QuestionTemplateRelationIntervalForm } from './QuestionTemplateRelationIntervalForm';

export const intervalDefinition: QuestionaryComponentDefinition = {
  dataType: DataType.INTERVAL,
  name: 'Interval',
  questionaryComponent: QuestionaryComponentInterval,
  questionForm: () => QuestionIntervalForm,
  questionTemplateRelationForm: () => QuestionTemplateRelationIntervalForm,
  readonly: false,
  creatable: true,
  icon: <ArrowForwardIosIcon />,
  renderers: {
    answerRenderer: function AnswerRendererComponent({ answer }) {
      const isMinAnswered = typeof answer.value.min === 'number';
      const isMaxAnswered = typeof answer.value.max === 'number';

      const isAnswered = isMinAnswered || isMaxAnswered; // at least one answer

      if (isAnswered) {
        const min = answer.value.min ?? 'unspecified';
        const max = answer.value.max ?? 'unspecified';
        const unit = answer.value.unit || '';

        return (
          <span>
            {min} &ndash; {max} ({unit})
          </span>
        );
      }

      return <span>Left blank</span>;
    },
    questionRenderer: defaultRenderer.questionRenderer,
  },
  createYupValidationSchema: createIntervalValidationSchema,
  getYupInitialValue: ({ answer }) =>
    answer.value || { min: '', max: '', unit: null },
  searchCriteriaComponent: IntervalSearchCriteriaComponent,
};
