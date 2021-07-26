import { DefaultStepDisplayElementFactory } from 'components/questionary/DefaultStepDisplayElementFactory';
import ShipmentReview from 'components/shipments/ShipmentReview';
import { TemplateCategoryId } from 'generated/sdk';

import { QuestionaryDefinition } from '../../QuestionaryRegistry';
export const shipmentQuestionaryDefinition: QuestionaryDefinition = {
  categoryId: TemplateCategoryId.SHIPMENT_DECLARATION,
  displayElementFactory: new DefaultStepDisplayElementFactory(ShipmentReview),
};
