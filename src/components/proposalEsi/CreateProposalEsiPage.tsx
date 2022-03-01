import Grid from '@mui/material/Grid';
import React from 'react';
import { useParams } from 'react-router';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import CreateProposalEsi from './CreateProposalEsi';

function CreateProposalEsiPage() {
  const { scheduledEventId } = useParams<{ scheduledEventId: string }>();

  if (!scheduledEventId) {
    return <span>Missing query params</span>;
  }

  return (
    <StyledContainer maxWidth="md">
      <Grid container>
        <Grid item xs={12} data-cy="create-proposal-esi-table">
          <StyledPaper>
            <CreateProposalEsi scheduledEventId={+scheduledEventId} />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default CreateProposalEsiPage;
