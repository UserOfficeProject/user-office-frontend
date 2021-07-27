import { StepType } from 'models/questionary/StepType';
import {
  QuestionarySubmissionState,
  WizardStep,
} from 'models/QuestionarySubmissionState';

export class DefaultReviewWizardStep implements WizardStep {
  public type: StepType = 'VisitReview';
  public payload?: any;

  constructor(
    private isReviewStepCompleted: {
      (state: QuestionarySubmissionState): boolean;
    }
  ) {}

  getMetadata(state: QuestionarySubmissionState) {
    const lastProposalStep =
      state.questionary.steps[state.questionary.steps.length - 1];

    return {
      title: 'Review',
      isCompleted: this.isReviewStepCompleted(state),
      isReadonly: lastProposalStep.isCompleted === false,
    };
  }
}
