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
import { SampleSubmissionState } from 'models/questionary/sample/SampleSubmissionState';
import { SampleWithQuestionary } from 'models/questionary/sample/SampleWithQuestionary';
import useEventHandlers from 'models/questionary/useEventHandlers';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';

export interface SampleContextType extends QuestionaryContextType {
  state: SampleSubmissionState | null;
}

export function SampleDeclarationContainer(props: {
  sample: SampleWithQuestionary;
  sampleCreated?: (sample: SampleWithQuestionary) => void;
  sampleUpdated?: (sample: SampleWithQuestionary) => void;
  sampleEditDone?: () => void;
}) {
  const { eventHandlers } = useEventHandlers(TemplateGroupId.SAMPLE);

  const def = getQuestionaryDefinition(TemplateGroupId.SAMPLE);

  const previousInitialSample = usePrevious(props.sample);

  const customEventHandlers = ({
    getState,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action);
      const state = getState() as SampleSubmissionState;
      switch (action.type) {
        case 'ITEM_WITH_QUESTIONARY_MODIFIED':
          props.sampleUpdated?.({
            ...state.sample,
            ...action.itemWithQuestionary,
          });
          break;
        case 'ITEM_WITH_QUESTIONARY_CREATED':
          props.sampleCreated?.(
            action.itemWithQuestionary as SampleWithQuestionary
          );
          break;
        case 'ITEM_WITH_QUESTIONARY_SUBMITTED':
          props.sampleEditDone?.();
          break;
      }
    };
  };

  const initialState = new SampleSubmissionState(
    props.sample,
    0,
    false,
    def.wizardStepFactory.getWizardSteps(props.sample.questionary.steps)
  );

  const { state, dispatch } = QuestionarySubmissionModel<SampleSubmissionState>(
    initialState,
    [eventHandlers, customEventHandlers]
  );

  useEffect(() => {
    const isComponentMountedForTheFirstTime =
      previousInitialSample === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: 'ITEM_WITH_QUESTIONARY_LOADED',
        itemWithQuestionary: props.sample,
      });
      dispatch({
        type: 'STEPS_LOADED',
        steps: props.sample.questionary.steps,
      });
    }
  }, [previousInitialSample, props.sample, dispatch]);

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <Questionary
        title={state.sample.title || 'New Sample'}
        displayElementFactory={def.displayElementFactory}
      />
    </QuestionaryContext.Provider>
  );
}
