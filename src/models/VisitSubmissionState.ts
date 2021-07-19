import { ExcludeTypeName, ExcludeNull } from 'utils/utilTypes';

import {
  GetVisitRegistrationQuery,
  GetUserProposalBookingsWithEventsQuery,
} from './../generated/sdk';
import { QuestionarySubmissionState } from './QuestionarySubmissionState';

export type RegistrationBasic = ExcludeTypeName<
  ExcludeNull<
    ExcludeNull<
      ExcludeNull<
        ExcludeNull<GetUserProposalBookingsWithEventsQuery['me']>['proposals']
      >[0]['proposalBooking']
    >['scheduledEvents'][0]['visit']
  >['userVisits'][0]
>;

export type RegistrationExtended = Exclude<
  GetVisitRegistrationQuery['userVisit'],
  null
>;
export interface VisitSubmissionState extends QuestionarySubmissionState {
  registration: RegistrationExtended;
}
