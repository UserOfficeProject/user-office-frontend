import { getTranslation, ResourceId } from '@esss-swap/duo-localisation';
import { useEffect, useState } from 'react';

import { ProposalsFilter, ProposalView } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useProposalsCoreData(filter: ProposalsFilter) {
  const api = useDataApi();
  const [proposalsData, setProposalsData] = useState<ProposalViewData[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    callId,
    instrumentId,
    proposalStatusId,
    questionaryIds,
    text,
    questionFilter,
  } = filter;

  useEffect(() => {
    setLoading(true);
    api()
      .getProposalsCore({
        filter: {
          callId,
          instrumentId,
          proposalStatusId,
          questionaryIds,
          questionFilter: questionFilter && {
            ...questionFilter,
            value:
              JSON.stringify({ value: questionFilter?.value }) ?? undefined,
          }, // We wrap the value in JSON formatted string, because GraphQL can not handle UnionType input
          text,
        },
      })
      .then(data => {
        if (data.proposalsView) {
          setProposalsData(
            data.proposalsView.map(proposal => {
              return {
                ...proposal,
                status: proposal.submitted ? 'Submitted' : 'Open',
                technicalStatus: getTranslation(
                  proposal.technicalStatus as ResourceId
                ),
                finalStatus: getTranslation(proposal.finalStatus as ResourceId),
              } as ProposalViewData;
            })
          );
        }
        setLoading(false);
      });
  }, [
    callId,
    instrumentId,
    proposalStatusId,
    questionaryIds,
    text,
    questionFilter,
    api,
  ]);

  return { loading, proposalsData, setProposalsData };
}

export interface ProposalViewData
  extends Omit<ProposalView, 'status' | 'technicalStatus'> {
  status: string;
  technicalStatus: string;
}
