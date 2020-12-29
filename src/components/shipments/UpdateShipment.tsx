import React from 'react';

import UOLoader from 'components/common/UOLoader';
import { useShipment } from 'hooks/shipment/useShipment';
import { ShipmentBasic } from 'models/ShipmentSubmissionState';

import ShipmentContainer from './ShipmentContainer';

function UpdateShipment(props: { shipment: ShipmentBasic }) {
  const { shipment } = useShipment(props.shipment.id);

  if (!shipment) {
    return <UOLoader />;
  }

  return <ShipmentContainer shipment={shipment} />;
}

export default UpdateShipment;
