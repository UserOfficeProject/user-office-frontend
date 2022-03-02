import { DateType } from '@date-io/type';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import { Field } from 'formik';
import { DatePicker, DateTimePicker } from 'formik-mui-lab';
import React from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { DateConfig } from 'generated/sdk';

import Hint from '../Hint';

export function QuestionaryComponentDatePicker(props: BasicComponentProps) {
  const { answer, onComplete } = props;
  const {
    question: { id, question },
  } = answer;
  const { tooltip, required } = answer.config as DateConfig;

  const dateFormat = 'yyyy-MM-dd';
  const timeFormat = `${dateFormat} HH:mm`;

  const getDateField = () => (
    <Field
      required={required}
      data-cy={`${id}.value`}
      id={`${id}-id`}
      name={id}
      label={question}
      format={dateFormat}
      component={DatePicker}
      variant="inline"
      disableToolbar
      autoOk={true}
      // TODO: Use the right type from the change event
      onChange={(date: any) => {
        /*
        DateFnsUtils correct type is Date | null, but use of Luxon elsewhere (in call modal)
        causes incorrect type inference: https://github.com/dmtrKovalenko/date-io/issues/584
        */
        const newDate = date as unknown as Date;
        newDate?.setHours(0, 0, 0, 0); // omit time
        onComplete(newDate);
      }}
    />
  );

  const getDateTimeField = () => (
    <>
      <Field
        required={required}
        data-cy={`${id}.value`}
        id={`${id}-id`}
        name={id}
        label={question}
        format={timeFormat}
        component={DateTimePicker}
        onChange={(date: DateType | null) => {
          onComplete(date);
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
