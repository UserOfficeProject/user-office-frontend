import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';

import { useCheckAccess } from 'components/common/Can';
import { NavigButton } from 'components/common/NavigButton';
import NavigationFragment from 'components/questionary/NavigationFragment';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import ProposalQuestionaryReview from 'components/review/ProposalQuestionaryReview';
import { UserRole } from 'generated/sdk';
import { useDownloadPDFProposal } from 'hooks/proposal/useDownloadPDFProposal';
import {
  ProposalSubmissionState,
  ProposalSubsetSubmission,
} from 'models/ProposalSubmissionState';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

import { ProposalContextType } from './ProposalContainer';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.7,
  },
  button: {
    marginTop: ({ proposal }: { proposal: ProposalSubsetSubmission }) =>
      proposal.status?.id === 0 ? '40px' : 'auto',
    marginLeft: '10px',
    backgroundColor: theme.palette.secondary.main,
    color: '#ffff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

type ProposalSummaryProps = {
  data: ProposalSubmissionState;
  readonly: boolean;
  confirm: WithConfirmType;
};

function ProposalReview({ readonly, confirm }: ProposalSummaryProps) {
  const { state, dispatch } = useContext(
    QuestionaryContext
  ) as ProposalContextType;

  if (!dispatch || !state) {
    throw new Error(createMissingContextErrorMessage());
  }

  const isUserOfficer = useCheckAccess([UserRole.USER_OFFICER]);
  const isCallActive = state.proposal?.call?.isActive ?? true;

  const proposal = state.proposal;

  const downloadPDFProposal = useDownloadPDFProposal();

  const allStepsComplete =
    proposal.questionary &&
    proposal.questionary.steps.every((step) => step.isCompleted);

  const classes = useStyles({ proposal });

  const submitDisabled =
    (!isUserOfficer && !isCallActive) || // disallow submit for non user officers if the call ended
    !allStepsComplete ||
    proposal.submitted;

  return (
    <>
      <ProposalQuestionaryReview
        data={proposal}
        className={readonly ? classes.disabled : undefined}
      />
      <div className={classes.buttons}>
        <NavigationFragment disabled={proposal.status?.id === 0}>
          <NavigButton
            onClick={() => {
              confirm(
                () => {
                  dispatch({
                    type: 'PROPOSAL_SUBMIT_CLICKED',
                    proposalPk: proposal.primaryKey,
                  });
                },
                {
                  title: 'Please confirm',
                  description:
                    'I am aware that no further edits can be done after proposal submission.',
                }
              )();
            }}
            disabled={submitDisabled}
            variant="contained"
            color="primary"
          >
            {proposal.submitted ? '✔ Submitted' : 'Submit'}
          </NavigButton>
          <Button
            onClick={() =>
              downloadPDFProposal([proposal.primaryKey], proposal.title)
            }
            disabled={!allStepsComplete}
            className={classes.button}
            variant="contained"
          >
            Download PDF
          </Button>
        </NavigationFragment>
      </div>
    </>
  );
}

export default withConfirm(ProposalReview);
