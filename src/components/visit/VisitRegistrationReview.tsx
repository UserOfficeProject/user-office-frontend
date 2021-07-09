import { Link, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';

import { NavigButton } from 'components/common/NavigButton';
import UOLoader from 'components/common/UOLoader';
import NavigationFragment from 'components/questionary/NavigationFragment';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import QuestionaryDetails, {
  TableRowData,
} from 'components/questionary/QuestionaryDetails';
import { VisitStatus } from 'generated/sdk';
import { useProposalData } from 'hooks/proposal/useProposalData';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { FunctionType } from 'utils/utilTypes';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

import { VisitRegistrationContextType } from './VisitRegistrationContainer';

type VisitRegistrationReviewProps = {
  onComplete?: FunctionType<void>;
  confirm: WithConfirmType;
};

const useStyles = makeStyles(() => ({
  teamMemberList: {
    listStyle: 'none',
    padding: 0,
  },
}));

function VisitRegistrationReview({ confirm }: VisitRegistrationReviewProps) {
  const { api, isExecutingCall } = useDataApiWithFeedback();
  const { state, dispatch } = useContext(
    QuestionaryContext
  ) as VisitRegistrationContextType;
  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  const { proposalData } = useProposalData(state.visit.proposalPk);
  const classes = useStyles();

  if (!proposalData) {
    return <UOLoader />;
  }

  const additionalDetails: TableRowData[] = [
    { label: 'Status', value: state.visit.status },
    {
      label: 'Proposal',
      value: (
        <Link href={`/ProposalEdit/${proposalData.primaryKey}`}>
          {proposalData.title}
        </Link>
      ),
    },
    {
      label: 'Team',
      value: (
        <ul className={classes.teamMemberList}>
          {state.visit.userVisits.map(({ user }) => (
            <li key={user.id}>{`${user.firstname} ${user.lastname}`}</li>
          ))}
        </ul>
      ),
    },
  ];

  const isSubmitted = state.visit.status === VisitStatus.SUBMITTED;

  return (
    <div>
      <QuestionaryDetails
        questionaryId={state.visit.questionaryId}
        additionalDetails={additionalDetails}
        title="Visit information"
      />
      <NavigationFragment isLoading={isExecutingCall}>
        <NavigButton
          onClick={() =>
            confirm(
              async () => {
                const result = await api().updateVisit({
                  visitId: state.visit.id,
                  status: VisitStatus.SUBMITTED,
                });
                if (!result.updateVisit.visit) {
                  return;
                }
                dispatch({
                  type: 'VISIT_MODIFIED',
                  visit: result.updateVisit.visit,
                });
              },
              {
                title: 'Confirmation',
                description:
                  'I am aware that no further edits can be done after visit submission.',
              }
            )()
          }
          disabled={isSubmitted}
          variant="contained"
          color="primary"
        >
          {isSubmitted ? '✔ Submitted' : 'Submit'}
        </NavigButton>
      </NavigationFragment>
    </div>
  );
}

export default withConfirm(VisitRegistrationReview);
