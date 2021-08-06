import { immerable } from 'immer';

import { ExcludeTypeName, ExcludeNull } from 'utils/utilTypes';

import {
  GetVisitRegistrationQuery,
  GetUserProposalBookingsWithEventsQuery,
} from './../generated/sdk';
import { QuestionaryObject } from './QuestionaryEditorModel';
import {
  QuestionarySubmissionState,
  WizardStep,
} from './QuestionarySubmissionState';

export type RegistrationBasic = ExcludeTypeName<
  ExcludeNull<
    ExcludeNull<
      ExcludeNull<
        ExcludeNull<
          ExcludeNull<GetUserProposalBookingsWithEventsQuery['me']>['proposals']
        >[0]['proposalBooking']
      >['scheduledEvents'][0]['visit']
    >['registrations']
  >[0]
>;

export type RegistrationExtended = ExcludeNull<
  GetVisitRegistrationQuery['visitRegistration']
>;
export class VisitSubmissionState extends QuestionarySubmissionState {
  [immerable] = true;
  constructor(
    public registration: RegistrationExtended,
    stepIndex: number,
    isDirty: boolean,
    wizardSteps: WizardStep[]
  ) {
    super(stepIndex, isDirty, wizardSteps);
  }

  get itemWithQuestionary() {
    return this.registration;
  }

  set itemWithQuestionary(item: QuestionaryObject) {
    this.registration = { ...this.registration, ...item };
  }
}
