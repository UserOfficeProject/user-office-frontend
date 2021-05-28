import moment from 'moment';
import * as Yup from 'yup';

import { QuestionaryComponentDefinition } from 'components/questionary/QuestionaryComponentRegistry';
import { DateConfig } from 'generated/sdk';

function normalizeDate(date: Date) {
  date.setHours(12);
  date.setMinutes(0);
  date.setMilliseconds(0);

  return date;
}

export const createDateValidationSchema: QuestionaryComponentDefinition['createYupValidationSchema'] = (
  answer
) => {
  let schema = Yup.date()
    .nullable()
    .typeError('Invalid Date Format')
    .transform(function (value: Date | null) {
      if (value === null) {
        return null;
      }

      return normalizeDate(value);
    });

  const config = answer.config as DateConfig;

  if (config.required) {
    schema = schema.required(`This date is required`);
  }

  if (config.minDate) {
    const minDate = normalizeDate(new Date(config.minDate));
    schema = schema.min(
      minDate,
      `Date must be no earlier than ${moment(minDate).format('yyyy-MM-DD')}`
    );
  }

  if (config.maxDate) {
    const maxDate = normalizeDate(new Date(config.maxDate));
    schema = schema.max(
      maxDate,
      `Date must be no latter than ${moment(maxDate).format('yyyy-MM-DD')}`
    );
  }

  return schema;
};
