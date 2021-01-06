import React from 'react';

import {
  Event,
  QuestionarySubmissionState,
} from 'models/QuestionarySubmissionState';

export interface QuestionaryContextType {
  state: QuestionarySubmissionState | null;
  dispatch: React.Dispatch<Event>;
}
export const QuestionaryContext = React.createContext<QuestionaryContextType>({
  state: null,
  dispatch: e => {},
});

export const createMissingContextErrorMessage = <T>(origin: T) =>
  `${typeof origin} is missing valid QuestionaryContext. Wrap ${typeof origin} or one of its parrents with QuestionaryContext and make sure it is set up properly`;
