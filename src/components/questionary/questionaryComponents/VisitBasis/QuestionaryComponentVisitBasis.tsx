import { useContext } from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import { VisitRegistrationContextType } from 'components/visit/VisitRegistrationContainer';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { VisitSubmissionState } from 'models/VisitSubmissionState';

function QuestionaryComponentVisitBasis(props: BasicComponentProps) {
  const { dispatch, state } = useContext(
    QuestionaryContext
  ) as VisitRegistrationContextType;

  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  return null;
}

const visitBasisPreSubmit = () => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  const registration = (state as VisitSubmissionState).registration;

  let returnValue = state.questionaryId;
  if (registration.registrationQuestionaryId) {
    // Already has questionary
    return registration.registrationQuestionaryId;
  }

  // create new questionary
  const result = await api.createVisitRegistrationQuestionary({
    visitId: registration.visitId,
  });
  const newRegistration =
    result.createVisitRegistrationQuestionary.registration;

  if (newRegistration?.questionary) {
    dispatch({
      type: 'VISIT_CREATED',
      visit: newRegistration,
    });
    returnValue = newRegistration.questionary.questionaryId;
  }

  return returnValue;
};

export { QuestionaryComponentVisitBasis, visitBasisPreSubmit };
