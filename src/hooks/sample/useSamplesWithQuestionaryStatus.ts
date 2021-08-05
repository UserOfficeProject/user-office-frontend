import { useEffect, useState } from 'react';

import { SamplesFilter } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

import { SampleWithQuestionaryStatus } from '../../models/questionary/sample/Sample';

export function useSamplesWithQuestionaryStatus(filter?: SamplesFilter) {
  const [samples, setSamples] = useState<SampleWithQuestionaryStatus[]>([]);

  const [samplesFilter, setSamplesFilter] = useState(filter);
  const [loadingSamples, setLoadingSamples] = useState(false);
  const api = useDataApi();

  useEffect(() => {
    let unmounted = false;

    setLoadingSamples(true);
    api()
      .getSamplesWithQuestionaryStatus({ filter: samplesFilter })
      .then((data) => {
        if (unmounted) {
          return;
        }
        if (data.samples) {
          setSamples(data.samples);
        }
        setLoadingSamples(false);
      });

    return () => {
      unmounted = true;
    };
  }, [api, samplesFilter]);

  return { samples, loadingSamples, setSamples, setSamplesFilter };
}
