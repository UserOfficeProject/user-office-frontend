/* eslint-disable @typescript-eslint/no-use-before-define */
import { Typography } from '@material-ui/core';
import { default as React, useEffect } from 'react';

import Questionary from 'components/questionary/Questionary';
import {
  QuestionaryContext,
  QuestionaryContextType,
} from 'components/questionary/QuestionaryContext';
import { getQuestionaryDefinition } from 'components/questionary/QuestionaryRegistry';
import { TemplateGroupId } from 'generated/sdk';
import { usePrevious } from 'hooks/common/usePrevious';
import { ProposalSubmissionState } from 'models/questionary/proposal/ProposalSubmissionState';
import { ProposalWithQuestionary } from 'models/questionary/proposal/ProposalWithQuestionary';
import {
  QuestionarySubmissionState,
  QuestionarySubmissionModel,
  Event,
} from 'models/questionary/QuestionarySubmissionState';
import useEventHandlers from 'models/questionary/useEventHandlers';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';

export interface ProposalContextType extends QuestionaryContextType {
  state: ProposalSubmissionState | null;
}

export default function ProposalContainer(props: {
  proposal: ProposalWithQuestionary;
  proposalUpdated?: (proposal: ProposalWithQuestionary) => void;
}) {
  const { eventHandlers } = useEventHandlers(TemplateGroupId.PROPOSAL);
  const previousInitialProposal = usePrevious(props.proposal);

  const def = getQuestionaryDefinition(TemplateGroupId.PROPOSAL);

  const customEventHandlers = ({
    getState,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action); // first update state/model
      const state = getState() as ProposalSubmissionState;
      switch (action.type) {
        case 'ITEM_WITH_QUESTIONARY_MODIFIED':
          props.proposalUpdated?.({
            ...state.proposal,
            ...action.itemWithQuestionary,
          });
          break;
      }
    };
  };
  const initialState = new ProposalSubmissionState(
    props.proposal,
    0,
    false,
    def.wizardStepFactory.getWizardSteps(props.proposal.questionary.steps)
  );

  const { state, dispatch } =
    QuestionarySubmissionModel<ProposalSubmissionState>(initialState, [
      eventHandlers,
      customEventHandlers,
    ]);

  useEffect(() => {
    const isComponentMountedForTheFirstTime =
      previousInitialProposal === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: 'ITEM_WITH_QUESTIONARY_LOADED',
        itemWithQuestionary: props.proposal,
      });
      if (props.proposal.questionary) {
        dispatch({
          type: 'STEPS_LOADED',
          steps: props.proposal.questionary.steps,
        });
      }
    }
  }, [previousInitialProposal, props.proposal, dispatch]);

  const hasReferenceNumberFormat = !!state.proposal.call?.referenceNumberFormat;

  const { submitted, proposalId } = state.proposal;

  let info: JSX.Element | string = proposalId || 'DRAFT';

  if (!submitted && hasReferenceNumberFormat && proposalId) {
    info = (
      <Typography>
        {proposalId} <br /> <small>Pre-submission reference</small>
      </Typography>
    );
  }

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <ContentContainer maxWidth="md">
        <StyledPaper>
          <Questionary
            title={state.proposal.title || 'New Proposal'}
            info={info}
            displayElementFactory={def.displayElementFactory}
          />
        </StyledPaper>
      </ContentContainer>
    </QuestionaryContext.Provider>
  );
}
