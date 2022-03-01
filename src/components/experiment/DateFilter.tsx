import LuxonUtils from '@date-io/luxon';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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

const DatePicker = (props: KeyboardDatePickerProps) => (
  <KeyboardDatePicker
    disableToolbar
    variant="inline"
    format="yyyy-MM-dd"
    margin="none"
    autoOk
    defaultValue={null}
    {...props}
  />
);

function getRelativeDatesFromToday(period: TimeSpan): {
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
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <DatePicker
          label="From"
          value={props.from ?? null}
          onChange={(startsAt) => {
            props.onChange(startsAt?.toJSDate(), props.to);
            setPresetValue(null);
          }}
          className={classes.datePicker}
          data-cy="from-date-picker"
        />

        <DatePicker
          label="To"
          value={props.to ?? null}
          onChange={(endsAt) => props.onChange(props.from, endsAt?.toJSDate())}
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
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}

export default DateFilter;
