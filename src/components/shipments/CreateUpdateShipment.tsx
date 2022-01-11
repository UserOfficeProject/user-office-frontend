import React from 'react';

import { VisitFragment } from 'generated/sdk';
import { ShipmentCore } from 'models/questionary/shipment/ShipmentCore';

import CreateShipment from './CreateShipment';
import UpdateShipment from './UpdateShipment';

type CreateUpdateShipmentProps = {
  onShipmentSubmitted: (shipment: ShipmentCore) => void;
  onShipmentCreated: (shipment: ShipmentCore) => void;
  visit: VisitFragment & {
    shipments: ShipmentCore[];
  };
};

function CreateUpdateShipment({
  visit,
  onShipmentSubmitted,
  onShipmentCreated,
}: CreateUpdateShipmentProps) {
  if (visit.shipments.length > 1) {
    return <span>Multiple shipments per visit is not supported yet</span>;
  }

  const shipment = visit.shipments[0]; // currently only supporting 1 shipment per visit

  return shipment ? (
    <UpdateShipment
      shipment={shipment}
      onShipmentSubmitted={onShipmentSubmitted}
    />
  ) : (
    <CreateShipment
      visit={visit}
      onShipmentSubmitted={onShipmentSubmitted}
      onShipmentCreated={onShipmentCreated}
    />
  );
}

export default CreateUpdateShipment;
