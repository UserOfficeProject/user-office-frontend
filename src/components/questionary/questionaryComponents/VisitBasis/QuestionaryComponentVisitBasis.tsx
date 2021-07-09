import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import { VisitRegistrationContextType } from 'components/visit/VisitRegistrationContainer';
import { ProposalEndStatus } from 'generated/sdk';
import { useMyProposals } from 'hooks/proposal/useMyProposals';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1, 0),
  },
}));

// TODO display dropdown with all visits and call an endpoint to create a questionary and
// update visit_has_users with the questionary id
function QuestionaryComponentVisitBasis(props: BasicComponentProps) {
  const { answer, formikProps } = props;
  const classes = useStyles();

  const { proposals, loadingProposals } = useMyProposals({
    managementDecisionSubmitted: true,
    finalStatus: ProposalEndStatus.ACCEPTED,
  });

  const { dispatch, state } = useContext(
    QuestionaryContext
  ) as VisitRegistrationContextType;

  const questionId = answer.question.id;

  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  return (
    <>
      {/* <FormikDropdown
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
      /> */}
    </>
  );
}

const visitBasisPreSubmit = () => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  // const visit = (state as VisitSubmissionState).visit;
  // const { proposalPk, team } = visit;
  // let returnValue = state.questionaryId;
  // if (visit.id > 0) {
  //   const result = await api.updateVisit({
  //     visitId: visit.id,
  //     proposalPk: visit.proposalPk,
  //     team: visit.team.map((user) => user.id),
  //   });
  //   if (result.updateVisit.visit) {
  //     dispatch({
  //       type: 'VISIT_MODIFIED',
  //       visit: result.updateVisit.visit,
  //     });
  //   }
  // } else {
  //   const result = await api.createVisit({
  //     proposalPk: proposalPk,
  //     team: team.map((user) => user.id),
  //     scheduledEventId: 0, // TODO fix this to use actual scheduled event id
  //   });
  //   const newVisit = result.createVisit.visit;
  //   if (newVisit) {
  //     dispatch({
  //       type: 'VISIT_CREATED',
  //       visit: newVisit,
  //     });
  //     returnValue = newVisit.questionaryId;
  //   }
  // }
  // return returnValue;
  return 0; // TODO return actual visit ID
};

export { QuestionaryComponentVisitBasis, visitBasisPreSubmit };
