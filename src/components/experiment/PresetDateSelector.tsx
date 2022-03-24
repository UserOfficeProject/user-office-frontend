import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export enum TimeSpan {
  TODAY = 'TODAY',
  NEXT_WEEK = 'NEXT_WEEK',
  NEXT_MONTH = 'NEXT_MONTH',
  NONE = 'NONE',
}
interface PresetDateSelectorProps {
  value: string | null;
  setValue: (value: TimeSpan) => void;
}
function PresetDateSelector({ value, setValue }: PresetDateSelectorProps) {
  return (
    <StyledToggleButtonGroup
      size="small"
      value={value}
      exclusive
      onChange={(_e, val) => setValue(val)}
    >
      <ToggleButton value={TimeSpan.TODAY}>Today</ToggleButton>
      <ToggleButton value={TimeSpan.NEXT_WEEK}>Next 7 days</ToggleButton>
      <ToggleButton value={TimeSpan.NEXT_MONTH}>Next 30 days</ToggleButton>
      <ToggleButton value={TimeSpan.NONE}>All</ToggleButton>
    </StyledToggleButtonGroup>
  );
}

export default PresetDateSelector;
