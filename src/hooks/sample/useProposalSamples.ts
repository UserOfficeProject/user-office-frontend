import { useEffect, useState } from 'react';

import { useDataApi } from 'hooks/common/useDataApi';
import { SampleWithQuestionaryStatus } from 'models/Sample';

export function useProposalSamples(proposalPK: number | null) {
  const [samples, setSamples] = useState<SampleWithQuestionaryStatus[]>([]);

  const [loadingSamples, setLoadingSamples] = useState(false);
  const api = useDataApi();

  useEffect(() => {
    if (!proposalPK) {
      setSamples([]);

      return;
    }
    setLoadingSamples(true);
    api()
      .getSamplesWithQuestionaryStatus({ filter: { proposalPK } })
      .then((data) => {
        if (data.samples) {
          setSamples(data.samples);
        }
        setLoadingSamples(false);
      });
  }, [api, proposalPK]);

  return { samples, loadingSamples, setSamples };
}
