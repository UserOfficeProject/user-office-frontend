import { useEffect, useState } from 'react';

import { useDataApi } from 'hooks/common/useDataApi';
import { EsiWithQuestionary } from 'models/questionary/esi/EsiWithQuestionary';

export function useEsi(esiId: number) {
  const [esi, setEsi] = useState<EsiWithQuestionary | null>(null);
  const [loading, setLoading] = useState(true);

  const api = useDataApi();

  useEffect(() => {
    let cancelled = false;

    if (esiId) {
      setLoading(true);
      api()
        .getEsi({ esiId })
        .then((data) => {
          if (cancelled) {
            return;
          }

          setEsi(data.esi);
          setLoading(false);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [esiId, api]);

  return { loading, esi, setEsi };
}
