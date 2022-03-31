import makeStyles from '@mui/styles/makeStyles';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import React, { ChangeEvent, useContext, useState } from 'react';

import ErrorMessage from 'components/common/ErrorMessage';
import withPreventSubmit from 'components/common/withPreventSubmit';
import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import InviteParticipantsList from 'components/proposal/InviteParticipantsList';
import { ProposalContextType } from 'components/proposal/ProposalContainer';
import ProposalParticipant from 'components/proposal/ProposalParticipant';
import Participants from 'components/proposal/ProposalParticipants';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import { BasicUserDetails, EmailInviteInput } from 'generated/sdk';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { ProposalSubmissionState } from 'models/questionary/proposal/ProposalSubmissionState';

const TextFieldNoSubmit = withPreventSubmit(TextField);

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, 0),
  },
}));

function QuestionaryComponentProposalBasis(props: BasicComponentProps) {
  const {
    answer: {
      question: { id },
    },
    formikProps,
  } = props;

  const classes = useStyles();
  const { state, dispatch } = useContext(
    QuestionaryContext
  ) as ProposalContextType;

  const [localTitle, setLocalTitle] = useState(state?.proposal.title);
  const [localAbstract, setLocalAbstract] = useState(state?.proposal.abstract);

  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  const { proposer, users } = state.proposal;

  const handleUsersChanged = (users: BasicUserDetails[]) => {
    formikProps.setFieldValue(
      `${id}.users`,
      users.map((user) => user.id)
    );
    dispatch({
      type: 'ITEM_WITH_QUESTIONARY_MODIFIED',
      itemWithQuestionary: { users: users },
    });
  };

  const handleEmailInviteAdded = async (userInvite: EmailInviteInput) => {
    formikProps.setFieldValue(`${id}.userInvites`, userInvite);
    dispatch({
      type: 'USER_INVITE_ADDED',
      invite: userInvite,
    });
  };

  const handlePIChanged = (user: BasicUserDetails) => {
    formikProps.setFieldValue(`${id}.proposer`, user.id);
    dispatch({
      type: 'ITEM_WITH_QUESTIONARY_MODIFIED',
      itemWithQuestionary: {
        proposer: user,
        users: users.concat(proposer as BasicUserDetails),
      },
    });
  };

  return (
    <>
      <div className={classes.container}>
        <Field
          name={`${id}.title`}
          label="Title"
          inputProps={{
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setLocalTitle(event.target.value),
            onBlur: () => {
              dispatch({
                type: 'ITEM_WITH_QUESTIONARY_MODIFIED',
                itemWithQuestionary: { title: localTitle },
              });
            },
          }}
          required
          fullWidth
          component={TextField}
          data-cy="title"
          margin="dense"
          id="title-input"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Field
          name={`${id}.abstract`}
          label="Abstract"
          inputProps={{
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setLocalAbstract(event.target.value),
            onBlur: () => {
              dispatch({
                type: 'ITEM_WITH_QUESTIONARY_MODIFIED',
                itemWithQuestionary: { abstract: localAbstract },
              });
            },
          }}
          required
          multiline
          maxRows="16"
          minRows="4"
          fullWidth
          component={TextFieldNoSubmit}
          data-cy="abstract"
          margin="dense"
          id="abstract-input"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <ProposalParticipant
        userChanged={handlePIChanged}
        className={classes.container}
        userId={proposer?.id}
      />
      {state.userInvites.length > 0 && (
        <InviteParticipantsList
          data={state.userInvites}
          onDelete={(invite: EmailInviteInput) =>
            dispatch({ type: 'USER_INVITES_REMOVED', invites: [invite] })
          }
        />
      )}
      <Participants
        title="Co-Proposers"
        className={classes.container}
        setUsers={(users) => handleUsersChanged(users)}
        preserveSelf={true}
        // QuickFix for material table changing immutable state
        // https://github.com/mbrn/material-table/issues/666
        users={JSON.parse(JSON.stringify(users))}
        principalInvestigator={proposer?.id}
        onEmailInvite={handleEmailInviteAdded}
      />

      <ErrorMessage name={`${id}.users`} />
    </>
  );
}

const proposalBasisPreSubmit =
  () =>
  async ({ api, dispatch, state }: SubmitActionDependencyContainer) => {
    const proposalSubmissionState = state as ProposalSubmissionState;
    const proposal = proposalSubmissionState.proposal;
    const { primaryKey, title, abstract, proposer, callId } = proposal;
    let { users } = proposal;

    let returnValue = state.questionary.questionaryId;

    const userInvites = proposalSubmissionState.userInvites;
    const hasInvites = userInvites.length > 0;

    if (hasInvites) {
      const { createUsersByEmailInvite } = await api.createUsersByEmailInvite({
        emailInvites: userInvites,
      });
      const invitedUsers = createUsersByEmailInvite.users;
      if (invitedUsers) {
        users = [...users, ...invitedUsers];
        dispatch({
          type: 'ITEM_WITH_QUESTIONARY_MODIFIED',
          itemWithQuestionary: { users },
        });
        dispatch({
          type: 'USER_INVITES_REMOVED',
          invites: userInvites,
        });
      } else {
        throw new Error('User invites failed');
      }
    }

    if (primaryKey > 0) {
      const result = await api.updateProposal({
        proposalPk: primaryKey,
        title: title,
        abstract: abstract,
        users: users.map((user) => user.id),
        proposerId: proposer?.id,
      });

      if (result.updateProposal.proposal) {
        dispatch({
          type: 'ITEM_WITH_QUESTIONARY_LOADED',
          itemWithQuestionary: {
            ...proposal,
            ...result.updateProposal.proposal,
          },
        });
      }
    } else {
      const createResult = await api.createProposal({
        callId: callId,
      });

      if (createResult.createProposal.proposal) {
        const updateResult = await api.updateProposal({
          proposalPk: createResult.createProposal.proposal.primaryKey,
          title: title,
          abstract: abstract,
          users: users.map((user) => user.id),
          proposerId: proposer?.id,
        });
        dispatch({
          type: 'ITEM_WITH_QUESTIONARY_CREATED',
          itemWithQuestionary: {
            ...proposal,
            ...createResult.createProposal.proposal,
            ...updateResult.updateProposal.proposal,
          },
        });
        returnValue = createResult.createProposal.proposal.questionaryId;
      }
    }

    return returnValue;
  };

export { QuestionaryComponentProposalBasis, proposalBasisPreSubmit };
