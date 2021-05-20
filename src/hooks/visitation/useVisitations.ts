import { useEffect, useState } from 'react';

import { VisitationsFilter } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';
import { VisitationBasic } from 'models/VisitationSubmissionState';

export function useVisitations(filter?: VisitationsFilter) {
  const [visitationsFilter, setVisitationsFilter] = useState(filter);
  const [visitations, setVisitations] = useState<VisitationBasic[]>([]);
  const [loadingVisitations, setLoadingVisitations] = useState(true);

  const api = useDataApi();

  useEffect(() => {
    setLoadingVisitations(true);
    api()
      .getVisitations({ filter: visitationsFilter })
      .then((data) => {
        if (data.visitations) {
          setVisitations(data.visitations);
        }
        setLoadingVisitations(false);
      });
  }, [api, visitationsFilter]);

  return {
    loadingVisitations,
    visitations,
    setVisitations,
    setVisitationsFilter,
  };
}
