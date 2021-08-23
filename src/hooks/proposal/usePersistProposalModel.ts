import { ProposalSubmissionState } from 'models/questionary/proposal/ProposalSubmissionState';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';

import {
  Event,
  QuestionarySubmissionState,
} from '../../models/questionary/QuestionarySubmissionState';

export function usePersistProposalModel() {
  const { api, isExecutingCall } = useDataApiWithFeedback();

  const persistModel = ({
    getState,
    dispatch,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action);
      switch (action.type) {
        case 'PROPOSAL_SUBMIT_CLICKED': {
          api('Saved')
            .submitProposal({
              proposalPk: action.proposalPk,
            })
            .then((result) => {
              const state = getState() as ProposalSubmissionState;
              dispatch({
                type: 'PROPOSAL_LOADED',
                proposal: {
                  ...state.proposal,
                  ...result.submitProposal.proposal,
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
