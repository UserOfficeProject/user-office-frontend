import { Typography } from '@mui/material';
import React from 'react';
import { useQueryParams } from 'use-query-params';

import { useCheckAccess } from 'components/common/Can';
import SuperMaterialTable, {
  DefaultQueryParams,
  UrlQueryParamsType,
} from 'components/common/SuperMaterialTable';
import { useFacilitiesData } from 'hooks/facility/useFacilityData';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { FunctionType } from 'utils/utilTypes';

import { Facility, UserRole } from '../../generated/sdk';
import CreateUpdateFacility from './CreateUpdateFacility';

const FacilitiesTable: React.FC = () => {
  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
  ];
  const { api } = useDataApiWithFeedback();

  const {
    loading: loadingFacilities,
    data: facilities,
    setDataWithLoading: setFacilitiesWithLoading,
  } = useFacilitiesData();

  const isUserOfficer = useCheckAccess([UserRole.USER_OFFICER]);
  const [urlQueryParams, setUrlQueryParams] =
    useQueryParams<UrlQueryParamsType>(DefaultQueryParams);

  const onFacilityDelete = async (facilityId: number | string) => {
    return await api('Facility removed successfully!')
      .deleteFacility({
        id: facilityId as number,
      })
      .then((data) => {
        if (data.deleteFacility.rejection) {
          return false;
        } else {
          return true;
        }
      });
  };

  const createModal = (
    onUpdate: FunctionType<void, [Facility | null]>,
    onCreate: FunctionType<void, [Facility | null]>,
    editFacility: Facility | null
  ) => (
    <CreateUpdateFacility
      facility={editFacility}
      close={(facility: Facility | null) =>
        !!editFacility ? onUpdate(facility) : onCreate(facility)
      }
    />
  );

  return (
    <div data-cy="facilities-table">
      <SuperMaterialTable
        delete={onFacilityDelete}
        setData={setFacilitiesWithLoading}
        hasAccess={{
          create: isUserOfficer,
          update: isUserOfficer,
          remove: isUserOfficer,
        }}
        title={
          <Typography variant="h6" component="h2">
            Facilities
          </Typography>
        }
        columns={columns}
        data={facilities}
        isLoading={loadingFacilities}
        options={{
          search: true,
          debounceInterval: 400,
        }}
        urlQueryParams={urlQueryParams}
        setUrlQueryParams={setUrlQueryParams}
        createModal={createModal}
      />
    </div>
  );
};

export default FacilitiesTable;
