import * as Yup from 'yup';

import { QuestionaryComponentDefinition } from 'components/questionary/QuestionaryComponentRegistry';
import { DateConfig } from 'generated/sdk';

export const createDateValidationSchema: QuestionaryComponentDefinition['createYupValidationSchema'] = answer => {
  let schema = Yup.date().typeError('Invalid Date Format');
  const config = answer.config as DateConfig;
  config.required && (schema = schema.required(`This date is required`));

  if (config.minDate) {
    const minDate = new Date(config.minDate);
    schema = schema.min(minDate, `Value must be a date after ${minDate}`);
  }

  if (config.maxDate) {
    const maxDate = new Date(config.maxDate);
    schema = schema.max(maxDate, `Value must be a date before ${maxDate}`);
  }

  return schema;
};
