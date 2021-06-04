import Grid from '@material-ui/core/Grid';
import React from 'react';

import { useProposalBookingsScheduledEvents } from 'hooks/proposalBooking/useProposalBookingsScheduledEvents';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';

import ExperimentTimesTable from './ExperimentTimesTable';

export default function UserExperimentTimesTable() {
  const {
    loading,
    proposalScheduledEvents,
  } = useProposalBookingsScheduledEvents({
    notDraft: true,
  });

  return (
    <ContentContainer>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper margin={[0]}>
            <ExperimentTimesTable
              isLoading={loading}
              proposalScheduledEvents={proposalScheduledEvents}
              title="Experiment Times"
              options={{
                search: true,
                padding: 'default',
                emptyRowsWhenPaging: true,
                paging: true,
              }}
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
