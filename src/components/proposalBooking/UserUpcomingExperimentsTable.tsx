import MaterialTable, { Column } from '@material-table/core';
import { Dialog, DialogContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useContext, useState } from 'react';
import { ReactNode } from 'react';

import { SettingsContext } from 'context/SettingsContextProvider';
import { SettingsId } from 'generated/sdk';
import { useActionButtons } from 'hooks/proposalBooking/useActionButtons';
import {
  ProposalScheduledEvent,
  useProposalBookingsScheduledEvents,
} from 'hooks/proposalBooking/useProposalBookingsScheduledEvents';
import { StyledPaper } from 'styles/StyledComponents';
import { tableIcons } from 'utils/materialIcons';
import { toFormattedDateTime } from 'utils/Time';
import { getFullUserName } from 'utils/user';

const columns: Column<ProposalScheduledEvent>[] = [
  { title: 'Proposal title', field: 'proposal.title' },
  { title: 'Proposal ID', field: 'proposal.proposalId' },
  { title: 'Instrument', field: 'instrument.name' },
  {
    title: 'Local contact',
    render: (rowData) => getFullUserName(rowData.localContact),
  },
  {
    title: 'Starts at',
    field: 'startsAtFormatted',
  },
  {
    title: 'Ends at',
    field: 'endsAtFormatted',
  },
];

export default function UserUpcomingExperimentsTable() {
  const { loading, proposalScheduledEvents, setProposalScheduledEvents } =
    useProposalBookingsScheduledEvents({
      onlyUpcoming: true,
      notDraft: true,
    });
  const { settings } = useContext(SettingsContext);
  const format = settings.get(SettingsId.DATE_TIME_FORMAT)?.settingsValue;

  const [modalContents, setModalContents] = useState<ReactNode>(null);

  const {
    formTeamAction,
    finishEsi,
    registerVisitAction,
    individualTrainingAction,
    declareShipmentAction,
    giveFeedback,
  } = useActionButtons({
    openModal: (contents) => setModalContents(contents),
    closeModal: () => {
      setModalContents(null);
    },
    eventUpdated: (updatedEvent) => {
      const updatedEvents = proposalScheduledEvents.map((event) =>
        event?.id === updatedEvent?.id ? updatedEvent : event
      );
      setProposalScheduledEvents(updatedEvents);
    },
  });

  // if there are no upcoming experiments
  // just hide the whole table altogether
  if (proposalScheduledEvents.length === 0) {
    return null;
  }

  const proposalScheduledEventsWithFormattedDates = proposalScheduledEvents.map(
    (event) => ({
      ...event,
      startsAtFormatted: toFormattedDateTime(event.startsAt, { format }),
      endsAtFormatted: toFormattedDateTime(event.endsAt, { format }),
    })
  );

  return (
    <Grid item xs={12} data-cy="upcoming-experiments">
      <StyledPaper margin={[0]}>
        <MaterialTable
          actions={[
            formTeamAction,
            finishEsi,
            registerVisitAction,
            individualTrainingAction,
            declareShipmentAction,
            giveFeedback,
          ]}
          icons={tableIcons}
          title="Upcoming experiments"
          isLoading={loading}
          columns={columns}
          data={proposalScheduledEventsWithFormattedDates}
          options={{
            search: false,
            padding: 'dense',
            emptyRowsWhenPaging: false,
            paging: false,
            actionsColumnIndex: -1,
          }}
        />
      </StyledPaper>
      <Dialog
        open={modalContents !== null}
        onClose={() => setModalContents(null)}
        style={{ maxWidth: 'inherit' }}
      >
        <DialogContent>{modalContents}</DialogContent>
      </Dialog>
    </Grid>
  );
}
