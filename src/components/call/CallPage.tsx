import Grid from '@mui/material/Grid';
import React from 'react';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import CallsTable from './CallsTable';

const CallPage: React.FC = () => {
  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper>
            <CallsTable />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default CallPage;
