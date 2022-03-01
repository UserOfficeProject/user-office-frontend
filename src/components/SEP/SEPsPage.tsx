import Grid from '@mui/material/Grid';
import React from 'react';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import SEPsTable from './SEPsTable';

const SEPsPage: React.FC = () => {
  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper>
            <SEPsTable />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default SEPsPage;
