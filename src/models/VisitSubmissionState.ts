import {
  UserVisitFragment,
  GetVisitRegistrationQuery,
} from './../generated/sdk';
import { QuestionarySubmissionState } from './QuestionarySubmissionState';

export type RegistrationBasic = UserVisitFragment;

export type RegistrationExtended = Exclude<
  GetVisitRegistrationQuery['userVisit'],
  null
>;
export interface VisitSubmissionState extends QuestionarySubmissionState {
  registration: RegistrationExtended;
}
