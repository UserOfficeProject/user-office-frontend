import React from 'react';

import { VisitFragment } from 'generated/sdk';
import { ShipmentBasic } from 'models/ShipmentSubmissionState';

import CreateShipment from './CreateShipment';
import UpdateShipment from './UpdateShipment';

type CreateUpdateShipmentProps = {
  close: (shipment: ShipmentBasic | null) => void;
  visit: VisitFragment & {
    shipments: ShipmentBasic[];
  };
};

function CreateUpdateShipment({ visit, close }: CreateUpdateShipmentProps) {
  if (visit.shipments.length > 1) {
    return <span>Multiple shipments per visit is not supported yet</span>;
  }

  const shipment = visit.shipments[0]; // currently only supporting 1 shipment per visit

  return shipment ? (
    <UpdateShipment shipment={shipment} close={close} />
  ) : (
    <CreateShipment close={close} visit={visit} />
  );
}

export default CreateUpdateShipment;
