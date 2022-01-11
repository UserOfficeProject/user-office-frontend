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
import { SampleEsiSubmissionState } from 'models/questionary/sampleEsi/SampleEsiSubmissionState';
import { SampleEsiWithQuestionary } from 'models/questionary/sampleEsi/SampleEsiWithQuestionary';
import useEventHandlers from 'models/questionary/useEventHandlers';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';

export interface SampleEsiContextType extends QuestionaryContextType {
  state: SampleEsiSubmissionState | null;
}

export interface SampleEsiContainerProps {
  esi: SampleEsiWithQuestionary;
  onUpdate?: (esi: SampleEsiWithQuestionary) => void;
  onSubmitted?: (esi: SampleEsiWithQuestionary) => void;
}
export default function SampleEsiContainer(props: SampleEsiContainerProps) {
  const { eventHandlers } = useEventHandlers(TemplateGroupId.SAMPLE_ESI);

  const def = getQuestionaryDefinition(TemplateGroupId.SAMPLE_ESI);

  const previousInitialEsi = usePrevious(props.esi);

  const customEventHandlers = ({
    getState,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action); // first update state/model
      const state = getState() as SampleEsiSubmissionState;
      switch (action.type) {
        case 'ITEM_WITH_QUESTIONARY_MODIFIED':
          props.onUpdate?.(state.esi);
          break;

        case 'ITEM_WITH_QUESTIONARY_SUBMITTED':
          props.onSubmitted?.(state.esi);
          break;
      }
    };
  };
  const initialState = new SampleEsiSubmissionState(
    props.esi,
    0,
    false,
    def.wizardStepFactory.getWizardSteps(props.esi.questionary.steps)
  );

  const { state, dispatch } =
    QuestionarySubmissionModel<SampleEsiSubmissionState>(initialState, [
      eventHandlers,
      customEventHandlers,
    ]);

  useEffect(() => {
    const isComponentMountedForTheFirstTime = previousInitialEsi === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: 'ITEM_WITH_QUESTIONARY_LOADED',
        itemWithQuestionary: props.esi,
      });
      dispatch({
        type: 'STEPS_LOADED',
        steps: props.esi.questionary!.steps,
      });
    }
  }, [previousInitialEsi, props.esi, dispatch]);

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <Questionary
        title={state.esi.sample.title}
        displayElementFactory={def.displayElementFactory}
      />
    </QuestionaryContext.Provider>
  );
}
