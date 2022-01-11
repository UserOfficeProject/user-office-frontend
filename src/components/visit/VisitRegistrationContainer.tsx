/* eslint-disable @typescript-eslint/no-use-before-define */
import { default as React, useEffect } from 'react';

import Questionary from 'components/questionary/Questionary';
import {
  QuestionaryContext,
  QuestionaryContextType,
} from 'components/questionary/QuestionaryContext';
import { getQuestionaryDefinition } from 'components/questionary/QuestionaryRegistry';
import { TemplateGroupId } from 'generated/sdk';
import { usePrevious } from 'hooks/common/usePrevious';
import {
  Event,
  QuestionarySubmissionModel,
  QuestionarySubmissionState,
} from 'models/questionary/QuestionarySubmissionState';
import useEventHandlers from 'models/questionary/useEventHandlers';
import { VisitRegistrationSubmissionState } from 'models/questionary/visit/VisitRegistrationSubmissionState';
import { RegistrationWithQuestionary } from 'models/questionary/visit/VisitRegistrationWithQuestionary';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';
export interface VisitRegistrationContextType extends QuestionaryContextType {
  state: VisitRegistrationSubmissionState | null;
}

export interface VisitRegistrationContainerProps {
  registration: RegistrationWithQuestionary;
  onSubmitted?: (registration: RegistrationWithQuestionary) => void;
}
export default function VisitRegistrationContainer(
  props: VisitRegistrationContainerProps
) {
  const { eventHandlers } = useEventHandlers(
    TemplateGroupId.VISIT_REGISTRATION
  );

  const def = getQuestionaryDefinition(TemplateGroupId.VISIT_REGISTRATION);

  const previousInitialVisit = usePrevious(props.registration);

  const customEventHandlers = ({
    getState,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action); // first update state/model
      const state = getState() as VisitRegistrationSubmissionState;
      switch (action.type) {
        case 'ITEM_WITH_QUESTIONARY_SUBMITTED':
          props.onSubmitted?.(state.registration);
          break;
      }
    };
  };
  const initialState = new VisitRegistrationSubmissionState(
    props.registration,
    0,
    false,
    def.wizardStepFactory.getWizardSteps(props.registration.questionary.steps)
  );

  const { state, dispatch } =
    QuestionarySubmissionModel<VisitRegistrationSubmissionState>(initialState, [
      eventHandlers,
      customEventHandlers,
    ]);

  useEffect(() => {
    const isComponentMountedForTheFirstTime =
      previousInitialVisit === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: 'ITEM_WITH_QUESTIONARY_LOADED',
        itemWithQuestionary: props.registration,
      });
      dispatch({
        type: 'STEPS_LOADED',
        steps: props.registration.questionary!.steps,
      });
    }
  }, [previousInitialVisit, props.registration, dispatch]);

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <Questionary
        title={'Visit the facility'}
        displayElementFactory={def.displayElementFactory}
      />
    </QuestionaryContext.Provider>
  );
}
