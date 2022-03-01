import Grid from '@mui/material/Grid';
import React from 'react';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import ProposalWorkflowsTable from './ProposalWorkflowsTable';

const ProposalWorkflowsPage: React.FC = () => {
  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper>
            <ProposalWorkflowsTable />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ProposalWorkflowsPage;
