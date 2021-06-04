import Grid from '@material-ui/core/Grid';
import React from 'react';

import { useProposalBookingsScheduledEvents } from 'hooks/proposalBooking/useProposalBookingsScheduledEvents';
import { StyledPaper } from 'styles/StyledComponents';

import ExperimentTimesTable from './ExperimentTimesTable';

export default function UserUpcomingExperimentTimesTable() {
  const {
    loading,
    proposalScheduledEvents,
  } = useProposalBookingsScheduledEvents({
    onlyUpcoming: true,
    notDraft: true,
  });

  // if there are no upcoming experiment times
  // just hide the whole table altogether
  if (proposalScheduledEvents.length === 0) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <StyledPaper margin={[0]}>
        <ExperimentTimesTable
          isLoading={loading}
          proposalScheduledEvents={proposalScheduledEvents}
          title="Upcoming experiment times"
        />
      </StyledPaper>
    </Grid>
  );
}
