import { QuestionaryWizardStep } from 'components/questionary/DefaultWizardStepFactory';
import { QuestionarySubmissionState } from 'models/QuestionarySubmissionState';

export class SampleQuestionaryWizardStep extends QuestionaryWizardStep {
  isItemWithQuestionaryEditable(state: QuestionarySubmissionState): boolean {
    return true; // Since view is locked when proposal is submitted, we can simply return true because edit sample will be disabled
  }
}
