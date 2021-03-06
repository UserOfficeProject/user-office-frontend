import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';

import FormikDropdown from 'components/common/FormikDropdown';
import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import Participants from 'components/proposal/ProposalParticipants';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import { VisitContextType } from 'components/visit/VisitContainer';
import { BasicUserDetails, ProposalEndStatus } from 'generated/sdk';
import { useMyProposals } from 'hooks/proposal/useMyProposals';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { VisitSubmissionState } from 'models/VisitSubmissionState';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1, 0),
  },
}));

function QuestionaryComponentVisitBasis(props: BasicComponentProps) {
  const { answer, formikProps } = props;
  const classes = useStyles();

  const { proposals, loadingProposals } = useMyProposals({
    managementDecisionSubmitted: true,
    finalStatus: ProposalEndStatus.ACCEPTED,
  });

  const { dispatch, state } = useContext(
    QuestionaryContext
  ) as VisitContextType;

  const questionId = answer.question.id;

  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  return (
    <>
      <FormikDropdown
        name={`${questionId}.proposalPk`}
        label="Select proposal"
        loading={loadingProposals}
        noOptionsText="No proposals"
        items={proposals.map((proposal) => ({
          text: proposal.title,
          value: proposal.primaryKey,
        }))}
        InputProps={{ 'data-cy': 'proposal-selection' }}
        onChange={(event) => {
          dispatch({
            type: 'VISIT_MODIFIED',
            visit: {
              proposalPk: +event.target.value,
            },
          });
        }}
        required
      />

      <Participants
        title="Add More Visitors"
        className={classes.container}
        setUsers={(team: BasicUserDetails[]) => {
          formikProps.setFieldValue(
            `${questionId}.team`,
            team.map((user) => user.id)
          );
          dispatch({
            type: 'VISIT_MODIFIED',
            visit: { team },
          });
        }}
        users={JSON.parse(JSON.stringify(state.visit.team))}
      />
    </>
  );
}

const visitBasisPreSubmit = () => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  const visit = (state as VisitSubmissionState).visit;
  const { proposalPk, team } = visit;
  let returnValue = state.questionaryId;
  if (visit.id > 0) {
    const result = await api.updateVisit({
      visitId: visit.id,
      proposalPk: visit.proposalPk,
      team: visit.team.map((user) => user.id),
    });

    if (result.updateVisit.visit) {
      dispatch({
        type: 'VISIT_MODIFIED',
        visit: result.updateVisit.visit,
      });
    }
  } else {
    const result = await api.createVisit({
      proposalPk: proposalPk,
      team: team.map((user) => user.id),
    });

    const newVisit = result.createVisit.visit;
    if (newVisit) {
      dispatch({
        type: 'VISIT_CREATED',
        visit: newVisit,
      });
      returnValue = newVisit.questionaryId;
    }
  }

  return returnValue;
};

export { QuestionaryComponentVisitBasis, visitBasisPreSubmit };
