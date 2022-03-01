import Grid from '@mui/material/Grid';
import React from 'react';
import { useParams } from 'react-router';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import UpdateProposalEsi from './UpdateProposalEsi';

export default function UpdateProposalEsiPage() {
  const { esiId } = useParams<{ esiId: string }>();

  if (!esiId) {
    return <span>Missing query params</span>;
  }

  return (
    <StyledContainer maxWidth="md">
      <Grid container>
        <Grid item xs={12} data-cy="update-proposal-esi-table">
          <StyledPaper>
            <UpdateProposalEsi esiId={+esiId} />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
