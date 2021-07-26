import { DefaultStepDisplayElementFactory } from 'components/questionary/DefaultStepDisplayElementFactory';
import VisitRegistrationReview from 'components/visit/VisitRegistrationReview';
import { TemplateCategoryId } from 'generated/sdk';

import { QuestionaryDefinition } from '../../QuestionaryRegistry';

export const visitRegistrationQuestionaryDefinition: QuestionaryDefinition = {
  categoryId: TemplateCategoryId.VISIT,

  displayElementFactory: new DefaultStepDisplayElementFactory(
    VisitRegistrationReview
  ),
};
