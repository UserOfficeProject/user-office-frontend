import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';

import FormikDropdown from 'components/common/FormikDropdown';
import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import Participants from 'components/proposal/ProposalParticipants';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import { VisitationContextType } from 'components/visitation/VisitationContainer';
import { BasicUserDetails } from 'generated/sdk';
import { useInstrumentsData } from 'hooks/instrument/useInstrumentsData';
import { useUserProposals } from 'hooks/proposal/useUserProposals';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { EventType } from 'models/QuestionarySubmissionState';
import { VisitationSubmissionState } from 'models/VisitationSubmissionState';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1, 0),
  },
}));

function QuestionaryComponentVisitationBasis(props: BasicComponentProps) {
  const { answer, formikProps } = props;
  const classes = useStyles();

  const { instruments, loadingInstruments } = useInstrumentsData();
  const { proposals, loadingProposals } = useUserProposals();

  const { dispatch, state } = useContext(
    QuestionaryContext
  ) as VisitationContextType;

  const questionId = answer.question.id;

  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  return (
    <>
      <FormikDropdown
        name={`${questionId}.instrumentId`}
        label="Instrument"
        loading={loadingInstruments}
        noOptionsText="No instruments"
        items={instruments.map((instrument) => ({
          text: instrument.name,
          value: instrument.id,
        }))}
        InputProps={{ 'data-cy': 'instrument' }}
        onChange={(event) => {
          dispatch({
            type: EventType.VISITATION_MODIFIED,
            payload: {
              visitation: {
                ...state.visitation,
                instrumentId: event.target.value,
              },
            },
          });
        }}
        required
      />
      <FormikDropdown
        name={`${questionId}.proposalId`}
        label="Proposal"
        loading={loadingProposals}
        noOptionsText="No proposals"
        items={proposals.map((proposal) => ({
          text: proposal.title,
          value: proposal.id,
        }))}
        InputProps={{ 'data-cy': 'proposal' }}
        onChange={(event) => {
          dispatch({
            type: EventType.VISITATION_MODIFIED,
            payload: {
              visitation: {
                ...state.visitation,
                proposalId: event.target.value,
              },
            },
          });
        }}
        required
      />

      <Participants
        title="Add additional visitors"
        className={classes.container}
        setUsers={(team: BasicUserDetails[]) => {
          formikProps.setFieldValue(
            `${questionId}.team`,
            team.map((user) => user.id)
          );
          dispatch({
            type: EventType.VISITATION_MODIFIED,
            payload: { visitation: { ...state.visitation, team } },
          });
        }}
        users={JSON.parse(JSON.stringify(state.visitation.team))}
      />
    </>
  );
}

const visitationBasisPreSubmit = () => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  const visitation = (state as VisitationSubmissionState).visitation;
  const { instrumentId, proposalId, team } = visitation;
  let returnValue = state.questionaryId;
  if (visitation.id > 0) {
    const result = await api.updateVisitation({
      visitationId: visitation.id,
      instrumentId: visitation.instrumentId,
      proposalId: visitation.proposalId,
      team: visitation.team.map((user) => user.id),
    });

    if (result.updateVisitation.visitation) {
      dispatch({
        type: EventType.VISITATION_MODIFIED,
        payload: {
          visitation: { ...visitation, ...result.updateVisitation.visitation },
        },
      });
    }
  } else {
    const result = await api.createVisitation({
      proposalId: proposalId,
      instrumentId: instrumentId,
      team: team.map((user) => user.id),
    });

    const newVisitation = result.createVisitation.visitation;
    if (newVisitation) {
      dispatch({
        type: EventType.VISITATION_CREATED,
        payload: {
          visitation: newVisitation,
        },
      });
      returnValue = newVisitation.questionaryId;
    }
  }

  return returnValue;
};

export { QuestionaryComponentVisitationBasis, visitationBasisPreSubmit };
