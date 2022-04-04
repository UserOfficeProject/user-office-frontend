import MaterialTable, { Column } from '@material-table/core';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, useState } from 'react';

import { tableIcons } from 'utils/materialIcons';

export interface Resource {
  kind: 'Facility' | 'Instrument';
  id: number;
  name: string;
  shortCode: string;
  description: string;
  availabilityTime: number;
}

// NOTE: Some custom styles for row expand table.
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
}));

type AssignedInstrumentsTableProps = {
  callId: number;
  resources: Resource[];
  removeAssignedInstrumentFromCall: (
    resource: Resource,
    callId: number
  ) => Promise<void>;
  setInstrumentAvailabilityTime: (
    resource: Resource,
    callId: number
  ) => Promise<void>;
};

const AssignedInstrumentsTable: React.FC<AssignedInstrumentsTableProps> = ({
  callId,
  resources,
  removeAssignedInstrumentFromCall,
  setInstrumentAvailabilityTime,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const availabilityTimeInput = ({
    onChange,
    value,
  }: {
    onChange: (e: string) => void;
    value: string;
  }) => (
    <TextField
      type="number"
      data-cy="availability-time"
      value={value || ''}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      required
    />
  );

  const [assignmentColumns] = useState<Column<Resource>[]>([
    {
      title: 'Kind',
      field: 'kind',
      editable: 'never',
    },
    {
      title: 'Name',
      field: 'name',
      editable: 'never',
    },
    {
      title: 'Short code',
      field: 'shortCode',
      editable: 'never',
    },
    {
      title: 'Description',
      field: 'description',
      editable: 'never',
    },
    {
      title: 'Time available',
      field: 'availabilityTime',
      editable: 'onUpdate',
      type: 'numeric',
      emptyValue: '-',
      editComponent: availabilityTimeInput,
    },
  ]);

  return (
    <div className={classes.root} data-cy="call-instrument-assignments-table">
      <MaterialTable
        icons={tableIcons}
        columns={assignmentColumns}
        title={'Assigned resources'}
        data={resources}
        editable={{
          onRowDelete: (rowAssignmentsData: Resource): Promise<void> =>
            removeAssignedInstrumentFromCall(rowAssignmentsData, callId),
          onRowUpdate: (resourceUpdatedData) =>
            new Promise<void>(async (resolve, reject) => {
              if (
                resourceUpdatedData &&
                resourceUpdatedData.availabilityTime &&
                +resourceUpdatedData.availabilityTime > 0
              ) {
                setInstrumentAvailabilityTime(resourceUpdatedData, callId);
                resolve();
              } else {
                enqueueSnackbar('Availability time must be positive number', {
                  variant: 'error',
                  className: 'snackbar-error',
                });
                reject();
              }
            }),
        }}
        options={{
          search: false,
          paging: false,
          toolbar: false,
          headerStyle: { backgroundColor: '#fafafa' },
        }}
      />
    </div>
  );
};

export default AssignedInstrumentsTable;
