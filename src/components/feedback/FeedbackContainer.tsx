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
import { FeedbackSubmissionState } from 'models/questionary/feedback/FeedbackSubmissionState';
import { FeedbackWithQuestionary } from 'models/questionary/feedback/FeedbackWithQuestionary';
import { QuestionarySubmissionModel } from 'models/questionary/QuestionarySubmissionState';
import useEventHandlers from 'models/questionary/useEventHandlers';
export interface FeedbackContextType extends QuestionaryContextType {
  state: FeedbackSubmissionState | null;
}

export interface FeedbackContainerProps {
  feedback: FeedbackWithQuestionary;
}
export default function FeedbackContainer(props: FeedbackContainerProps) {
  const { eventHandlers } = useEventHandlers(TemplateGroupId.FEEDBACK);
  const def = getQuestionaryDefinition(TemplateGroupId.FEEDBACK);

  const previousInitialFeedback = usePrevious(props.feedback);

  const initialState = new FeedbackSubmissionState(
    props.feedback,
    0,
    false,
    def.wizardStepFactory.getWizardSteps(props.feedback.questionary.steps)
  );

  const { state, dispatch } =
    QuestionarySubmissionModel<FeedbackSubmissionState>(initialState, [
      eventHandlers,
    ]);

  useEffect(() => {
    const isComponentMountedForTheFirstTime =
      previousInitialFeedback === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: 'ITEM_WITH_QUESTIONARY_LOADED',
        itemWithQuestionary: props.feedback,
      });
      dispatch({
        type: 'STEPS_LOADED',
        steps: props.feedback.questionary!.steps,
      });
    }
  }, [previousInitialFeedback, props.feedback, dispatch]);

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <Questionary
        title={'Feedback to the facility'}
        displayElementFactory={def.displayElementFactory}
      />
    </QuestionaryContext.Provider>
  );
}
