import { DatePickerProps, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { FormControl, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DateTime } from 'luxon';
import React from 'react';

import PresetDateSelector, { TimeSpan } from './PresetDateSelector';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    flexDirection: 'row',
    display: 'flex',
  },
  datePicker: {
    marginRight: theme.spacing(1),
  },
}));

const FilterDatePicker = (props: Omit<DatePickerProps, 'renderInput'>) => (
  <DesktopDatePicker
    renderInput={(tfProps) => (
      <TextField {...tfProps} style={{ margin: '0 16px 16px 0' }} />
    )}
    {...props}
  />
);

export function getRelativeDatesFromToday(period: TimeSpan): {
  from?: Date;
  to?: Date;
} {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let from: Date | undefined;
  let to: Date | undefined;
  const DAY_IN_MS = 1000 * 60 * 60 * 24;
  switch (period) {
    case TimeSpan.TODAY:
      from = today;
      to = new Date(today.getTime() + 1 * DAY_IN_MS);
      break;
    case TimeSpan.NEXT_WEEK:
      from = today;
      to = new Date(today.getTime() + 7 * DAY_IN_MS);
      break;
    case TimeSpan.NEXT_MONTH:
      from = today;
      to = new Date(today.getTime() + 30 * DAY_IN_MS);
      break;
    case TimeSpan.NONE:
      from = undefined;
      to = undefined;
      break;
    default:
      throw new Error(`Unknown period: ${period}`);
  }

  return { from, to };
}

interface DateFilterProps {
  from?: Date;
  to?: Date;
  onChange: (from?: Date, to?: Date) => void;
}

function DateFilter(props: DateFilterProps) {
  const classes = useStyles();
  const [presetValue, setPresetValue] = React.useState<TimeSpan | null>(null);

  return (
    <FormControl className={classes.formControl}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <FilterDatePicker
          label="From"
          value={props.from ?? null}
          onChange={(startsAt) => {
            props.onChange((startsAt as DateTime).toJSDate(), props.to);
            setPresetValue(null);
          }}
          className={classes.datePicker}
          data-cy="from-date-picker"
        />

        <FilterDatePicker
          label="To"
          value={props.to ?? null}
          onChange={(endsAt) =>
            props.onChange(props.from, (endsAt as DateTime).toJSDate())
          }
          className={classes.datePicker}
          data-cy="to-date-picker"
        />
        <PresetDateSelector
          value={presetValue}
          setValue={(val) => {
            const { from, to } = getRelativeDatesFromToday(val);
            props.onChange(from, to);
            setPresetValue(val);
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default DateFilter;
