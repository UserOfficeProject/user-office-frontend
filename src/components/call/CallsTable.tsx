import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQueryParams } from 'use-query-params';

import { useCheckAccess } from 'components/common/Can';
import ScienceIcon from 'components/common/icons/ScienceIcon';
import InputDialog from 'components/common/InputDialog';
import SuperMaterialTable, {
  DefaultQueryParams,
  UrlQueryParamsType,
} from 'components/common/SuperMaterialTable';
import {
  Call,
  FacilityWithAvailabilityTime,
  InstrumentWithAvailabilityTime,
  UserRole,
} from 'generated/sdk';
import { useFormattedDateTime } from 'hooks/admin/useFormattedDateTime';
import { useCallsData } from 'hooks/call/useCallsData';
import { tableIcons } from 'utils/materialIcons';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { FunctionType } from 'utils/utilTypes';

import AssignedResourcesTable, { Resource } from './AssignedResourcesTable';
import AssignFacilitiesToCall from './AssignFacilitiesToCall';
import AssignInstrumentsToCall from './AssignInstrumentsToCall';
import CallStatusFilter, {
  CallStatusQueryFilter,
  defaultCallStatusQueryFilter,
  CallStatus,
} from './CallStatusFilter';
import CreateUpdateCall from './CreateUpdateCall';

const getFilterStatus = (callStatus: string | CallStatus) =>
  callStatus === CallStatus.ALL
    ? undefined // if set to ALL we don't filter by status
    : callStatus === CallStatus.ACTIVE;

const CallsTable: React.FC = () => {
  const { api } = useDataApiWithFeedback();
  const { timezone, toFormattedDateTime } = useFormattedDateTime({
    shouldUseTimeZone: true,
  });
  const [assigningInstrumentsCallId, setAssigningInstrumentsCallId] = useState<
    number | null
  >(null);
  const [assigningFacilitiesCallId, setAssigningFacilitiesCallId] = useState<
    number | null
  >(null);
  const isUserOfficer = useCheckAccess([UserRole.USER_OFFICER]);
  const [urlQueryParams, setUrlQueryParams] = useQueryParams<
    UrlQueryParamsType & CallStatusQueryFilter
  >({
    ...DefaultQueryParams,
    callStatus: defaultCallStatusQueryFilter,
  });

  const {
    loadingCalls,
    calls,
    setCallsWithLoading: setCalls,
    setCallsFilter,
  } = useCallsData({
    isActive: getFilterStatus(urlQueryParams.callStatus),
  });

  const handleStatusFilterChange = (callStatus: CallStatus) => {
    setUrlQueryParams((queries) => ({ ...queries, callStatus }));
    setCallsFilter((filter) => ({
      ...filter,
      isActive: getFilterStatus(callStatus),
    }));
  };

  // NOTE: Here we keep the columns inside the component just because of the timezone shown in the title
  const columns = [
    { title: 'Short Code', field: 'shortCode' },
    {
      title: `Start Date (${timezone})`,
      field: 'formattedStartCall',
    },
    {
      title: `End Date (${timezone})`,
      field: 'formattedEndCall',
    },
    {
      title: 'Reference number format',
      field: 'referenceNumberFormat',
      emptyValue: '-',
    },
    {
      title: 'Proposal Workflow',
      field: 'proposalWorkflow.name',
      emptyValue: '-',
    },
    {
      title: 'Call template',
      field: 'template.name',
      emptyValue: '-',
    },
    {
      title: '#instruments',
      field: 'instruments.length',
      emptyValue: '-',
    },
    {
      title: '#proposals',
      field: 'proposalCount',
    },
  ];

  const assignInstrumentsToCall = (
    instruments: InstrumentWithAvailabilityTime[]
  ) => {
    if (calls) {
      const callsWithInstruments = calls.map((callItem) => {
        if (callItem.id === assigningInstrumentsCallId) {
          return {
            ...callItem,
            instruments: [...callItem.instruments, ...instruments],
          };
        } else {
          return callItem;
        }
      });

      setCalls(callsWithInstruments);
      setAssigningInstrumentsCallId(null);
    }
  };

  const assignFacilitiesToCall = (
    facilities: FacilityWithAvailabilityTime[]
  ) => {
    if (calls) {
      const callsWithFacilities = calls.map((callItem) => {
        if (callItem.id === assigningFacilitiesCallId) {
          return {
            ...callItem,
            facilities: [...callItem.facilities, ...facilities],
          };
        } else {
          return callItem;
        }
      });

      setCalls(callsWithFacilities);
      setAssigningFacilitiesCallId(null);
    }
  };

  const deleteCall = async (id: number | string) => {
    return await api('Call deleted successfully')
      .deleteCall({
        id: id as number,
      })
      .then((resp) => {
        if (!resp.deleteCall.rejection) {
          const newObjectsArray = calls.filter(
            (objectItem) => objectItem.id !== id
          );
          setCalls(newObjectsArray);

          return true;
        } else {
          return false;
        }
      });
  };

  const ScienceIconComponent = (): JSX.Element => <ScienceIcon />;

  const AssignedInstruments = React.useCallback(
    ({ rowData }: Record<'rowData', Call>) => {
      const removeAssignedResourceFromCall = async (
        resource: Resource,
        callId: number
      ) => {
        if (!calls) {
          return;
        }

        const callItem = calls.find((call) => call.id === callId);
        if (!callItem) {
          return;
        }

        let result;
        let resources:
          | InstrumentWithAvailabilityTime[]
          | FacilityWithAvailabilityTime[];

        switch (resource.kind) {
          case 'Instrument':
            result = await api('Assigned instrument removed successfully!')
              .removeAssignedInstrumentFromCall({
                callId: callId,
                instrumentId: resource.id,
              })
              .then((r) => r.removeAssignedInstrumentFromCall);

            resources = callItem.instruments;
            break;
          case 'Facility':
            result = await api('Assigned facility removed successfully!')
              .removeAssignedFacilitiesFromCall({
                callId: callId,
                facilityIds: resource.id,
              })
              .then((r) => r.removeAssignedFacilitiesFromCall);

            resources = callItem.facilities;
            break;
        }

        if (result.rejection) {
          return;
        }

        const toRemove = resources.findIndex((r) => r.id === resource.id);
        if (toRemove > -1) {
          resources.splice(toRemove, 1);
        }

        setCalls(calls);
        setAssigningInstrumentsCallId(null);
      };

      const setResourceAvailabilityTime = async (
        resource: Resource,
        callId: number
      ) => {
        if (!calls) {
          return;
        }

        const callItem = calls.find((call) => call.id === callId);
        if (!callItem) {
          return;
        }

        let result;
        let resources:
          | InstrumentWithAvailabilityTime[]
          | FacilityWithAvailabilityTime[];

        switch (resource.kind) {
          case 'Instrument':
            result = await api('Availability time set successfully!')
              .setInstrumentAvailabilityTime({
                callId: callId,
                instrumentId: resource.id,
                availabilityTime: +resource.availabilityTime,
              })
              .then((r) => r.setInstrumentAvailabilityTime);

            resources = callItem.instruments;
            break;
          case 'Facility':
            result = await api('Availability time set successfully!')
              .setFacilityAvailabilityTime({
                callId: callId,
                facilityId: resource.id,
                availabilityTime: +resource.availabilityTime,
              })
              .then((r) => r.setFacilityAvailabilityTime);

            resources = callItem.facilities;
            break;
        }

        if (result.rejection) {
          return;
        }

        const toUpdate = resources.find((r) => r.id === resource.id);
        if (toUpdate) {
          toUpdate.availabilityTime = resource.availabilityTime;
        }

        setCalls(calls);
      };

      const transformInstruments = (
        resources: InstrumentWithAvailabilityTime[]
      ): Resource[] => {
        return resources.map((r) => {
          return { kind: 'Instrument', ...r } as Resource;
        });
      };

      const transformFacilities = (
        resources: FacilityWithAvailabilityTime[]
      ): Resource[] => {
        return resources.map((r) => {
          return { kind: 'Facility', ...r } as Resource;
        });
      };

      return (
        <AssignedResourcesTable
          callId={rowData.id}
          resources={[
            ...transformInstruments(rowData.instruments),
            ...transformFacilities(rowData.facilities),
          ]}
          removeAssignedInstrumentFromCall={removeAssignedResourceFromCall}
          setInstrumentAvailabilityTime={setResourceAvailabilityTime}
        />
      );
    },
    [calls, api, setCalls, setAssigningInstrumentsCallId]
  );

  const callAssignments = calls.find(
    (callItem) => callItem.id === assigningInstrumentsCallId
  );

  const createModal = (
    onUpdate: FunctionType<void, [Call | null]>,
    onCreate: FunctionType<void, [Call | null]>,
    editCall: Call | null
  ) => (
    <CreateUpdateCall
      call={editCall}
      close={(call): void => {
        !!editCall ? onUpdate(call) : onCreate(call);
      }}
    />
  );

  const callsWithFormattedData = calls.map((call) => ({
    ...call,
    formattedStartCall: toFormattedDateTime(call.startCall),
    formattedEndCall: toFormattedDateTime(call.endCall),
  }));

  return (
    <div data-cy="calls-table">
      <CallStatusFilter
        callStatus={urlQueryParams.callStatus}
        onChange={handleStatusFilterChange}
      />
      {assigningInstrumentsCallId && (
        <InputDialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!!assigningInstrumentsCallId}
          onClose={(): void => setAssigningInstrumentsCallId(null)}
        >
          <AssignInstrumentsToCall
            assignedInstruments={
              callAssignments?.instruments as InstrumentWithAvailabilityTime[]
            }
            callId={assigningInstrumentsCallId}
            assignInstrumentsToCall={(
              instruments: InstrumentWithAvailabilityTime[]
            ) => assignInstrumentsToCall(instruments)}
          />
        </InputDialog>
      )}
      {assigningFacilitiesCallId && (
        <InputDialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!!assigningFacilitiesCallId}
          onClose={(): void => setAssigningFacilitiesCallId(null)}
        >
          <AssignFacilitiesToCall
            assignedFacilities={
              callAssignments?.facilities as FacilityWithAvailabilityTime[]
            }
            callId={assigningFacilitiesCallId}
            assignFacilitiesToCall={(
              facilities: FacilityWithAvailabilityTime[]
            ) => assignFacilitiesToCall(facilities)}
          />
        </InputDialog>
      )}
      <SuperMaterialTable
        createModal={createModal}
        setData={setCalls}
        delete={deleteCall}
        hasAccess={{
          create: isUserOfficer,
          update: isUserOfficer,
          remove: isUserOfficer,
        }}
        icons={tableIcons}
        title={
          <Typography variant="h6" component="h2">
            Calls
          </Typography>
        }
        columns={columns}
        data={callsWithFormattedData}
        isLoading={loadingCalls}
        detailPanel={[
          {
            tooltip: 'Show Instruments',
            render: AssignedInstruments,
          },
        ]}
        options={{
          search: false,
        }}
        actions={[
          {
            icon: ScienceIconComponent,
            tooltip: 'Assign Instrument',
            onClick: (event, rowData): void =>
              setAssigningInstrumentsCallId((rowData as Call).id),
            position: 'row',
          },
          {
            icon: ScienceIconComponent,
            tooltip: 'Assign Facility',
            onClick: (event, rowData): void =>
              setAssigningFacilitiesCallId((rowData as Call).id),
            position: 'row',
          },
        ]}
        urlQueryParams={urlQueryParams}
        setUrlQueryParams={setUrlQueryParams}
      />
    </div>
  );
};

export default CallsTable;
