import { Delete } from '@material-ui/icons';
import React from 'react';
import { useQueryParams } from 'use-query-params';

import SuperMaterialTable, {
  DefaultQueryParams,
  UrlQueryParamsType,
} from 'components/common/SuperMaterialTable';
import UOLoader from 'components/common/UOLoader';
import { useShipmentsData } from 'hooks/shipment/useShipmentsData';
import { ShipmentBasic } from 'models/ShipmentSubmissionState';
import { tableIcons } from 'utils/materialIcons';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

import CreateUpdateShipment from './CreateUpdateShipment';

const ShipmentsTable = (props: { confirm: WithConfirmType }) => {
  const { loadingShipments, shipments, setShipments } = useShipmentsData();
  const [urlQueryParams, setUrlQueryParams] = useQueryParams<
    UrlQueryParamsType
  >(DefaultQueryParams);
  const { api } = useDataApiWithFeedback();

  if (!shipments) {
    return <UOLoader />;
  }

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Status', field: 'status' },
    { title: 'Created', field: 'created' },
  ];

  const createModal = (
    onUpdate: Function,
    onCreate: Function,
    editShipment: ShipmentBasic | null
  ) => (
    <CreateUpdateShipment
      shipment={editShipment}
      close={(shipment: ShipmentBasic | null) =>
        !!editShipment ? onUpdate(shipment) : onCreate(shipment)
      }
    />
  );

  return (
    <div data-cy="shipments-table">
      <SuperMaterialTable
        createModal={createModal}
        setData={setShipments}
        icons={tableIcons}
        title="Shipments"
        columns={columns}
        data={shipments}
        isLoading={loadingShipments}
        urlQueryParams={urlQueryParams}
        setUrlQueryParams={setUrlQueryParams}
        actions={[
          {
            icon: Delete,
            tooltip: 'Delete shipment',
            onClick: (_event, rowData) =>
              props.confirm(
                () => {
                  const shpmentToDelete = rowData as ShipmentBasic;
                  api()
                    .deleteShipment({
                      shipmentId: shpmentToDelete.id,
                    })
                    .then(data => {
                      if (!data.deleteShipment.error) {
                        setShipments(
                          shipments.filter(
                            shipment => shipment.id !== shpmentToDelete.id
                          )
                        );
                      }
                    });
                },
                {
                  title: 'Are you sure?',
                  description: `Are you sure you want to delete "${
                    (rowData as ShipmentBasic).title
                  }"`,
                }
              )(),
          },
        ]}
      />
    </div>
  );
};

export default withConfirm(ShipmentsTable);
