import { makeStyles } from '@material-ui/core';
import React from 'react';

import DotBadge from './DotBadge';

export type ActionButtonState =
  | 'completed'
  | 'active'
  | 'inactive'
  | 'invisible';

interface ActionButtonProps {
  children: React.ReactNode;
  variant: ActionButtonState;
}

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

const ActionButton = ({ children, variant: state }: ActionButtonProps) => {
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
};

export default ActionButton;
