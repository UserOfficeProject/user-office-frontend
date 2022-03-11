import MaterialTable, { Column, Options } from '@material-table/core';
import React, { useContext } from 'react';

import { SettingsContext } from 'context/SettingsContextProvider';
import { SettingsId } from 'generated/sdk';
import { ProposalScheduledEvent } from 'hooks/proposalBooking/useProposalBookingsScheduledEvents';
import { tableIcons } from 'utils/materialIcons';
import { toFormattedDateTime } from 'utils/Time';
import { getFullUserName } from 'utils/user';

type ExperimentTimesTableProps = {
  title: string;
  isLoading: boolean;
  proposalScheduledEvents: ProposalScheduledEvent[];
  options?: Partial<Options<ProposalScheduledEvent>>;
};

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

export default function ExperimentsTable({
  title,
  isLoading,
  proposalScheduledEvents,
  options,
}: ExperimentTimesTableProps) {
  const { settings } = useContext(SettingsContext);

  const format = settings.get(SettingsId.DATE_TIME_FORMAT)?.settingsValue;

  const proposalScheduledEventsWithFormattedDates = proposalScheduledEvents.map(
    (event) => ({
      ...event,
      startsAtFormatted: toFormattedDateTime(event.startsAt, {
        format,
      }),
      endsAtFormatted: toFormattedDateTime(event.endsAt, {
        format,
      }),
    })
  );

  return (
    <MaterialTable
      icons={tableIcons}
      title={title}
      isLoading={isLoading}
      columns={columns}
      data={proposalScheduledEventsWithFormattedDates}
      options={{
        search: false,
        padding: 'dense',
        emptyRowsWhenPaging: false,
        paging: false,
        ...options,
      }}
    />
  );
}
