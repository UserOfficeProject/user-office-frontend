import { DateType } from '@date-io/type';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import { Field } from 'formik';
import { DatePicker, DateTimePicker } from 'formik-mui-lab';
import { DateTime } from 'luxon';
import React from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { DateConfig } from 'generated/sdk';

import Hint from '../Hint';

export function QuestionaryComponentDatePicker(props: BasicComponentProps) {
  const { answer, onComplete } = props;
  const {
    question: { id, question },
  } = answer;
  const { tooltip, required, minDate, maxDate } = answer.config as DateConfig;

  const dateFormat = 'yyyy-MM-dd';
  const timeFormat = `${dateFormat} HH:mm`;

  console.log('aaaaaaa', question, answer);

  debugger;

  const getDateField = () => (
    <Field
      required={required}
      id={`${id}-id`}
      name={id}
      label={question}
      inputFormat={dateFormat}
      component={DatePicker}
      disableToolbar
      autoOk={true}
      onChange={(date: DateTime) => onComplete(date.startOf('day'))}
      textField={{
        'data-cy': `${id}.value`,
        required: required,
      }}
      // minDate={minDate}
      // maxDate={maxDate}
    />
  );

  const getDateTimeField = () => (
    <>
      <Field
        required={required}
        id={`${id}-id`}
        name={id}
        label={question}
        inputFormat={timeFormat}
        component={DateTimePicker}
        onChange={(date: DateType | null) => {
          onComplete(date);
        }}
        textField={{
          'data-cy': `${id}.value`,
          required: required,
        }}
      />
    </>
  );

  return (
    <FormControl margin="dense">
      <LocalizationProvider dateAdapter={DateAdapter}>
        {(answer.config as DateConfig).includeTime
          ? getDateTimeField()
          : getDateField()}
      </LocalizationProvider>
      <Hint>{tooltip}</Hint>
    </FormControl>
  );
}
