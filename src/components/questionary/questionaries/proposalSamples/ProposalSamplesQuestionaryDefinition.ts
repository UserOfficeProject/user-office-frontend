import { TemplateCategoryId } from 'generated/sdk';

import { QuestionaryDefinition } from '../../QuestionaryRegistry';
import { SampleStepDisplayElementFactory } from '../sample/SampleStepDisplayElementFactory';
import { SampleWizardStepFactory } from '../sample/SampleWizardStepFactory';

export const proposalSamplesQuestionaryDefinition: QuestionaryDefinition = {
  categoryId: TemplateCategoryId.PROPOSAL_QUESTIONARY,
  displayElementFactory: new SampleStepDisplayElementFactory(),
  wizardStepFactory: new SampleWizardStepFactory(),
};
