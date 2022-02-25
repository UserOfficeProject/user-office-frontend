import { Typography } from '@material-ui/core';
import dateformat from 'dateformat';
import React from 'react';
import { useQueryParams, NumberParam } from 'use-query-params';

import SuperMaterialTable, {
  DefaultQueryParams,
} from 'components/common/SuperMaterialTable';
import UOLoader from 'components/common/UOLoader';
import { GetScheduledEventsCoreQuery } from 'generated/sdk';
import { useScheduledEvents } from 'hooks/scheduledEvent/useScheduledEvents';
import { tableIcons } from 'utils/materialIcons';
import { getFullUserName } from 'utils/user';

import { ExperimentUrlQueryParamsType } from './ExperimentFilterBar';
import ExperimentVisitsTable from './ExperimentVisitsTable';

type RowType = GetScheduledEventsCoreQuery['scheduledEventsCore'][0];

const columns = [
  {
    title: 'Proposal ID',
    field: 'proposal.proposalId',
  },
  {
    title: 'Principal investigator',
    render: (rowData: RowType) => getFullUserName(rowData.proposal.proposer),
  },
  {
    title: 'Proposal',
    field: 'proposal.title',
  },
  {
    title: 'Experiment start',
    field: 'startsAt',
    render: (rowData: RowType) =>
      dateformat(rowData.startsAt, 'dd-mmm-yyyy HH:MM'),
  },
  {
    title: 'Experiment end',
    field: 'endsAt',
    render: (rowData: RowType) =>
      dateformat(rowData.endsAt, 'dd-mmm-yyyy HH:MM'),
  },
  {
    title: 'ESI',
    field: 'esi.isSubmitted',
  },
  {
    title: 'Instrument',
    field: 'proposal.instrument.name',
  },
];

interface ExperimentTableProps {
  visit?: number;
}
function ExperimentTable(props: ExperimentTableProps) {
  const [urlQueryParams, setUrlQueryParams] =
    useQueryParams<ExperimentUrlQueryParamsType>({
      ...DefaultQueryParams,
      callId: NumberParam,
      instrumentId: NumberParam,
    });

  const { scheduledEvents, setScheduledEvents, loadingEvents } =
    useScheduledEvents({});

  const ScheduledEventDetails = React.useCallback(
    ({ rowData }: Record<'rowData', RowType>) => {
      return <ExperimentVisitsTable scheduledEvent={rowData} />;
    },
    []
  );

  if (!scheduledEvents) {
    return <UOLoader />;
  }

  return (
    <div>
      <SuperMaterialTable
        data={scheduledEvents}
        setData={setScheduledEvents}
        icons={tableIcons}
        title={
          <Typography variant="h6" component="h2">
            Experiments
          </Typography>
        }
        columns={columns}
        isLoading={loadingEvents}
        options={{
          search: false,
        }}
        urlQueryParams={urlQueryParams}
        setUrlQueryParams={setUrlQueryParams}
        detailPanel={[
          {
            tooltip: 'Show details',
            render: ScheduledEventDetails,
          },
        ]}
        hasAccess={{
          create: false,
          remove: false,
          update: false,
        }}
      />
    </div>
  );
}

export default ExperimentTable;
