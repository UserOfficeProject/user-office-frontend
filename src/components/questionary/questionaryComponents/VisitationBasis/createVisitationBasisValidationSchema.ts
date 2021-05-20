import * as Yup from 'yup';

import { CreateYupValidation } from 'components/questionary/QuestionaryComponentRegistry';

export const createVisitationBasisValidationSchema: CreateYupValidation = () => {
  const schema = Yup.object().shape({
    proposalId: Yup.number().min(1, 'Proposal is required'),
    instrumentId: Yup.number().min(1, 'Instrument is required'),
  });

  return schema;
};
