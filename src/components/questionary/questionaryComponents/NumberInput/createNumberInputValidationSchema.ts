import * as Yup from 'yup';

import { QuestionaryComponentDefinition } from 'components/questionary/QuestionaryComponentRegistry';
import { NumberInputConfig, NumberValueConstraint } from 'generated/sdk';

import { IntervalPropertyId } from '../Interval/intervalUnits';

export const createNumberInputValidationSchema: QuestionaryComponentDefinition['createYupValidationSchema'] = answer => {
  const config = answer.config as NumberInputConfig;

  let scheme = Yup.number().transform(value =>
    isNaN(value) ? undefined : value
  );

  if (config.required) {
    scheme = scheme.required('Please fill in');
  }

  if (config.numberValueConstraint === NumberValueConstraint.ONLY_NEGATIVE) {
    scheme = scheme.negative('Value must be a negative number');
  }

  if (config.numberValueConstraint === NumberValueConstraint.ONLY_POSITIVE) {
    scheme = scheme.positive('Value must be a positive number');
  }

  return Yup.object().shape({
    value: scheme,
    unit:
      config.property !== IntervalPropertyId.UNITLESS
        ? Yup.string().required('Please specify unit')
        : Yup.string().nullable(),
  });
};
