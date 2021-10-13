import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import NavigateNext from '@material-ui/icons/NavigateNext';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router';

import { Call } from 'generated/sdk';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';
import { daysRemaining } from 'utils/Time';

const useStyles = makeStyles(() => ({
  date: {
    display: 'block',
    fontStyle: 'italic',
  },
}));

type ProposalChooseCallProps = {
  callsData: Call[];
};

const getDaysRemainingText = (daysRemaining: number) => {
  if (daysRemaining <= 1) {
    return '(last day remaining)';
  } else if (daysRemaining > 1 && daysRemaining < 30) {
    return `(${daysRemaining} days remaining)`;
  } else {
    return '';
  }
};

const ProposalChooseCall: React.FC<ProposalChooseCallProps> = ({
  callsData,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const handleSelect = (callId: number, templateId: number | null) => {
    const url = `/ProposalCreate/${callId}/${templateId}`;
    history.push(url);
  };

  const formatDate = (date: Date) => {
    return dateformat(new Date(date), 'dd-mmm-yyyy');
  };

  return (
    <ContentContainer>
      <StyledPaper margin={[0]}>
        <Typography variant="h6" component="h2" gutterBottom>
          Select a call
        </Typography>
        <List data-cy="call-list">
          {callsData.map((call) => {
            const daysRemainingNum = daysRemaining(new Date(call.endCall));
            const daysRemainingText = getDaysRemainingText(daysRemainingNum);

            const header =
              call.title === null || call.title === '' ? (
                <Typography variant="h6" component="h3">
                  {call.shortCode}
                </Typography>
              ) : (
                <Typography variant="h6" component="h3">
                  {call.title} <small> ({call.shortCode}) </small>
                </Typography>
              );

            return (
              <ListItem
                button
                key={call.id}
                onClick={() => handleSelect(call.id, call.templateId)}
                divider={true}
              >
                <ListItemText
                  primary={header}
                  secondary={
                    <Fragment>
                      <Typography component="div" className={classes.date}>
                        {`Application deadline: ${formatDate(
                          call.endCall
                        )} ${daysRemainingText}`}
                      </Typography>
                      <Typography component="div">
                        {call.description}
                      </Typography>
                      <Typography component="div">
                        {call.cycleComment}
                      </Typography>
                    </Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label={'Select ' + call.shortCode}
                    onClick={() => handleSelect(call.id, call.templateId)}
                  >
                    <NavigateNext />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </StyledPaper>
    </ContentContainer>
  );
};

ProposalChooseCall.propTypes = {
  callsData: PropTypes.array.isRequired,
};

export default ProposalChooseCall;
