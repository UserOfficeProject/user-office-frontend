import { QuestionaryWizardStep } from 'components/questionary/DefaultWizardStepFactory';
import { EsiSubmissionState } from 'models/questionary/esi/EsiSubmissionState';
import { QuestionarySubmissionState } from 'models/questionary/QuestionarySubmissionState';

export class EsiWizardStep extends QuestionaryWizardStep {
  isItemWithQuestionaryEditable(state: QuestionarySubmissionState): boolean {
    const registrationState = state as EsiSubmissionState;

    return registrationState.esi.isSubmitted === false;
  }
}
