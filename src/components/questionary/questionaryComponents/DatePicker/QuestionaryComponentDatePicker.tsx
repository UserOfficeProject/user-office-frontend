import DateFnsUtils from '@date-io/date-fns';
import { TextField, TextFieldProps } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Field, getIn } from 'formik';
import React, { useState, useEffect } from 'react';

import { DateConfig } from 'generated/sdk';

import { BasicComponentProps } from '../../../proposal/IBasicComponentProps';

function TextFieldWithTooltip({
  title,
  ...props
}: TextFieldProps & { title: string }) {
  return (
    <Tooltip title={title}>
      <TextField {...props} />
    </Tooltip>
  );
}

export function QuestionaryComponentDatePicker(props: BasicComponentProps) {
  const { answer: templateField, touched, errors, onComplete } = props;
  const {
    question: { proposalQuestionId, question },
    value,
  } = templateField;
  const config = templateField.config as DateConfig;
  const fieldError = getIn(errors, proposalQuestionId);
  const isError = getIn(touched, proposalQuestionId) && !!fieldError;
  const [stateValue, setStateValue] = useState(value || '');

  useEffect(() => {
    setStateValue(templateField.value);
  }, [templateField]);

  return (
    <FormControl error={isError}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Field
          data-cy={proposalQuestionId + '_field'}
          name={proposalQuestionId}
          label={question}
          component={({ field, form, ...other }: { field: any; form: any }) => {
            return (
              <KeyboardDatePicker
                required={config.required ? true : false}
                clearable={true}
                error={isError}
                name={field.name}
                helperText={isError && errors[proposalQuestionId]}
                label={question}
                value={stateValue}
                format="yyyy-MM-dd"
                onChange={date => {
                  setStateValue(date);
                  onComplete(proposalQuestionId, date);
                  form.setFieldValue(field.name, date, false);
                }}
                TextFieldComponent={props => (
                  <TextFieldWithTooltip {...props} title={config.tooltip} />
                )}
                {...other}
              />
            );
          }}
        />
      </MuiPickersUtilsProvider>
      <span>{config.small_label}</span>
    </FormControl>
  );
}
