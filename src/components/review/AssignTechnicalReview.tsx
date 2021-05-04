import { Button, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';

import { Proposal, UserRole } from 'generated/sdk';
import { useUsersData } from 'hooks/user/useUsersData';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

interface AssignTechnicalReviewProps {
  proposal: Proposal;
  onProposalUpdated: (proposal: Proposal) => void;
}

const useStyles = makeStyles((theme) => ({
  userList: {
    width: '300px',
    marginTop: theme.spacing(3),
    display: 'inline-block',
  },
  submitButton: {
    marginLeft: theme.spacing(2),
  },
}));
function AssignTechnicalReview({
  proposal,
  onProposalUpdated,
}: AssignTechnicalReviewProps) {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(
    proposal.technicalReviewAssignee
  );
  const { usersData } = useUsersData({
    userRole: UserRole.INSTRUMENT_SCIENTIST,
  });

  const { api } = useDataApiWithFeedback();

  if (!usersData) {
    return null;
  }

  return (
    <div>
      <Autocomplete
        id="user-list"
        options={usersData.users}
        renderInput={(params) => <TextField {...params} />}
        getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
        onChange={(_event, newValue) => {
          if (newValue) {
            setSelectedUser(newValue.id);
          }
        }}
        className={classes.userList}
        value={usersData.users.find((user) => user.id === selectedUser)}
        disableClearable
        data-cy="user-list"
      />
      <Button
        onClick={() => {
          if (selectedUser) {
            api()
              .updateTechnicalReviewAssignee({
                userId: selectedUser,
                proposalIds: [proposal.id],
              })
              .then((result) => {
                onProposalUpdated({
                  ...proposal,
                  ...result.updateTechnicalReviewAssignee.proposals[0],
                });
              });
          }
        }}
        type="button"
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        Assign
      </Button>
    </div>
  );
}

export default AssignTechnicalReview;
