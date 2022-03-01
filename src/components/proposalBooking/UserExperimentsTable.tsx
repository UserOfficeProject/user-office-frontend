import Grid from '@mui/material/Grid';
import React from 'react';

import { useProposalBookingsScheduledEvents } from 'hooks/proposalBooking/useProposalBookingsScheduledEvents';
import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import ExperimentsTable from './ExperimentTimesTable';

export default function UserExperimentTimesTable() {
  const { loading, proposalScheduledEvents } =
    useProposalBookingsScheduledEvents({
      notDraft: true,
    });

  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper margin={[0]}>
            <ExperimentsTable
              isLoading={loading}
              proposalScheduledEvents={proposalScheduledEvents}
              title="Experiment Times"
              options={{
                search: true,
                padding: 'normal',
                emptyRowsWhenPaging: true,
                paging: true,
              }}
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
