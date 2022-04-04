import MaterialTable from '@material-table/core';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import { FacilityWithAvailabilityTime } from 'generated/sdk';
import { useFacilitiesData } from 'hooks/facility/useFacilityData';
import { tableIcons } from 'utils/materialIcons';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

type AssignFacilitiesToCallProps = {
  assignFacilitiesToCall: (facilities: FacilityWithAvailabilityTime[]) => void;
  callId: number;
  assignedFacilities?: FacilityWithAvailabilityTime[] | null;
};

const AssignFacilitiesToCall: React.FC<AssignFacilitiesToCallProps> = ({
  assignFacilitiesToCall,
  callId,
  assignedFacilities,
}) => {
  const { loading, data: facilities } = useFacilitiesData();
  const [selectedFacilities, setSelectedFacilities] = useState<
    FacilityWithAvailabilityTime[]
  >([]);
  const { api, isExecutingCall } = useDataApiWithFeedback();

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
  ];

  const notAssignedFacilities = facilities.filter((facility) => {
    if (
      !assignedFacilities?.find(
        (assignedFacility) => assignedFacility.id === facility.id
      )
    ) {
      return facility;
    }

    return null;
  });

  const onAssignButtonClick = async () => {
    const assignFacilityToCallResult = await api(
      'Facility/ies assigned successfully!'
    ).assignFacilitiesToCall({
      callId,
      facilityIds: selectedFacilities.map(
        (instrumentToAssign) => instrumentToAssign.id
      ),
    });

    if (!assignFacilityToCallResult.assignFacilitiesToCall.rejection) {
      assignFacilitiesToCall(selectedFacilities);
    }
  };

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title={
          <Typography variant="h6" component="h1">
            Facilities
          </Typography>
        }
        columns={columns}
        data={notAssignedFacilities}
        isLoading={loading}
        onSelectionChange={(data) =>
          setSelectedFacilities(data as FacilityWithAvailabilityTime[])
        }
        options={{
          search: true,
          selection: true,
          headerSelectionProps: {
            inputProps: { 'aria-label': 'Select All Rows' },
          },
          debounceInterval: 400,
          selectionProps: (rowData: FacilityWithAvailabilityTime) => ({
            inputProps: {
              'aria-label': `${rowData.name}-select`,
            },
          }),
        }}
      />
      <ActionButtonContainer>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => onAssignButtonClick()}
          disabled={selectedFacilities.length === 0 || isExecutingCall}
          data-cy="assign-facility-to-call"
        >
          Assign facility{selectedFacilities.length > 1 && 's'}
        </Button>
      </ActionButtonContainer>
    </>
  );
};

AssignFacilitiesToCall.propTypes = {
  assignFacilitiesToCall: PropTypes.func.isRequired,
  callId: PropTypes.number.isRequired,
  assignedFacilities: PropTypes.array,
};

export default AssignFacilitiesToCall;
