import EsiReview from 'components/esi/EsiReview';
import { DefaultReviewWizardStep } from 'components/questionary/DefaultReviewWizardStep';
import { DefaultStepDisplayElementFactory } from 'components/questionary/DefaultStepDisplayElementFactory';
import { DefaultWizardStepFactory } from 'components/questionary/DefaultWizardStepFactory';
import { TemplateCategoryId } from 'generated/sdk';
import { EsiSubmissionState } from 'models/questionary/esi/EsiSubmissionState';

import { QuestionaryDefinition } from '../../QuestionaryRegistry';
import { EsiWizardStep } from './EsiWizardStep';

export const esiQuestionaryDefinition: QuestionaryDefinition = {
  categoryId: TemplateCategoryId.PROPOSAL_ESI,

  displayElementFactory: new DefaultStepDisplayElementFactory(EsiReview),

  wizardStepFactory: new DefaultWizardStepFactory(
    EsiWizardStep,
    new DefaultReviewWizardStep(
      (state) => (state as EsiSubmissionState).esi.isSubmitted
    )
  ),
};
