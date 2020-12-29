import { useEffect, useState } from 'react';

import { GetShipmentsQuery, ShipmentsFilter } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useShipmentsData(filter?: ShipmentsFilter) {
  const [shipmentsFilter, setShipmentsFilter] = useState(filter);
  const [shipments, setShipments] = useState<GetShipmentsQuery['shipments']>();
  const [loadingShipments, setLoadingShipments] = useState(true);

  const api = useDataApi();

  useEffect(() => {
    api()
      .getShipments({ filter: shipmentsFilter })
      .then(data => {
        if (data.shipments) {
          setShipments(data.shipments);
        }
        setLoadingShipments(false);
      });
  }, [api, shipmentsFilter]);

  return { loadingShipments, shipments, setShipments, setShipmentsFilter };
}
