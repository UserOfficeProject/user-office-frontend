import { useEffect, useState } from 'react';

import { Proposal } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useUserProposals() {
  const [proposals, setProposals] = useState<
    Pick<
      Proposal,
      | 'id'
      | 'shortCode'
      | 'title'
      | 'publicStatus'
      | 'statusId'
      | 'created'
      | 'finalStatus'
      | 'notified'
      | 'submitted'
    >[]
  >([]);
  const [loading, setLoading] = useState(true);

  const api = useDataApi();

  useEffect(() => {
    setLoading(true);
    api()
      .getUserProposals()
      .then(data => {
        if (data.me) {
          setProposals(data.me.proposals);
        }
        setLoading(false);
      });
  }, [api]);

  return { loading, proposals, setProposals };
}
