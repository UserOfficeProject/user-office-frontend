import { Checkbox, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { getIn } from 'formik';
import React, { useEffect, useState } from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { SelectionFromOptionsConfig } from 'generated/sdk';

const toArray = (input: string | string[]): string[] => {
  if (typeof input === 'string') {
    return [input];
  }

  return input;
};

export function QuestionaryComponentMultipleChoice(props: BasicComponentProps) {
  const classes = makeStyles({
    horizontalLayout: {
      flexDirection: 'row',
    },
    verticalLayout: {
      flexDirection: 'column',
    },
    wrapper: {
      margin: '18px 0 0 0',
      display: 'inline-flex',
    },
    label: {
      marginTop: '10px',
      marginRight: '5px',
    },
    dropdown: {
      width: 350,
    },
  })();

  const {
    answer,
    onComplete,
    formikProps: { errors, touched },
  } = props;
  const {
    question: { proposalQuestionId, question },
    value,
  } = answer;
  const [stateValue, setStateValue] = useState<Array<string>>(value);
  const fieldError = getIn(errors, proposalQuestionId);
  const isError = getIn(touched, proposalQuestionId) && !!fieldError;
  const config = answer.config as SelectionFromOptionsConfig;

  useEffect(() => {
    setStateValue(answer.value);
  }, [answer]);

  const handleOnChange = (evt: any, value: string | string[]) => {
    const newValue = toArray(value);
    setStateValue(newValue);
    onComplete(evt, newValue);
  };

  const getCheckbox = (option: string) => {
    if (config.isMultipleSelect) {
      return <Checkbox checked={stateValue.includes(option)} />;
    } else {
      return null;
    }
  };

  switch (config.variant) {
    case 'dropdown':
      return (
        <FormControl fullWidth>
          <Select
            className={classes.dropdown}
            id={proposalQuestionId}
            value={config.isMultipleSelect ? stateValue : stateValue[0]}
            onChange={evt =>
              handleOnChange(evt, (evt.target as HTMLInputElement).value)
            }
            multiple={config.isMultipleSelect}
            label={question}
            required={config.required ? true : false}
            renderValue={item =>
              config.isMultipleSelect
                ? (item as string[]).join(', ')
                : (item as string)
            }
          >
            {config.options.map(option => {
              return (
                <MenuItem value={option} key={option}>
                  {getCheckbox(option)}
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );

    default:
      return (
        <FormControl
          className={classes.wrapper}
          required={config.required ? true : false}
          error={isError}
        >
          <FormLabel className={classes.label}>{question}</FormLabel>
          <span>{config.small_label}</span>
          <RadioGroup
            id={proposalQuestionId}
            name={proposalQuestionId}
            value={stateValue[0]}
            onChange={evt =>
              handleOnChange(evt, (evt.target as HTMLInputElement).value)
            }
            className={
              config.options!.length < 3
                ? classes.horizontalLayout
                : classes.verticalLayout
            }
          >
            {config.options.map(option => {
              return (
                <FormControlLabel
                  value={option}
                  key={option}
                  control={<Radio />}
                  label={option}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      );
  }
}
