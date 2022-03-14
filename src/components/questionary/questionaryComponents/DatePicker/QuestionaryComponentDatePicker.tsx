import { DateType } from '@date-io/type';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import useTheme from '@mui/material/styles/useTheme';
import { Field } from 'formik';
import { DatePicker, DateTimePicker } from 'formik-mui-lab';
import { DateTime } from 'luxon';
import React, { useContext } from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { SettingsContext } from 'context/SettingsContextProvider';
import { DateConfig, SettingsId } from 'generated/sdk';

import Hint from '../Hint';

export function QuestionaryComponentDatePicker(props: BasicComponentProps) {
  const theme = useTheme();
  const { settings } = useContext(SettingsContext);
  const dateFormat = settings.get(SettingsId.DATE_FORMAT)?.settingsValue;
  const dateMask = dateFormat?.replace(/[a-zA-Z]/g, '_');
  const dateTimeFormat = settings.get(
    SettingsId.DATE_TIME_FORMAT
  )?.settingsValue;
  const dateTimeMask = dateTimeFormat?.replace(/[a-zA-Z]/g, '_');
  const { answer, onComplete } = props;
  const {
    question: { id, question },
  } = answer;
  const { tooltip, required, minDate, maxDate, includeTime } =
    answer.config as DateConfig;

  const fieldMinDate = minDate
    ? DateTime.fromISO(minDate).startOf(includeTime ? 'minute' : 'day')
    : null;
  const fieldMaxDate = maxDate
    ? DateTime.fromISO(maxDate).startOf(includeTime ? 'minute' : 'day')
    : null;

  const getDateField = () => (
    <Field
      required={required}
      id={`${id}-id`}
      name={id}
      label={question}
      inputFormat={dateFormat}
      mask={dateMask}
      component={DatePicker}
      inputProps={{ placeholder: dateFormat }}
      ampm={false}
      disableToolbar
      autoOk={true}
      onChange={(date: DateTime) => date && onComplete(date.startOf('day'))}
      textField={{
        'data-cy': `${id}.value`,
        required: required,
      }}
      minDate={fieldMinDate}
      maxDate={fieldMaxDate}
      desktopModeMediaQuery={theme.breakpoints.up('sm')}
    />
  );

  const getDateTimeField = () => (
    <Field
      required={required}
      id={`${id}-id`}
      name={id}
      label={question}
      ampm={false}
      inputFormat={dateTimeFormat}
      mask={dateTimeMask}
      component={DateTimePicker}
      inputProps={{ placeholder: dateTimeFormat }}
      onChange={(date: DateType | null) => {
        date && onComplete(date);
      }}
      textField={{
        'data-cy': `${id}.value`,
        required: required,
      }}
      minDate={fieldMinDate}
      maxDate={fieldMaxDate}
      desktopModeMediaQuery={theme.breakpoints.up('sm')}
    />
  );

  return (
    <FormControl margin="dense">
      <LocalizationProvider dateAdapter={DateAdapter}>
        {includeTime ? getDateTimeField() : getDateField()}
      </LocalizationProvider>
      <Hint>{tooltip}</Hint>
    </FormControl>
  );
}
