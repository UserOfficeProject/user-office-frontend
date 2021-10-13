import * as Yup from 'yup';

import { CreateYupValidation } from 'components/questionary/QuestionaryComponentRegistry';

export const createVisitBasisValidationSchema: CreateYupValidation = () => {
  const schema = Yup.object().shape({
    proposalPk: Yup.number().min(1, 'Proposal is required'),
  });

  return schema;
};
