import { useEffect, useState } from 'react';

import { GetVisitationQuery } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useVisitation(visitationId: number) {
  const [visitation, setVisitation] = useState<
    GetVisitationQuery['visitation'] | null
  >(null);

  const api = useDataApi();

  useEffect(() => {
    api()
      .getVisitation({ visitationId })
      .then((data) => {
        if (data.visitation) {
          setVisitation(data.visitation);
        }
      });
  }, [api, visitationId]);

  return { visitation };
}
