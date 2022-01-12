import { BadgeProps, Badge } from '@material-ui/core';
import React from 'react';

const CheckBadge = ({ children, ...rest }: BadgeProps) => {
  return (
    <Badge badgeContent="✔" overlap="circular" {...rest}>
      {children}
    </Badge>
  );
};

export default CheckBadge;
