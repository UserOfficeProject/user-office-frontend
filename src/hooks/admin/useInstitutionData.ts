import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { Institution } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useInstitutionsData(): {
  loadingInstitutions: boolean;
  institutions: Institution[];
  setInstitutionsWithLoading: Dispatch<SetStateAction<Institution[]>>;
} {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);

  const api = useDataApi();

  const setInstitutionsWithLoading = (data: SetStateAction<Institution[]>) => {
    setLoadingInstitutions(true);
    setInstitutions(data);
    setLoadingInstitutions(false);
  };

  useEffect(() => {
    let unmounted = false;

    setLoadingInstitutions(true);
    api()
      .getInstitutions()
      .then((data) => {
        if (unmounted) {
          return;
        }

        setInstitutions(data.institutions as Institution[]);
        setLoadingInstitutions(false);
      });

    return () => {
      unmounted = true;
    };
  }, [api]);

  return { loadingInstitutions, institutions, setInstitutionsWithLoading };
}
