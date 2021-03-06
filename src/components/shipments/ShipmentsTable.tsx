import { Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import GetAppIcon from '@material-ui/icons/GetApp';
import React from 'react';
import { useQueryParams } from 'use-query-params';

import {
  DefaultQueryParams,
  SuperMaterialTable,
  UrlQueryParamsType,
} from 'components/common/SuperMaterialTable';
import UOLoader from 'components/common/UOLoader';
import { ShipmentFragment, ShipmentStatus } from 'generated/sdk';
import { useDownloadPDFShipmentLabel } from 'hooks/proposal/useDownloadPDFShipmentLabel';
import { useMyShipments } from 'hooks/shipment/useMyShipments';
import { ShipmentBasic } from 'models/ShipmentSubmissionState';
import { tableIcons } from 'utils/materialIcons';
import { tableLocalization } from 'utils/materialLocalization';
import { timeAgo } from 'utils/Time';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

import CreateUpdateShipment from './CreateUpdateShipment';

const ShipmentsTable = (props: { confirm: WithConfirmType }) => {
  const { loadingMyShipments, myShipments, setMyShipments } = useMyShipments();
  const downloadShipmentLabel = useDownloadPDFShipmentLabel();
  const [
    urlQueryParams,
    setUrlQueryParams,
  ] = useQueryParams<UrlQueryParamsType>(DefaultQueryParams);
  const { api } = useDataApiWithFeedback();

  if (!myShipments) {
    return <UOLoader />;
  }

  const columns = [
    {
      title: 'Proposal ID',
      field: 'proposal.proposalId',
    },
    { title: 'Title', field: 'title' },
    { title: 'Status', field: 'status' },
    {
      title: 'Created',
      field: 'created',
      render: (rowData: ShipmentBasic): string => timeAgo(rowData.created),
    },
  ];

  const deleteHandler = (shipmentToDelete: ShipmentBasic) => {
    props.confirm(
      () => {
        api()
          .deleteShipment({
            shipmentId: shipmentToDelete.id,
          })
          .then((data) => {
            if (!data.deleteShipment.rejection) {
              setMyShipments(
                myShipments.filter(
                  (shipment) => shipment.id !== shipmentToDelete.id
                )
              );
            }
          });
      },
      {
        title: 'Are you sure?',
        description: `Are you sure you want to delete "${shipmentToDelete.title}"`,
      }
    )();
  };

  const createModal = (
    onUpdate: (object: ShipmentBasic | null) => void,
    onCreate: (object: ShipmentBasic | null) => void,
    editShipment: ShipmentBasic | null
  ) => (
    <CreateUpdateShipment
      shipment={editShipment}
      close={async () => {
        /**
         * Reloading myShipments
         */
        const result = await api().getMyShipments();

        if (result.myShipments) {
          setMyShipments(result.myShipments);
        }
      }}
    />
  );

  return (
    <div data-cy="shipments-table">
      <SuperMaterialTable
        setData={setMyShipments}
        createModal={createModal}
        hasAccess={{ update: true, create: true, remove: true }}
        icons={tableIcons}
        localization={tableLocalization}
        title={
          <Typography variant="h6" component="h2">
            Shipments
          </Typography>
        }
        columns={columns}
        isLoading={loadingMyShipments}
        data={myShipments}
        urlQueryParams={urlQueryParams}
        setUrlQueryParams={setUrlQueryParams}
        actions={[
          (rowData) =>
            rowData.status === ShipmentStatus.DRAFT
              ? {
                  icon: Delete,
                  tooltip: 'Delete shipment',
                  onClick: (_event, rowData) =>
                    deleteHandler(rowData as ShipmentBasic),
                }
              : {
                  icon: GetAppIcon,
                  tooltip: 'Download label',
                  onClick: (_event, rowData) => {
                    const clickedEntry = rowData as ShipmentFragment;
                    downloadShipmentLabel(
                      [clickedEntry.id],
                      clickedEntry.title
                    );
                  },
                },
        ]}
      />
    </div>
  );
};

export default withConfirm(ShipmentsTable);
