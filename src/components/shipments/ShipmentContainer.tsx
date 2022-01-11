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
import { ShipmentCore } from 'models/questionary/shipment/ShipmentCore';
import { ShipmentSubmissionState } from 'models/questionary/shipment/ShipmentSubmissionState';
import { ShipmentWithQuestionary } from 'models/questionary/shipment/ShipmentWithQuestionary';
import useEventHandlers from 'models/questionary/useEventHandlers';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';

export interface ShipmentContextType extends QuestionaryContextType {
  state: ShipmentSubmissionState | null;
}

export default function ShipmentContainer(props: {
  shipment: ShipmentWithQuestionary;
  onShipmentSubmitted?: (shipment: ShipmentCore) => void;
}) {
  const { eventHandlers } = useEventHandlers(TemplateGroupId.SHIPMENT);

  const previousInitialShipment = usePrevious(props.shipment);

  const def = getQuestionaryDefinition(TemplateGroupId.SHIPMENT);

  const customEventHandlers = ({
    getState,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action); // first update state/model
      const state = getState() as ShipmentSubmissionState;
      switch (action.type) {
        case 'ITEM_WITH_QUESTIONARY_SUBMITTED':
          props.onShipmentSubmitted?.(state.shipment);
          break;
      }
    };
  };
  const initialState = new ShipmentSubmissionState(
    props.shipment,
    0,
    false,
    def.wizardStepFactory.getWizardSteps(props.shipment.questionary.steps)
  );
  const { state, dispatch } =
    QuestionarySubmissionModel<ShipmentSubmissionState>(initialState, [
      eventHandlers,
      customEventHandlers,
    ]);

  useEffect(() => {
    const isComponentMountedForTheFirstTime =
      previousInitialShipment === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: 'ITEM_WITH_QUESTIONARY_LOADED',
        itemWithQuestionary: props.shipment,
      });
      dispatch({
        type: 'STEPS_LOADED',
        steps: props.shipment.questionary.steps,
      });
    }
  }, [previousInitialShipment, props.shipment, dispatch]);

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <Questionary
        title={state.shipment.title || 'New Shipment'}
        info={state.shipment.status}
        displayElementFactory={def.displayElementFactory}
      />
    </QuestionaryContext.Provider>
  );
}
