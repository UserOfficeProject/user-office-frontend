import { Grid } from '@mui/material';
import React from 'react';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import ExperimentFilterBar from './ExperimentFilterBar';
import ExperimentTable from './ExperimentTable';

function ExperimentPage() {
  return (
    <StyledContainer>
      <Grid>
        <Grid xs={12}>
          <StyledPaper data-cy="officer-scheduled-events-table">
            <ExperimentFilterBar />
            <ExperimentTable />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default ExperimentPage;
