import dateFormat from 'dateformat';
import React from 'react';

import { AnswerRenderer } from 'components/questionary/QuestionaryComponentRegistry';
import { DateConfig } from 'generated/sdk';

const DateAnswerRenderer: AnswerRenderer = ({ config, value }) => {
  const format = (config as DateConfig).includeTime
    ? 'dd-mmm-yyyy HH:MM'
    : 'dd-mmm-yyyy';

  return <span>{dateFormat(value, format)}</span>;
};

export default DateAnswerRenderer;
