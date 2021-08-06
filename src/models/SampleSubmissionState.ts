import { immerable } from 'immer';

import { QuestionaryObject } from './QuestionaryEditorModel';
import {
  QuestionarySubmissionState,
  WizardStep,
} from './QuestionarySubmissionState';
import { SampleWithQuestionary } from './Sample';
export class SampleSubmissionState extends QuestionarySubmissionState {
  [immerable] = true;
  constructor(
    public sample: SampleWithQuestionary,
    stepIndex: number,
    isDirty: boolean,
    wizardSteps: WizardStep[]
  ) {
    super(stepIndex, isDirty, wizardSteps);
  }

  get itemWithQuestionary() {
    return this.sample;
  }

  set itemWithQuestionary(item: QuestionaryObject) {
    this.sample = { ...this.sample, ...item };
  }
}
