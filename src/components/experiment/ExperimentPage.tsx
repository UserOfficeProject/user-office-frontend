import { Grid } from '@mui/material';
import React from 'react';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import ExperimentFilterBar from './ExperimentFilterBar';
import ExperimentTable from './ExperimentTable';

interface ExperimentPageProps {
  visit?: number;
}
function ExperimentPage(props: ExperimentPageProps) {
  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12}>
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
