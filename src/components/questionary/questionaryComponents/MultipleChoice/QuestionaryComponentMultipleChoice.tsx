import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { getIn } from 'formik';
import React, { useEffect, useState } from 'react';

import MultiMenuItem from 'components/common/MultiMenuItem';
import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { SelectionFromOptionsConfig } from 'generated/sdk';

const toArray = (input: string | string[]): string[] => {
  if (typeof input === 'string') {
    return [input];
  }

  return input;
};

const useStyles = makeStyles((theme) => ({
  horizontalLayout: {
    flexDirection: 'row',
  },
  verticalLayout: {
    flexDirection: 'column',
  },
  radioGroupSpacing: {
    marginBottom: -theme.spacing(1),
  },
}));

export function QuestionaryComponentMultipleChoice(props: BasicComponentProps) {
  const classes = useStyles();

  const {
    answer,
    onComplete,
    formikProps: { errors, touched },
  } = props;
  const {
    question: { id, question },
    value,
  } = answer;
  const [stateValue, setStateValue] = useState<Array<string>>(value);
  const fieldError = getIn(errors, id);
  const isError = getIn(touched, id) && !!fieldError;
  const config = answer.config as SelectionFromOptionsConfig;

  useEffect(() => {
    setStateValue(answer.value);
  }, [answer]);

  const handleOnChange = (
    _evt: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    value: string | string[]
  ) => {
    const newValue = toArray(value);
    onComplete(newValue);
  };

  const label = (
    <>
      {question}
      {config.small_label && (
        <>
          <br />
          <small>{config.small_label}</small>
        </>
      )}
    </>
  );

  const SelectMenuItem = config.isMultipleSelect ? MultiMenuItem : MenuItem;

  switch (config.variant) {
    case 'dropdown':
      return (
        <FormControl
          fullWidth
          required={config.required}
          error={isError}
          margin="dense"
        >
          <InputLabel id={`questionary-${id}`}>{label}</InputLabel>
          <Select
            id={id}
            value={
              config.isMultipleSelect
                ? stateValue
                : stateValue.length > 0
                ? stateValue[0]
                : ''
            }
            onChange={(evt) =>
              handleOnChange(evt, (evt.target as HTMLInputElement).value)
            }
            multiple={config.isMultipleSelect}
            labelId={`questionary-${id}`}
            required={config.required}
            renderValue={(item) =>
              config.isMultipleSelect
                ? (item as string[]).join(', ')
                : (item as string)
            }
            MenuProps={{
              variant: 'menu',
              getContentAnchorEl: null,
            }}
          >
            {config.options.map((option) => {
              return (
                <SelectMenuItem value={option} key={option}>
                  {option}
                </SelectMenuItem>
              );
            })}
          </Select>
          {isError && <FormHelperText>{fieldError}</FormHelperText>}
        </FormControl>
      );

    default:
      return (
        <FormControl
          required={config.required}
          error={isError}
          margin="dense"
          className={classes.radioGroupSpacing}
        >
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            id={id}
            name={id}
            value={stateValue[0] || ''}
            onChange={(evt) =>
              handleOnChange(evt, (evt.target as HTMLInputElement).value)
            }
            className={
              config.options.length < 3
                ? classes.horizontalLayout
                : classes.verticalLayout
            }
          >
            {config.options.map((option) => {
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
          {isError && <FormHelperText>{fieldError}</FormHelperText>}
        </FormControl>
      );
  }
}
