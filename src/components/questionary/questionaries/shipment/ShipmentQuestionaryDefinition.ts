import { DefaultReviewWizardStep } from 'components/questionary/createDefaultReviewWizardStep';
import { DefaultStepDisplayElementFactory } from 'components/questionary/DefaultStepDisplayElementFactory';
import { DefaultWizardStepFactory } from 'components/questionary/DefaultWizardStepFactory';
import ShipmentReview from 'components/shipments/ShipmentReview';
import { ShipmentStatus, TemplateCategoryId } from 'generated/sdk';

import { QuestionaryDefinition } from '../../QuestionaryRegistry';
import { ProposalQuestionaryWizardStep } from '../proposal/ProposalQuestionaryWizardStep';
import { ShipmentSubmissionState } from './../../../../models/ShipmentSubmissionState';
export const shipmentQuestionaryDefinition: QuestionaryDefinition = {
  categoryId: TemplateCategoryId.SHIPMENT_DECLARATION,
  displayElementFactory: new DefaultStepDisplayElementFactory(ShipmentReview),
  wizardStepFactory: new DefaultWizardStepFactory(
    ProposalQuestionaryWizardStep,
    new DefaultReviewWizardStep((state) => {
      return (
        (state as ShipmentSubmissionState).shipment.status ===
        ShipmentStatus.SUBMITTED
      );
    })
  ),
};
