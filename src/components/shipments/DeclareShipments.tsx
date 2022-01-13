import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import UOLoader from 'components/common/UOLoader';
import {
  QuestionnairesList,
  QuestionnairesListRow,
} from 'components/questionary/questionaryComponents/QuestionnairesList';
import { ShipmentFragment, ShipmentStatus } from 'generated/sdk';
import { useScheduledEvent } from 'hooks/scheduledEvent/useScheduledEvent';
import { useShipments } from 'hooks/shipment/useShipments';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import withConfirm, { WithConfirmProps } from 'utils/withConfirm';

import CreateUpdateShipment from './CreateUpdateShipment';

interface DeclareShipmentsProps extends WithConfirmProps {
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

function DeclareShipments({
  scheduledEventId,
  confirm,
}: DeclareShipmentsProps) {
  const { api } = useDataApiWithFeedback();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { shipments, setShipments } = useShipments({
    scheduledEventId: scheduledEventId,
  });

  const { scheduledEvent, setScheduledEvent } =
    useScheduledEvent(scheduledEventId);

  const [selectedShipment, setSelectedShipment] =
    useState<ShipmentFragment | null>(null);

  if (!shipments || !scheduledEvent) {
    return <UOLoader />;
  }

  const handleCreated = (shipment: ShipmentFragment) => {
    setShipments([...shipments, shipment]);
  };

  const handleSubmitted = (shipment: ShipmentFragment) => {
    setShipments(shipments.map((s) => (s.id === shipment.id ? shipment : s)));
  };

  const deleteShipment = (shipmentId: number) => {
    api()
      .deleteShipment({ shipmentId })
      .then((result) => {
        if (result.deleteShipment.rejection) {
          // error occurred
          return;
        }
        setShipments(shipments.filter((s) => s.id !== shipmentId));
      });
  };

  const onDeleteClicked = (item: QuestionnairesListRow) => {
    confirm(() => deleteShipment(item.id), {
      title: 'Delete Sample',
      description:
        'This action will delete the sample and all data associated with it',
    })();
  };

  const declareShipment = () => {
    api()
      .updateScheduledEventCore({
        scheduledEventId,
        isShipmentDeclared: true,
      })
      .then(({ updateScheduledEventCore }) => {
        const { scheduledEvent, rejection } = updateScheduledEventCore;
        if (rejection) {
          // error occurred
          return;
        }
        setScheduledEvent(scheduledEvent);
      });
  };

  const onDeclareShipmentClicked = () =>
    confirm(declareShipment, {
      title: 'Submit',
      description:
        'You are about to declare your shipments, no furher edits are be available',
    })();

  const onAddClicked = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Typography
        variant="h4"
        style={{ marginBottom: '12px', textAlign: 'center' }}
      >
        Declare Shipments
      </Typography>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Shipment status:{' '}
        {scheduledEvent.isShipmentDeclared ? 'Declared' : 'Not declared'}
      </Typography>
      <Typography>
        Follow the steps below to declare your shipments:
        <ol style={{ margin: 0, paddingBottom: '22px' }}>
          <li>Add all the shipments (one shipment per parcel)</li>
          <li>Declare the shipment</li>
          <li>Download labels</li>
          <li>Post the shipment</li>
        </ol>
      </Typography>
      <QuestionnairesList
        addButtonLabel="Add Shipment"
        data={shipments.map(shipmentToListRow) ?? []}
        onEditClick={(item) =>
          api()
            .getShipment({ shipmentId: item.id })
            .then(({ shipment }) => {
              setSelectedShipment(shipment);
              setIsModalOpen(true);
            })
        }
        onDeleteClick={
          scheduledEvent.isShipmentDeclared ? undefined : onDeleteClicked
        }
        onAddNewClick={
          scheduledEvent.isShipmentDeclared ? undefined : onAddClicked
        }
        style={{ maxWidth: '100%' }}
      />
      <Divider style={{ margin: '12px 0' }} />
      <Typography variant="body1" align={'right'}>
        {`${shipments.length} shipment(s)`}
      </Typography>
      <ActionButtonContainer>
        <Button
          color="primary"
          variant="contained"
          disabled={scheduledEvent.isShipmentDeclared}
          onClick={onDeclareShipmentClicked}
          data-cy="declare-shipments"
        >
          Declare shipments
        </Button>
      </ActionButtonContainer>

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
            onShipmentSubmitted={handleSubmitted}
            onShipmentCreated={handleCreated}
            scheduledEventId={scheduledEventId}
            shipment={selectedShipment}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withConfirm(DeclareShipments);
