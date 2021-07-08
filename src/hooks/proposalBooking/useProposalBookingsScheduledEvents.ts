import { useEffect, useState } from 'react';

import {
  ScheduledEvent,
  Proposal,
  ProposalBookingStatus,
  Instrument,
  VisitFragment,
  Questionary,
  Maybe,
} from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';
import { toTzLessDateTime } from 'utils/Time';

import {
  BasicUserDetailsFragment,
  UserVisitFragment,
} from './../../generated/sdk';

export type ProposalScheduledEvent = Pick<
  ScheduledEvent,
  'startsAt' | 'endsAt'
> & {
  proposal: Pick<Proposal, 'primaryKey' | 'title' | 'proposalId'> & {
    proposer: BasicUserDetailsFragment | null;
  } & {
    users: BasicUserDetailsFragment[];
  } & {
    riskAssessmentQuestionary: Maybe<Pick<Questionary, 'questionaryId'>>;
  };
  instrument: Pick<Instrument, 'id' | 'name'> | null;
} & {
  visit:
    | (VisitFragment & {
        userVisits: UserVisitFragment[];
      })
    | null;
};

export function useProposalBookingsScheduledEvents({
  onlyUpcoming,
  notDraft,
  instrumentId,
}: {
  onlyUpcoming?: boolean;
  notDraft?: boolean;
  instrumentId?: number;
} = {}) {
  const [proposalScheduledEvents, setProposalScheduledEvents] = useState<
    ProposalScheduledEvent[]
  >([]);
  const [loading, setLoading] = useState(true);

  const api = useDataApi();

  useEffect(() => {
    let unmounted = false;

    setLoading(true);
    api()
      .getUserProposalBookingsWithEvents({
        ...(onlyUpcoming ? { endsAfter: toTzLessDateTime(new Date()) } : null),
        status: notDraft
          ? [ProposalBookingStatus.BOOKED, ProposalBookingStatus.CLOSED]
          : null,
        instrumentId,
      })
      .then((data) => {
        if (unmounted) {
          return;
        }

        if (data.me?.proposals) {
          const proposalScheduledEvent: ProposalScheduledEvent[] = [];
          data.me?.proposals.forEach((proposal) =>
            proposal.proposalBooking?.scheduledEvents.forEach(
              (scheduledEvent) => {
                proposalScheduledEvent.push({
                  startsAt: scheduledEvent.startsAt,
                  endsAt: scheduledEvent.endsAt,
                  proposal: {
                    primaryKey: proposal.primaryKey,
                    title: proposal.title,
                    proposalId: proposal.proposalId,
                    proposer: proposal.proposer,
                    users: proposal.users,
                    riskAssessmentQuestionary:
                      proposal.riskAssessmentQuestionary,
                  },
                  instrument: proposal.instrument,
                  visit: scheduledEvent.visit,
                });
              }
            )
          );

          setProposalScheduledEvents(proposalScheduledEvent);
        }

        setLoading(false);
      });

    return () => {
      unmounted = true;
    };
  }, [onlyUpcoming, notDraft, instrumentId, api]);

  return { loading, proposalScheduledEvents };
}
