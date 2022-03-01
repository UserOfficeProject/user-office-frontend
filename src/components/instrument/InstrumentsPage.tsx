import Grid from '@mui/material/Grid';
import React from 'react';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import InstrumentTable from './InstrumentTable';

const InstrumentsPage: React.FC = () => {
  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper>
            <InstrumentTable />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default InstrumentsPage;
