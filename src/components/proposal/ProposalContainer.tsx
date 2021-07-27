/* eslint-disable @typescript-eslint/no-use-before-define */
import { default as React, useEffect } from 'react';

import Questionary from 'components/questionary/Questionary';
import {
  QuestionaryContext,
  QuestionaryContextType,
} from 'components/questionary/QuestionaryContext';
import { getQuestionaryDefinition } from 'components/questionary/QuestionaryRegistry';
import {
  Proposal,
  QuestionaryStep,
  TemplateCategoryId,
  Questionary as QuestionarySdk,
} from 'generated/sdk';
import { usePrevious } from 'hooks/common/usePrevious';
import { usePersistProposalModel } from 'hooks/proposal/usePersistProposalModel';
import {
  ProposalSubmissionState,
  ProposalSubsetSubmission,
} from 'models/ProposalSubmissionState';
import {
  Event,
  QuestionarySubmissionModel,
  QuestionarySubmissionState,
  WizardStep,
} from 'models/QuestionarySubmissionState';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { MiddlewareInputParams } from 'utils/useReducerWithMiddleWares';
import { FunctionType } from 'utils/utilTypes';

export interface ProposalContextType extends QuestionaryContextType {
  state: ProposalSubmissionState | null;
}

const proposalReducer = (
  state: ProposalSubmissionState,
  draftState: ProposalSubmissionState,
  action: Event
) => {
  switch (action.type) {
    case 'PROPOSAL_CREATED':
    case 'PROPOSAL_LOADED':
      const proposal = action.proposal;
      draftState.isDirty = false;
      draftState.setItemWithQuestionary(proposal);
      break;
    case 'PROPOSAL_MODIFIED':
      draftState.setItemWithQuestionary({
        ...draftState.getItemWithQuestionary(),
        ...action.proposal,
      });
      draftState.isDirty = true;
      break;
    case 'STEPS_LOADED': {
      if (draftState.proposal.questionary) {
        draftState.proposal.questionary.steps = action.steps;
      }
      break;
    }
    case 'STEP_ANSWERED':
      const updatedStep = action.step;
      if (draftState.proposal.questionary) {
        const stepIndex = draftState.proposal.questionary.steps.findIndex(
          (step) => step.topic.id === updatedStep.topic.id
        );
        draftState.proposal.questionary.steps[stepIndex] = updatedStep;
      }

      break;
  }

  return draftState;
};

const isProposalSubmitted = (proposal: Pick<Proposal, 'submitted'>) =>
  proposal.submitted;

function getProposalStatus(proposal: ProposalSubsetSubmission) {
  if (proposal.status != null) {
    return proposal.status?.shortCode.toString();
  } else {
    return 'Proposal Status is null';
  }
}

function isReadOnly(proposalToCheck: ProposalSubsetSubmission) {
  if (
    !proposalToCheck.submitted ||
    getProposalStatus(proposalToCheck) === 'EDITABLE_SUBMITTED' ||
    getProposalStatus(proposalToCheck) === 'DRAFT'
  ) {
    return false;
  } else {
    return true;
  }
}

const createQuestionaryWizardStep = (
  step: QuestionaryStep,
  index: number
): WizardStep => ({
  type: 'QuestionaryStep',
  payload: { topicId: step.topic.id, questionaryStepIndex: index },
  getMetadata: (state, payload) => {
    const proposalState = state as ProposalSubmissionState;
    const questionaryStep = state.getQuestionary().steps[
      payload.questionaryStepIndex
    ];

    return {
      title: questionaryStep.topic.title,
      isCompleted: questionaryStep.isCompleted,
      isReadonly: isReadOnly(proposalState.proposal),
    };
  },
});

const createReviewWizardStep = (): WizardStep => ({
  type: 'ProposalReview',
  getMetadata: (state) => {
    const proposalState = state as ProposalSubmissionState;
    const lastProposalStep = proposalState.getQuestionary().steps[
      state.getQuestionary().steps.length - 1
    ];

    return {
      title: 'Review',
      isCompleted: isProposalSubmitted(proposalState.proposal),
      isReadonly:
        isReadOnly(proposalState.proposal) &&
        lastProposalStep.isCompleted === true,
    };
  },
});

export default function ProposalContainer(props: {
  proposal: ProposalSubsetSubmission;
  proposalCreated?: (proposal: ProposalSubsetSubmission) => void;
  proposalUpdated?: (proposal: ProposalSubsetSubmission) => void;
}) {
  const { api } = useDataApiWithFeedback();
  const { persistModel: persistProposalModel } = usePersistProposalModel();
  const previousInitialProposal = usePrevious(props.proposal);

  const def = getQuestionaryDefinition(TemplateCategoryId.PROPOSAL_QUESTIONARY);

  const createProposalWizardSteps = (): WizardStep[] => {
    const wizardSteps: WizardStep[] = [];
    const questionarySteps = props.proposal.questionary?.steps;

    questionarySteps?.forEach((step, index) =>
      wizardSteps.push(createQuestionaryWizardStep(step, index))
    );

    wizardSteps.push(createReviewWizardStep());

    return wizardSteps;
  };

  /**
   * Returns true if reset was performed, false otherwise
   */
  const handleReset = async (): Promise<boolean> => {
    const proposalState = state as ProposalSubmissionState;
    if (proposalState.proposal.primaryKey === 0) {
      // if proposal is not created yet
      dispatch({
        type: 'PROPOSAL_LOADED',
        proposal: initialState.proposal,
      });
    } else {
      await api()
        .getProposal({ primaryKey: proposalState.proposal.primaryKey }) // or load blankQuestionarySteps if sample is null
        .then((data) => {
          if (data.proposal && data.proposal.questionary?.steps) {
            dispatch({
              type: 'PROPOSAL_LOADED',
              proposal: data.proposal,
            });
            dispatch({
              type: 'STEPS_LOADED',
              steps: data.proposal.questionary.steps,
              stepIndex: state.stepIndex,
            });
          }
        });
    }

    return true;
  };

  const handleEvents = ({
    getState,
    dispatch,
  }: MiddlewareInputParams<QuestionarySubmissionState, Event>) => {
    return (next: FunctionType) => async (action: Event) => {
      next(action); // first update state/model
      const state = getState() as ProposalSubmissionState;
      switch (action.type) {
        case 'PROPOSAL_MODIFIED':
          props.proposalUpdated?.({ ...state.proposal, ...action.proposal });
          break;
        case 'PROPOSAL_CREATED':
          props.proposalCreated?.(action.proposal);
          break;
        case 'BACK_CLICKED':
          if (!state.isDirty || (await handleReset())) {
            dispatch({ type: 'GO_STEP_BACK' });
          }
          break;

        case 'RESET_CLICKED':
          handleReset();
          break;
      }
    };
  };
  const initialState: ProposalSubmissionState = {
    proposal: props.proposal,
    isDirty: false,
    stepIndex: 0,
    wizardSteps: createProposalWizardSteps(),
    getItemWithQuestionary() {
      return this.proposal;
    },
    setItemWithQuestionary(item: { questionary: QuestionarySdk }) {
      this.proposal = { ...this.proposal, ...item };
    },

    getQuestionary() {
      return this.proposal.questionary;
    },
  };

  const {
    state,
    dispatch,
  } = QuestionarySubmissionModel<ProposalSubmissionState>(
    initialState,
    [handleEvents, persistProposalModel],
    proposalReducer
  );

  useEffect(() => {
    const isComponentMountedForTheFirstTime =
      previousInitialProposal === undefined;
    if (isComponentMountedForTheFirstTime) {
      dispatch({
        type: 'PROPOSAL_LOADED',
        proposal: props.proposal,
      });
      if (props.proposal.questionary) {
        dispatch({
          type: 'STEPS_LOADED',
          steps: props.proposal.questionary.steps,
        });
      }
    }
  }, [previousInitialProposal, props.proposal, dispatch]);

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <ContentContainer maxWidth="md">
        <StyledPaper>
          <Questionary
            title={state.proposal.title || 'New Proposal'}
            info={
              state.proposal.proposalId
                ? `Proposal ID: ${state.proposal.proposalId}`
                : 'DRAFT'
            }
            handleReset={handleReset}
            displayElementFactory={def.displayElementFactory}
          />
        </StyledPaper>
      </ContentContainer>
    </QuestionaryContext.Provider>
  );
}
