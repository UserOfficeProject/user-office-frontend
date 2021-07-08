import { Badge, BadgeProps, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import GroupIcon from '@material-ui/icons/Group';
import SchoolIcon from '@material-ui/icons/School';
import MaterialTable, { Action } from 'material-table';
import moment from 'moment';
import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';

import { UserContext } from 'context/UserContextProvider';
import {
  ProposalScheduledEvent,
  useProposalBookingsScheduledEvents,
} from 'hooks/proposalBooking/useProposalBookingsScheduledEvents';
import { User } from 'models/User';
import { StyledPaper } from 'styles/StyledComponents';
import { tableIcons } from 'utils/materialIcons';
import {
  parseTzLessDateTime,
  TZ_LESS_DATE_TIME_LOW_PREC_FORMAT,
} from 'utils/Time';

import BoxIcon from '../common/icons/BoxIcon';

const useStyles = makeStyles(() => ({
  completed: {
    color: '#000',
  },
  active: {
    color: '#000',
    '& .MuiBadge-dot': {
      background: 'red',
    },
  },
  inactive: {
    color: '#BBB',
  },
}));

function DotBadge({ children, ...rest }: BadgeProps) {
  return (
    <Badge variant="dot" overlap="circle" {...rest}>
      {children}
    </Badge>
  );
}

type ActionButtonState = 'completed' | 'active' | 'inactive' | 'invisible';

interface ActionButtonProps {
  children: React.ReactNode;
  variant: ActionButtonState;
}
function ActionButton({ children, variant: state }: ActionButtonProps) {
  const classes = useStyles();

  switch (state) {
    case 'completed':
      return <DotBadge className={classes.completed}>{children}</DotBadge>;
    case 'active':
      return <DotBadge className={classes.active}>{children}</DotBadge>;
    case 'inactive':
      return <DotBadge className={classes.inactive}>{children}</DotBadge>;
    case 'invisible':
      return <DotBadge />;
  }
}

const getParticipationRole = (
  user: User,
  event: ProposalScheduledEvent
): 'PI' | 'co-proposer' | 'visitor' | null => {
  if (event.proposal.proposer?.id === user.id) {
    return 'PI';
  } else if (event.proposal.users.map((user) => user.id).includes(user.id)) {
    return 'co-proposer';
  } else if (
    event.visit?.userVisits
      .map((userVisit) => userVisit.userId)
      .includes(user.id)
  ) {
    return 'visitor';
  } else {
    return null;
  }
};

const isPiOrCoProposer = (user: User, event: ProposalScheduledEvent) => {
  const role = getParticipationRole(user, event);

  return role === 'PI' || role === 'co-proposer';
};

export default function UserUpcomingExperimentsTable() {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const {
    loading,
    proposalScheduledEvents,
  } = useProposalBookingsScheduledEvents({
    onlyUpcoming: true,
    notDraft: true,
  });

  const columns = [
    { title: 'Proposal title', field: 'proposal.title' },
    { title: 'Proposal ID', field: 'proposal.proposalId' },
    { title: 'Instrument', field: 'instrument.name' },
    {
      title: 'Starts at',
      field: 'startsAt',
      render: (rowData: ProposalScheduledEvent) =>
        parseTzLessDateTime(rowData.startsAt).format(
          TZ_LESS_DATE_TIME_LOW_PREC_FORMAT
        ),
    },
    {
      title: 'Ends at',
      field: 'endsAt',
      render: (rowData: ProposalScheduledEvent) =>
        parseTzLessDateTime(rowData.endsAt).format(
          TZ_LESS_DATE_TIME_LOW_PREC_FORMAT
        ),
    },
  ];

  // if there are no upcoming experiments
  // just hide the whole table altogether
  if (proposalScheduledEvents.length === 0) {
    return null;
  }

  const createActionButton = (
    tooltip: string,
    icon: JSX.Element,
    state: ActionButtonState,
    onClick: () => void | undefined
  ): Action<ProposalScheduledEvent> => ({
    tooltip,
    // eslint-disable-next-line
    icon: () => <ActionButton variant={state}>{icon}</ActionButton>,
    hidden: state === 'invisible',
    disabled: state === 'inactive',
    onClick: state == 'completed' || state === 'active' ? onClick : () => {},
  });

  const formTeamAction = (event: ProposalScheduledEvent) => {
    let buttonState: ActionButtonState;

    if (isPiOrCoProposer(user, event)) {
      if (event.visit !== null) {
        buttonState = 'completed';
      } else {
        buttonState = 'active';
      }
    } else {
      buttonState = 'invisible';
    }

    return createActionButton(
      'Define who is coming',
      <GroupIcon />,
      buttonState,
      () => {
        event.visit
          ? history.push(`/MyVisits/${event.visit.id}`)
          : history.push('/MyVisits');
      }
    );
  };

  const defineVisitAction = (event: ProposalScheduledEvent) => {
    let buttonState: ActionButtonState;

    if (event.visit !== null) {
      if (
        event.visit.userVisits.find((userVisit) => userVisit.userId === user.id)
          ?.registrationQuestionaryId
      ) {
        buttonState = 'completed';
      } else {
        buttonState = 'active';
      }
    } else {
      buttonState = 'inactive';
    }

    return createActionButton(
      'Define your own visit',
      <FlightTakeoffIcon />,
      buttonState,
      () => {
        history.push('/MyVisits');
      }
    );
  };

  const individualTrainingAction = (event: ProposalScheduledEvent) => {
    let buttonState: ActionButtonState;

    if (event.visit !== null) {
      const userVisit = event.visit.userVisits.find(
        (userVisit) => userVisit.userId === user.id
      );
      const trainingExpiryDate: Date | null =
        userVisit?.trainingExpiryDate || null;

      if (moment(trainingExpiryDate) > parseTzLessDateTime(event.startsAt)) {
        buttonState = 'completed';
      } else {
        buttonState = 'active';
      }
    } else {
      buttonState = 'inactive';
    }

    return createActionButton(
      'Finish individual training',
      <SchoolIcon />,
      buttonState,
      () => {
        history.push('/training');
      }
    );
  };

  const riskAssessmentAction = (event: ProposalScheduledEvent) => {
    let buttonState: ActionButtonState;

    if (isPiOrCoProposer(user, event)) {
      if (event.visit !== null) {
        if (event.proposal.riskAssessmentQuestionary) {
          buttonState = 'completed';
        } else {
          buttonState = 'active';
        }
      } else {
        buttonState = 'inactive';
      }
    } else {
      buttonState = 'invisible';
    }

    return createActionButton(
      'Finish risk assessment',
      <BoxIcon />,
      buttonState,
      () => {
        history.push('/risk-assessment');
      }
    );
  };

  return (
    <Grid item xs={12}>
      <StyledPaper margin={[0]}>
        <MaterialTable
          actions={[
            formTeamAction,
            defineVisitAction,
            individualTrainingAction,
            riskAssessmentAction,
          ]}
          icons={tableIcons}
          title="Upcoming experiments"
          isLoading={loading}
          columns={columns}
          data={proposalScheduledEvents}
          options={{
            search: false,
            selection: false,
            padding: 'dense',
            emptyRowsWhenPaging: false,
            paging: false,
            actionsColumnIndex: -1,
          }}
        />
      </StyledPaper>
    </Grid>
  );
}
