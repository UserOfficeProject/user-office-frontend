import { immerable } from 'immer';

import { Questionary } from 'generated/sdk';

import {
  QuestionarySubmissionState,
  WizardStep,
} from '../QuestionarySubmissionState';
import { SampleEsiWithQuestionary } from './SampleEsiWithQuestionary';

export class SampleEsiSubmissionState extends QuestionarySubmissionState {
  [immerable] = true;
  constructor(
    public esi: SampleEsiWithQuestionary,
    stepIndex: number,
    isDirty: boolean,
    wizardSteps: WizardStep[]
  ) {
    super(esi, stepIndex, isDirty, wizardSteps);
  }

  getItemId(): [number, number] {
    return [this.esi.esiId, this.esi.sampleId];
  }
  get itemWithQuestionary() {
    return this.esi;
  }

  set itemWithQuestionary(item: { questionary: Questionary }) {
    this.esi = { ...this.esi, ...item };
  }
}
