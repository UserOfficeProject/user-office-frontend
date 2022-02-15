import { Checkbox, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';

import { useCheckAccess } from 'components/common/Can';
import { NavigButton } from 'components/common/NavigButton';
import UOLoader from 'components/common/UOLoader';
import NavigationFragment from 'components/questionary/NavigationFragment';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import ProposalQuestionaryReview from 'components/review/ProposalQuestionaryReview';
import { UserRole } from 'generated/sdk';
import { useDownloadPDFProposal } from 'hooks/proposal/useDownloadPDFProposal';
import { ProposalWithQuestionary } from 'models/questionary/proposal/ProposalWithQuestionary';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

import { ProposalContextType } from './ProposalContainer';

const useStyles = makeStyles(() => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: ({ proposal }: { proposal: ProposalWithQuestionary }) =>
      proposal.status?.id === 0 ? '40px' : 'auto',
    marginLeft: '10px',
  },
}));

type ProposalSummaryProps = {
  confirm: WithConfirmType;
};

function ProposalReview({ confirm }: ProposalSummaryProps) {
  const { state, dispatch } = useContext(
    QuestionaryContext
  ) as ProposalContextType;

  if (!dispatch || !state) {
    throw new Error(createMissingContextErrorMessage());
  }

  const { api } = useDataApiWithFeedback();
  const isUserOfficer = useCheckAccess([UserRole.USER_OFFICER]);
  const isCallActive = state.proposal?.call?.isActive ?? true;

  const [loadingSubmitMessage, setLoadingSubmitMessage] =
    useState<boolean>(true);
  const [submitButtonMessage, setSubmitButtonMessage] = useState<string>(
    'I am aware that no further edits can be made after proposal submission.'
  );

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

  // Show a different submit confirmation if
  // EDITABLE_SUBMITTED is an upcoming status
  useEffect(() => {
    async function initialiseSubmissionMessage() {
      if (!proposal.callId || submitDisabled) {
        setLoadingSubmitMessage(false);

        return;
      }
      const { call } = await api().getCall({ id: proposal.callId });
      const workflowId = call?.proposalWorkflowId;
      if (workflowId) {
        const connections = (
          await api().getProposalWorkflow({ id: workflowId })
        ).proposalWorkflow?.proposalWorkflowConnectionGroups;

        if (connections) {
          const statuses = (await api().getProposalStatuses()).proposalStatuses;
          const editableStatus = statuses?.find(
            (s) => s.name === 'EDITABLE_SUBMITTED'
          );

          const hasUpcomingEditableStatus =
            connections?.some((group) =>
              group.connections.find(
                (conn) => conn.nextProposalStatusId === editableStatus?.id
              )
            ) || false;

          if (proposal.status != null && hasUpcomingEditableStatus) {
            setSubmitButtonMessage(
              'Submit proposal? The proposal can be edited after submission.'.concat(
                call?.submissionMessage ? '\n' + call.submissionMessage : ''
              )
            );
          } else {
            setSubmitButtonMessage(
              'I am aware that no further edits can be made after proposal submission.'.concat(
                call?.submissionMessage ? '\n' + call.submissionMessage : ''
              )
            );
          }
        }
      }
      setLoadingSubmitMessage(false);
    }
    initialiseSubmissionMessage();
  }, [api, proposal.callId, proposal.status, submitDisabled]);

  if (loadingSubmitMessage) {
    return <UOLoader style={{ marginLeft: '50%', marginTop: '100px' }} />;
  }

  return (
    <>
      <ProposalQuestionaryReview data={proposal} />
      <div className={classes.buttons}>
        <NavigationFragment disabled={proposal.status?.id === 0}>
          {isUserOfficer && (
            <FormControlLabel
              control={
                <Checkbox
                  style={{ padding: '0 9px 0 0' }}
                  checked={proposal.submitted}
                  data-cy="checkbox-proposal-submitted"
                  onChange={(_e, checked) => {
                    api('Saved')
                      .updateProposal({
                        proposalPk: proposal.primaryKey,
                        submitted: checked,
                      })
                      .then(({ updateProposal }) => {
                        if (updateProposal.proposal) {
                          dispatch({
                            type: 'ITEM_WITH_QUESTIONARY_MODIFIED',
                            itemWithQuestionary: updateProposal.proposal,
                          });
                        }
                      });
                  }}
                  color="primary"
                />
              }
              label="Submitted"
            />
          )}

          <NavigButton
            onClick={() => dispatch({ type: 'BACK_CLICKED' })}
            disabled={state.stepIndex === 0}
          >
            Back
          </NavigButton>
          <NavigButton
            onClick={() => {
              confirm(
                async () => {
                  const result = await api().submitProposal({
                    proposalPk: state.proposal.primaryKey,
                  });
                  if (!result.submitProposal.proposal) {
                    return;
                  }
                  dispatch({
                    type: 'ITEM_WITH_QUESTIONARY_MODIFIED',
                    itemWithQuestionary: result.submitProposal.proposal,
                  });
                  dispatch({
                    type: 'ITEM_WITH_QUESTIONARY_SUBMITTED',
                    itemWithQuestionary: result.submitProposal.proposal,
                  });
                },
                {
                  title: 'Please confirm',
                  description: submitButtonMessage,
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
            color="secondary"
          >
            Download PDF
          </Button>
        </NavigationFragment>
      </div>
    </>
  );
}

export default withConfirm(ProposalReview);
