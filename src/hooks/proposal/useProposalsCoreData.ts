import { getTranslation, ResourceId } from '@esss-swap/duo-localisation';
import { useEffect, useState } from 'react';

import { ProposalsFilter, ProposalView } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useProposalsCoreData(
  filter: ProposalsFilter,
  first?: number,
  offset?: number
) {
  const api = useDataApi();
  const [proposalsData, setProposalsData] = useState<ProposalViewData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
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
    let unmounted = false;

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
        first,
        offset,
      })
      .then((data) => {
        if (unmounted) {
          return;
        }

        if (data.proposalsView) {
          setProposalsData(
            data.proposalsView.proposalViews.map((proposal) => {
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
          setTotalCount(data.proposalsView.totalCount);
        }

        setLoading(false);

        return () => {
          unmounted = true;
        };
      });
  }, [
    callId,
    instrumentId,
    proposalStatusId,
    questionaryIds,
    text,
    questionFilter,
    api,
    first,
    offset,
  ]);

  return { loading, proposalsData, setProposalsData, totalCount };
}

export interface ProposalViewData
  extends Omit<ProposalView, 'status' | 'technicalStatus'> {
  status: string;
  technicalStatus: string;
}
