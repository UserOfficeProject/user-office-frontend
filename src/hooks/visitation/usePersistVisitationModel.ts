import { VisitationStatus } from 'generated/sdk';
import { VisitationSubmissionState } from 'models/VisitationSubmissionState';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';

import { Event, EventType } from '../../models/QuestionarySubmissionState';

export function usePersistVisitationModel() {
  const { api, isExecutingCall } = useDataApiWithFeedback();

  const persistModel = ({
    getState,
    dispatch,
  }: MiddlewareInputParams<VisitationSubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action);
      switch (action.type) {
        case EventType.VISITATION_SUBMIT_CLICKED: {
          api('Saved')
            .updateVisitation({
              visitationId: getState().visitation.id,
              status: VisitationStatus.SUBMITTED,
            })
            .then((result) => {
              const state = getState();
              dispatch({
                type: EventType.VISITATION_LOADED,
                payload: {
                  visitation: {
                    ...state.visitation,
                    ...result.updateVisitation.visitation,
                  },
                },
              });
            });
          break;
        }
      }
    };
  };

  return { isSavingModel: isExecutingCall, persistModel };
}
