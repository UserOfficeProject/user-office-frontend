import dateformat from 'dateformat';

import { QuestionaryComponentDefinition } from 'components/questionary/QuestionaryComponentRegistry';

export const preSubmitDateTransform: QuestionaryComponentDefinition['preSubmitTransform'] = (
  answer
) => {
  return {
    ...answer,
    value: dateformat(answer.value, 'dd-mmm-yyyy HH:MM:ss'),
  };
};
