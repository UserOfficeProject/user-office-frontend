import MaterialTable from '@material-table/core';
import { makeStyles } from '@material-ui/core';
import dateformat from 'dateformat';
import React from 'react';

import { GetScheduledEventsCoreQuery, TrainingStatus } from 'generated/sdk';
import { tableIcons } from 'utils/materialIcons';
import { getFullUserName } from 'utils/user';

const useStyles = makeStyles(() => ({
  root: {
    '& tr:last-child td': {
      border: 'none',
    },
    '& .MuiPaper-root': {
      padding: '0 40px',
      backgroundColor: '#fafafa',
    },
  },
  noVisit: {
    textAlign: 'center',
    padding: '20px',
  },
}));

type RowType = NonNullable<
  GetScheduledEventsCoreQuery['scheduledEventsCore'][0]['visit']
>['registrations'][0];

const getHumanReadableStatus = (rowData: RowType) => {
  switch (rowData.trainingStatus) {
    case TrainingStatus.ACTIVE:
      return `Valid until ${dateformat(
        new Date(rowData.trainingExpiryDate),
        'dd-mmm-yyyy HH:MM'
      )}`;
    case TrainingStatus.EXPIRED:
      return `Expired ${dateformat(
        new Date(rowData.trainingExpiryDate),
        'dd-mmm-yyyy HH:MM'
      )}`;
    case TrainingStatus.NONE:
      return 'Not started';
    default:
      return 'Unknown';
  }
};

type ScheduledEvent = GetScheduledEventsCoreQuery['scheduledEventsCore'][0];
const columns = [
  {
    title: 'Visitor name',
    render: (rowData: RowType) => getFullUserName(rowData.user),
  },
  {
    title: 'Training',
    field: 'rowData.trainingStatus',
    render: (rowData: RowType) => getHumanReadableStatus(rowData),
  },
];

interface ScheduledEventDetailsTableProps {
  scheduledEvent: ScheduledEvent;
}

function ExperimentVisitsTable({
  scheduledEvent,
}: ScheduledEventDetailsTableProps) {
  const classes = useStyles();

  if (scheduledEvent.visit === null) {
    return <div className={classes.noVisit}>Visit is not defined</div>;
  }

  return (
    <div className={classes.root}>
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={columns}
        data={scheduledEvent.visit.registrations}
        options={{
          search: false,
          paging: false,
          toolbar: false,
          headerStyle: { backgroundColor: '#fafafa', fontWeight: 'bolder' },
          pageSize: 20,
          padding: 'dense',
        }}
      />
    </div>
  );
}

export default ExperimentVisitsTable;
