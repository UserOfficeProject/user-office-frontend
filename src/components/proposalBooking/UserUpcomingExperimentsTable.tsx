import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import React from 'react';

import { useActionButtons } from 'hooks/proposalBooking/useActionButtons';
import {
  ProposalScheduledEvent,
  useProposalBookingsScheduledEvents,
} from 'hooks/proposalBooking/useProposalBookingsScheduledEvents';
import { StyledPaper } from 'styles/StyledComponents';
import { tableIcons } from 'utils/materialIcons';
import {
  parseTzLessDateTime,
  TZ_LESS_DATE_TIME_LOW_PREC_FORMAT,
} from 'utils/Time';

export default function UserUpcomingExperimentsTable() {
  const {
    loading,
    proposalScheduledEvents,
  } = useProposalBookingsScheduledEvents({
    onlyUpcoming: true,
    notDraft: true,
  });

  const {
    formTeamAction,
    defineVisitAction,
    individualTrainingAction,
    riskAssessmentAction,
  } = useActionButtons({});

  const columns = [
    { title: 'Proposal title', field: 'proposal.title' },
    { title: 'Proposal ID', field: 'proposal.proposalId' },
    { title: 'Instrument', field: 'instrument.name' },
    {
      title: 'Starts at',
      field: 'startsAt',
      render: (rowData: ProposalScheduledEvent) =>
        parseTzLessDateTime(rowData.startsAt).format(
          TZ_LESS_DATE_TIME_LOW_PREC_FORMAT
        ),
    },
    {
      title: 'Ends at',
      field: 'endsAt',
      render: (rowData: ProposalScheduledEvent) =>
        parseTzLessDateTime(rowData.endsAt).format(
          TZ_LESS_DATE_TIME_LOW_PREC_FORMAT
        ),
    },
  ];

  // if there are no upcoming experiments
  // just hide the whole table altogether
  if (proposalScheduledEvents.length === 0) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <StyledPaper margin={[0]}>
        <MaterialTable
          actions={[
            formTeamAction,
            defineVisitAction,
            individualTrainingAction,
            riskAssessmentAction,
          ]}
          icons={tableIcons}
          title="Upcoming experiments"
          isLoading={loading}
          columns={columns}
          data={proposalScheduledEvents}
          options={{
            search: false,
            selection: false,
            padding: 'dense',
            emptyRowsWhenPaging: false,
            paging: false,
            actionsColumnIndex: -1,
          }}
        />
      </StyledPaper>
    </Grid>
  );
}
