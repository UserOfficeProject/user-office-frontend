import { DefaultReviewWizardStep } from 'components/questionary/DefaultReviewWizardStep';
import { DefaultStepDisplayElementFactory } from 'components/questionary/DefaultStepDisplayElementFactory';
import { DefaultWizardStepFactory } from 'components/questionary/DefaultWizardStepFactory';
import VisitRegistrationReview from 'components/visit/VisitRegistrationReview';
import { TemplateCategoryId } from 'generated/sdk';
import { VisitSubmissionState } from 'models/VisitSubmissionState';

import { QuestionaryDefinition } from '../../QuestionaryRegistry';
import { VisitRegistrationWizardStep } from './VisitRegistrationWizardStep';

export const visitRegistrationQuestionaryDefinition: QuestionaryDefinition = {
  categoryId: TemplateCategoryId.VISIT,

  displayElementFactory: new DefaultStepDisplayElementFactory(
    VisitRegistrationReview
  ),

  wizardStepFactory: new DefaultWizardStepFactory(
    VisitRegistrationWizardStep,
    new DefaultReviewWizardStep(
      (state) =>
        (state as VisitSubmissionState).registration.isRegistrationSubmitted
    )
  ),
};
