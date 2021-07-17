import { useEffect, useState } from 'react';

import { useDataApi } from 'hooks/common/useDataApi';

import { GetVisitRegistrationQuery } from './../../generated/sdk';

export function useVisitRegistration(visitId: number) {
  const [registration, setRegistration] = useState<
    GetVisitRegistrationQuery['userVisit'] | null
  >(null);

  const api = useDataApi();

  useEffect(() => {
    let unmounted = false;

    api()
      .getVisitRegistration({ visitId })
      .then((data) => {
        if (unmounted) {
          return;
        }
        if (data.userVisit) {
          setRegistration(data.userVisit);
        }
      });

    return () => {
      unmounted = true;
    };
  }, [api, visitId]);

  return { registration };
}
