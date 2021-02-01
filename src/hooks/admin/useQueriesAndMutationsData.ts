import { useEffect, useState } from 'react';

import { QueriesAndMutations } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useQueriesAndMutationsData(): {
  loadingQueriesAndMutations: boolean;
  queriesAndMutations: QueriesAndMutations;
} {
  const [queriesAndMutations, setQueriesAndMutations] = useState<
    QueriesAndMutations
  >({ queries: [], mutations: [] });
  const [loadingQueriesAndMutations, setLoadingQueriesAndMutations] = useState(
    true
  );

  const api = useDataApi();

  useEffect(() => {
    setLoadingQueriesAndMutations(true);
    api()
      .getAllQueriesAndMutations()
      .then(data => {
        setQueriesAndMutations(data.queriesAndMutations as QueriesAndMutations);
        setLoadingQueriesAndMutations(false);
      });
  }, [api]);

  return { loadingQueriesAndMutations, queriesAndMutations };
}
