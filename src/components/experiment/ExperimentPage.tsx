import { Grid } from '@material-ui/core';
import React from 'react';

import { ContentContainer, StyledPaper } from 'styles/StyledComponents';

import ExperimentFilterBar from './ExperimentFilterBar';
import ExperimentTable from './ExperimentTable';

interface ExperimentPageProps {
  visit?: number;
}
function ExperimentPage(props: ExperimentPageProps) {
  return (
    <>
      <ContentContainer>
        <Grid container>
          <Grid item xs={12}>
            <StyledPaper data-cy="officer-scheduled-events-table">
              <ExperimentFilterBar />
              <ExperimentTable />
            </StyledPaper>
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  );
}

export default ExperimentPage;
