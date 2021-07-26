import ProposalSummary from 'components/proposal/ProposalSummary';
import { DefaultStepDisplayElementFactory } from 'components/questionary/DefaultStepDisplayElementFactory';
import { TemplateCategoryId } from 'generated/sdk';

import { QuestionaryDefinition } from '../../QuestionaryRegistry';

export const proposalQuestionaryDefinition: QuestionaryDefinition = {
  categoryId: TemplateCategoryId.PROPOSAL_QUESTIONARY,
  displayElementFactory: new DefaultStepDisplayElementFactory(ProposalSummary),
};
