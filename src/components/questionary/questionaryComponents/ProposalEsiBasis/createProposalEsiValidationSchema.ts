import * as Yup from 'yup';

import { CreateYupValidation } from 'components/questionary/QuestionaryComponentRegistry';

export const createProposalEsiBasisValidationSchema: CreateYupValidation = () => {
  const schema = Yup.object().shape({
    proposalPk: Yup.number().min(1, 'Proposal is required'),
  });

  return schema;
};
