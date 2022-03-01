import Edit from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { BasicUserDetails } from 'generated/sdk';
import { StyledContainer, StyledPaper } from 'styles/StyledComponents';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

import PeopleTable from './PeopleTable';

export default function PeoplePage() {
  const [userData, setUserData] = useState<BasicUserDetails | null>(null);
  const { api } = useDataApiWithFeedback();
  const history = useHistory();

  if (userData) {
    setTimeout(() => {
      history.push(`/PeoplePage/${userData.id}`);
    });
  }

  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12} data-cy="people-table">
          <StyledPaper>
            <PeopleTable
              title="Users"
              action={{
                fn: (value) => setUserData(value as BasicUserDetails),
                actionText: 'Edit user',
                actionIcon: <Edit />,
              }}
              selection={false}
              showInvitationButtons
              onRemove={(user: { id: number }) =>
                api('User removed successfully!').deleteUser({
                  id: user.id,
                })
              }
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
