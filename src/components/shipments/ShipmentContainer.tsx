/* eslint-disable @typescript-eslint/no-use-before-define */
import { default as React, useEffect } from 'react';

import Questionary from 'components/questionary/Questionary';
import {
  QuestionaryContext,
  QuestionaryContextType,
} from 'components/questionary/QuestionaryContext';
import QuestionaryStepView from 'components/questionary/QuestionaryStepView';
import { QuestionaryStep, ShipmentStatus } from 'generated/sdk';
import { usePrevious } from 'hooks/common/usePrevious';
import { usePersistQuestionaryModel } from 'hooks/questionary/usePersistQuestionaryModel';
import { usePersistShipmentModel } from 'hooks/shipment/usePersistShipmentModel';
import {
  Event,
  EventType,
  QuestionarySubmissionModel,
  QuestionarySubmissionState,
} from 'models/QuestionarySubmissionState';
import {
  ShipmentExtended,
  ShipmentSubmissionState,
} from 'models/ShipmentSubmissionState';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';

export interface ShipmentContextType extends QuestionaryContextType {
  state: ShipmentSubmissionState | null;
}

const shipmentReducer = (
  state: ShipmentSubmissionState,
  draftState: ShipmentSubmissionState,
  action: Event
) => {
  switch (action.type) {
    case EventType.SHIPMENT_CREATED:
    case EventType.SHIPMENT_LOADED:
      const shipment: ShipmentExtended = action.payload.shipment;
      draftState.isDirty = false;
      draftState.questionaryId = shipment.questionaryId;
      draftState.shipment = shipment;
      draftState.steps = shipment.questionary.steps;
      draftState.templateId = shipment.questionary.templateId;
      break;
    case EventType.SHIPMENT_MODIFIED:
      draftState.shipment = {
        ...draftState.shipment,
        ...action.payload.shipment,
      };
      draftState.isDirty = true;
      break;
    case EventType.QUESTIONARY_STEPS_LOADED: {
      draftState.shipment.questionary.steps = action.payload.questionarySteps;
      break;
    }
    case EventType.QUESTIONARY_STEP_ANSWERED: // THIS should be part of questionary reducer?
      const updatedStep = action.payload.questionaryStep as QuestionaryStep;
      const stepIndex = draftState.shipment.questionary.steps.findIndex(
        step => step.topic.id === updatedStep.topic.id
      );
      draftState.shipment.questionary.steps[stepIndex] = updatedStep;

      break;
  }

  return draftState;
};

export default function ShipmentContainer(props: {
  shipment: ShipmentExtended;
  done?: (shipment: ShipmentExtended) => any;
}) {
  const { api, isExecutingCall: isApiInteracting } = useDataApiWithFeedback();
  const { persistModel, isSavingModel } = usePersistQuestionaryModel();
  const {
    persistModel: persistShipmentModel,
    isSavingModel: isSavingShipmentModel,
  } = usePersistShipmentModel();
  const previousInitialShipment = usePrevious(props.shipment);

  /**
   * Returns true if reset was performed, false otherwise
   */
  const handleReset = async (): Promise<boolean> => {
    if (state.isDirty) {
      const confirmed = true; // TODO add confirm back; window.confirm(getConfirmNavigMsg());
      const shipmentState = state as ShipmentSubmissionState;
      if (confirmed) {
        if (shipmentState.shipment.id === 0) {
          // if shipment is not created yet
          dispatch({
            type: EventType.SHIPMENT_LOADED,
            payload: { shipment: initialState.shipment },
          });
        } else {
          await api()
            .getShipment({ shipmentId: shipmentState.shipment.id }) // or load blankQuestionarySteps if sample is null
            .then(data => {
              if (data.shipment && data.shipment.questionary.steps) {
                dispatch({
                  type: EventType.SHIPMENT_LOADED,
                  payload: { proposal: data.shipment },
                });
                dispatch({
                  type: EventType.QUESTIONARY_STEPS_LOADED,
                  payload: {
                    questionarySteps: data.shipment.questionary.steps,
                    stepIndex: state.stepIndex,
                  },
                });
              }
            });
        }

        return true;
      } else {
        return false;
      }
    }

    return false;
  };

  const handleEvents = ({
    getState,
    dispatch,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: Function) => async (action: Event) => {
      next(action); // first update state/model
      const state = getState() as ShipmentSubmissionState;
      switch (action.type) {
        case EventType.SHIPMENT_DONE:
          props.done?.(action.payload.shipment);
          break;
        case EventType.BACK_CLICKED: // move this
          if (!state.isDirty || (await handleReset())) {
            dispatch({ type: EventType.GO_STEP_BACK });
          }
          break;

        case EventType.RESET_CLICKED:
          handleReset();
          break;
      }
    };
  };
  const initialState: ShipmentSubmissionState = {
    shipment: props.shipment,
    templateId: props.shipment.questionary.templateId,
    isDirty: false,
    questionaryId: props.shipment.questionary.questionaryId,
    stepIndex: 0,
    steps: props.shipment.questionary.steps,
    stepMetadata: props.shipment.questionary.steps.map(step => ({
      title: step.topic.title,
      isCompleted: step.isCompleted,
      isEnabled: true,
      payload: { topicId: step.topic.id },
    })),
  };

  const { state, dispatch } = QuestionarySubmissionModel<
    ShipmentSubmissionState
  >(
    initialState,
    [handleEvents, persistModel, persistShipmentModel],
    shipmentReducer
  );

  const isSubmitted = state.shipment.status === ShipmentStatus.SUBMITTED;

  useEffect(() => {
    const isComponentMountedForTheFirstTime =
      previousInitialShipment === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: EventType.SHIPMENT_LOADED,
        payload: { shipment: props.shipment },
      });
      dispatch({
        type: EventType.QUESTIONARY_STEPS_LOADED,
        payload: { questionarySteps: props.shipment.questionary.steps },
      });
    }
  }, [previousInitialShipment, props.shipment, dispatch]);

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <Questionary
        title={state.shipment.title || 'New Shipment'}
        info={state.shipment.status}
        handleReset={handleReset}
        displayElementFactory={metadata => (
          <QuestionaryStepView
            state={state}
            dispatch={dispatch}
            readonly={metadata.isEnabled}
            topicId={metadata.payload.topicId}
          />
        )}
      />
    </QuestionaryContext.Provider>
  );
}

{
  /* <Step key="review">
<QuestionaryStepButton
  onClick={async () => {
    dispatch({
      type: EventType.GO_TO_STEP,
      payload: { stepIndex: state.steps.length },
    });
  }}
  completed={isSubmitted}
  editable={allStepsComplete(state.shipment.questionary)}
>
  <span>Review</span>
</QuestionaryStepButton>
</Step> 



if (state.stepIndex === getReviewStepIndex(state)) {
      return (
        <div>
          <QuestionaryDetails questionaryId={state.shipment.questionaryId} />
          <div>
            <NavigationFragment
              back={undefined}
              saveAndNext={{
                callback: () =>
                  dispatch({
                    type: EventType.SHIPMENT_DONE,
                    payload: { shipment: state.shipment },
                  }),
                label: 'Finish',
              }}
              isLoading={false}
            />
          </div>
        </div>
      );
    }
*/
}
