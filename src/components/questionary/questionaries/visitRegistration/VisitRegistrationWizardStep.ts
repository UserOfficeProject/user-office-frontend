import { QuestionaryWizardStep } from 'components/questionary/DefaultWizardStepFactory';
import { QuestionarySubmissionState } from 'models/questionary/QuestionarySubmissionState';
import { VisitSubmissionState } from 'models/questionary/visit/VisitSubmissionState';

export class VisitRegistrationWizardStep extends QuestionaryWizardStep {
  isItemWithQuestionaryEditable(state: QuestionarySubmissionState): boolean {
    const registrationState = state as VisitSubmissionState;

    return registrationState.registration.isRegistrationSubmitted === false;
  }
}
