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
import { GenericTemplateSubmissionState } from 'models/questionary/genericTemplate/GenericTemplateSubmissionState';
import { GenericTemplateWithQuestionary } from 'models/questionary/genericTemplate/GenericTemplateWithQuestionary';
import {
  Event,
  QuestionarySubmissionModel,
  QuestionarySubmissionState,
} from 'models/questionary/QuestionarySubmissionState';
import useEventHandlers from 'models/questionary/useEventHandlers';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';

export interface GenericTemplateContextType extends QuestionaryContextType {
  state: GenericTemplateSubmissionState | null;
}

export function GenericTemplateContainer(props: {
  genericTemplate: GenericTemplateWithQuestionary;
  genericTemplateCreated?: (
    genericTemplate: GenericTemplateWithQuestionary
  ) => void;
  genericTemplateUpdated?: (
    genericTemplate: GenericTemplateWithQuestionary
  ) => void;
  genericTemplateEditDone?: () => void;
  title: string;
}) {
  const { eventHandlers } = useEventHandlers(TemplateGroupId.GENERIC_TEMPLATE);

  const def = getQuestionaryDefinition(TemplateGroupId.GENERIC_TEMPLATE);

  const previousInitialGenericTemplate = usePrevious(props.genericTemplate);

  const customEventHandlers = ({
    getState,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action);
      const state = getState() as GenericTemplateSubmissionState;
      switch (action.type) {
        case 'ITEM_WITH_QUESTIONARY_MODIFIED':
          props.genericTemplateUpdated?.({
            ...state.genericTemplate,
            ...action.itemWithQuestionary,
          });
          break;
        case 'ITEM_WITH_QUESTIONARY_CREATED':
          props.genericTemplateCreated?.(state.genericTemplate);
          break;
        case 'ITEM_WITH_QUESTIONARY_SUBMITTED':
          props.genericTemplateEditDone?.();
          break;
      }
    };
  };

  const initialState = new GenericTemplateSubmissionState(
    props.genericTemplate,
    0,
    false,
    def.wizardStepFactory.getWizardSteps(
      props.genericTemplate.questionary.steps
    )
  );

  const { state, dispatch } =
    QuestionarySubmissionModel<GenericTemplateSubmissionState>(initialState, [
      eventHandlers,
      customEventHandlers,
    ]);

  useEffect(() => {
    const isComponentMountedForTheFirstTime =
      previousInitialGenericTemplate === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: 'ITEM_WITH_QUESTIONARY_LOADED',
        itemWithQuestionary: props.genericTemplate,
      });
      dispatch({
        type: 'STEPS_LOADED',
        steps: props.genericTemplate.questionary.steps,
      });
    }
  }, [previousInitialGenericTemplate, props.genericTemplate, dispatch]);

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <Questionary
        title={state.genericTemplate.title || props.title}
        displayElementFactory={def.displayElementFactory}
      />
    </QuestionaryContext.Provider>
  );
}
