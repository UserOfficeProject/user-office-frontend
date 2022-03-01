import Grid from '@mui/material/Grid';
import React from 'react';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import InstitutionTable from './InstitutionTable';

const InstrumentsPage: React.FC = () => {
  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper>
            <InstitutionTable />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default InstrumentsPage;
