import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useQueryParams, NumberParam, DateParam } from 'use-query-params';

import SuperMaterialTable, {
  DefaultQueryParams,
} from 'components/common/SuperMaterialTable';
import ProposalEsiDetailsButton from 'components/questionary/questionaryComponents/ProposalEsiBasis/ProposalEsiDetailsButton';
import { GetScheduledEventsCoreQuery } from 'generated/sdk';
import { useScheduledEvents } from 'hooks/scheduledEvent/useScheduledEvents';
import { tableIcons } from 'utils/materialIcons';
import { getFullUserName } from 'utils/user';

import { ExperimentUrlQueryParamsType } from './ExperimentUrlQueryParamsType';
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
      DateTime.fromFormat(rowData.startsAt, 'yyyy-MM-dd HH:mm:ss').toFormat(
        'dd/MM/yyyy HH:mm'
      ),
  },
  {
    title: 'Experiment end',
    field: 'endsAt',
    render: (rowData: RowType) =>
      DateTime.fromFormat(rowData.endsAt, 'yyyy-MM-dd HH:mm:ss').toFormat(
        'dd/MM/yyyy HH:mm'
      ),
  },
  {
    title: 'ESI',
    render: (rowData: RowType) =>
      rowData.esi ? (
        <ProposalEsiDetailsButton esiId={rowData.esi?.id} />
      ) : (
        'No ESI'
      ),
  },
  {
    title: 'Instrument',
    field: 'proposal.instrument.name',
  },
];

function ExperimentTable() {
  const [urlQueryParams, setUrlQueryParams] =
    useQueryParams<ExperimentUrlQueryParamsType>({
      ...DefaultQueryParams,
      call: NumberParam,
      instrument: NumberParam,
      from: DateParam,
      to: DateParam,
    });

  const { scheduledEvents, setScheduledEvents, loadingEvents, setArgs } =
    useScheduledEvents({});

  useEffect(() => {
    setArgs({
      filter: {
        callId: urlQueryParams.call,
        instrumentId: urlQueryParams.instrument,
        overlaps: {
          from: urlQueryParams.from ? urlQueryParams.from : undefined,
          to: urlQueryParams.to ? urlQueryParams.to : undefined,
        },
      },
    });
  }, [
    setArgs,
    urlQueryParams.call,
    urlQueryParams.instrument,
    urlQueryParams.from,
    urlQueryParams.to,
  ]);

  const ScheduledEventDetails = React.useCallback(
    ({ rowData }: Record<'rowData', RowType>) => {
      return <ExperimentVisitsTable scheduledEvent={rowData} />;
    },
    []
  );

  return (
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
  );
}

export default ExperimentTable;
