import { useEffect, useState, SetStateAction, Dispatch } from 'react';

import { ProposalStatus } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useProposalStatusesData(): {
  loadingProposalStatuses: boolean;
  proposalStatuses: ProposalStatus[];
  setProposalStatusesWithLoading: Dispatch<SetStateAction<ProposalStatus[]>>;
} {
  const [proposalStatuses, setProposalStatuses] = useState<ProposalStatus[]>(
    []
  );
  const [loadingProposalStatuses, setLoadingProposalStatuses] = useState(true);

  const api = useDataApi();

  const setProposalStatusesWithLoading = (
    data: SetStateAction<ProposalStatus[]>
  ) => {
    setLoadingProposalStatuses(true);
    setProposalStatuses(data);
    setLoadingProposalStatuses(false);
  };

  useEffect(() => {
    setLoadingProposalStatuses(true);
    api()
      .getProposalStatuses()
      .then(data => {
        if (data.proposalStatuses) {
          setProposalStatuses(data.proposalStatuses as ProposalStatus[]);
        }
        setLoadingProposalStatuses(false);
      });
  }, [api]);

  return {
    loadingProposalStatuses,
    proposalStatuses,
    setProposalStatusesWithLoading,
  };
}
