import { Dialog, DialogContent, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import UOLoader from 'components/common/UOLoader';
import {
  QuestionnairesList,
  QuestionnairesListRow,
} from 'components/questionary/questionaryComponents/QuestionnairesList';
import { ShipmentFragment, ShipmentStatus } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';
import { useShipments } from 'hooks/shipment/useShipments';

import CreateUpdateShipment from './CreateUpdateShipment';

interface DeclareShipmentsProps {
  scheduledEventId: number;
}

const shipmentToListRow = (
  shipment: ShipmentFragment
): QuestionnairesListRow => {
  return {
    id: shipment.id,
    label: shipment.title,
    isCompleted: shipment.status === ShipmentStatus.SUBMITTED,
  };
};

function DeclareShipments({ scheduledEventId }: DeclareShipmentsProps) {
  const api = useDataApi();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { shipments, setShipments } = useShipments({
    scheduledEventId: scheduledEventId,
  });

  const [selectedShipment, setSelectedShipment] =
    useState<ShipmentFragment | null>(null);

  if (!shipments) {
    return <UOLoader />;
  }

  const handleShipmentCreated = (shipment: ShipmentFragment) => {
    setIsModalOpen(false);
    setShipments([...shipments, shipment]);
  };

  return (
    <div>
      <Typography variant="h4">Declare Shipments</Typography>
      <QuestionnairesList
        addButtonLabel="Add Shipment"
        data={shipments.map(shipmentToListRow) ?? []}
        maxEntries={3}
        onEditClick={(item) =>
          api()
            .getShipment({ shipmentId: item.id })
            .then(({ shipment }) => {
              setSelectedShipment(shipment);
              setIsModalOpen(true);
            })
        }
        // onDeleteClick={(item) => {
        //   confirm(() => api().deleteShipment(item.id), {
        //     title: 'Delete Sample',
        //     description:
        //       'This action will delete the sample and all data associated with it',
        //   })();
        // }}
        // onCloneClick={(item) => {
        //   prompt((answer) => copySample(item.id, answer), {
        //     question: 'Title',
        //     prefilledAnswer: `Copy of ${item.label}`,
        //   })();
        // }}
        onAddNewClick={() => {
          setIsModalOpen(true);
        }}
      />

      <Dialog
        aria-labelledby="shipment-declaration"
        aria-describedby="shipment-declaration-description"
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedShipment(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <CreateUpdateShipment
            //onShipmentSubmitted={onShipmentUpdated}
            onShipmentCreated={handleShipmentCreated}
            scheduledEventId={scheduledEventId}
            shipment={selectedShipment}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeclareShipments;
