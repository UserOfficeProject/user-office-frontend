import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import { FormControl, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DateTime } from 'luxon';
import React, { useContext } from 'react';

import { SettingsContext } from 'context/SettingsContextProvider';
import { SettingsId } from 'generated/sdk';

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

export function getRelativeDatesFromToday(period: TimeSpan): {
  from?: Date;
  to?: Date;
} {
  const today = DateTime.local().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  let from: DateTime | undefined;
  let to: DateTime | undefined;
  switch (period) {
    case TimeSpan.TODAY:
      from = today;
      to = today.plus({ days: 1 });
      break;
    case TimeSpan.NEXT_7_DAYS:
      from = today;
      to = today.plus({ days: 7 });
      break;
    case TimeSpan.NEXT_30_DAYS:
      from = today;
      to = today.plus({ days: 30 });
      break;
    case TimeSpan.NONE:
      from = undefined;
      to = undefined;
      break;
    default:
      throw new Error(`Unknown period: ${period}`);
  }

  return { from: from?.toJSDate(), to: to?.toJSDate() };
}

interface DateFilterProps {
  from?: Date;
  to?: Date;
  onChange: (from?: Date, to?: Date) => void;
}

function DateFilter(props: DateFilterProps) {
  const classes = useStyles();
  const [presetValue, setPresetValue] = React.useState<TimeSpan | null>(null);
  const { settings } = useContext(SettingsContext);
  const inputDateFormat =
    settings.get(SettingsId.DATE_FORMAT)?.settingsValue ?? 'yyyy-MM-dd';

  return (
    <FormControl className={classes.formControl}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          inputFormat={inputDateFormat}
          label="From"
          value={props.from ?? null}
          onChange={(startsAt: unknown) => {
            props.onChange((startsAt as DateTime)?.toJSDate(), props.to);
            setPresetValue(null);
          }}
          className={classes.datePicker}
          renderInput={(tfProps) => (
            <TextField
              {...tfProps}
              style={{ margin: '0 16px 16px 0' }}
              data-cy="from-date-picker"
            />
          )}
        />

        <DatePicker
          inputFormat={inputDateFormat}
          label="To"
          value={props.to ?? null}
          onChange={(endsAt: unknown) =>
            props.onChange(props.from, (endsAt as DateTime)?.toJSDate())
          }
          className={classes.datePicker}
          renderInput={(tfProps) => (
            <TextField
              {...tfProps}
              style={{ margin: '0 16px 16px 0' }}
              data-cy="to-date-picker"
            />
          )}
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
