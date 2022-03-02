import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import { getIn } from 'formik';
import React, { useState } from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { NumberInputConfig } from 'generated/sdk';
import isEventFromAutoComplete from 'utils/isEventFromAutoComplete';

const useStyles = makeStyles((theme) => ({
  unitField: {
    paddingRight: theme.spacing(1),
    alignSelf: 'flex-end',
  },
  singleUnit: {
    alignItems: 'flex-end',
    display: 'flex',
    height: '100%',
    fontSize: '1rem',
    padding: '0px 5px',
  },
}));

type AcceptableUserInput = number | '';

export function QuestionaryComponentNumber(props: BasicComponentProps) {
  const {
    answer,
    onComplete,
    formikProps: { errors, touched },
  } = props;
  const {
    question: { id, question, naturalKey },
  } = answer;
  const config = answer.config as NumberInputConfig;
  const fieldError = getIn(errors, id);
  const isError = getIn(touched, id) && !!fieldError;
  const [stateValue, setStateValue] = useState<{
    value: AcceptableUserInput;
    unit: string;
  }>(answer.value);

  const classes = useStyles();

  const valueFieldId = `${id}.value`;
  const unitFieldId = `${id}.unit`;

  const getNumberOrDefault = (
    input: string,
    defaultValue: AcceptableUserInput
  ) => {
    const maybeNumber = parseFloat(input);

    return isNaN(maybeNumber) && input !== '' ? defaultValue : maybeNumber;
  };

  const getUnits = () => {
    if (config.units?.length === 0) {
      return null;
    } else if (config.units?.length === 1) {
      return (
        <span className={`${classes.singleUnit} MuiFormControl-marginNormal`}>
          {stateValue.unit}
        </span>
      );
    } else {
      return (
        <Select
          label="Unit"
          value={stateValue.unit}
          onChange={(e) => {
            const newState = { ...stateValue, unit: e.target.value as string };
            setStateValue(newState);
            onComplete(newState);
          }}
          name={unitFieldId}
          data-cy={unitFieldId}
          className="MuiFormControl-marginDense"
        >
          {config.units?.map((unit) => (
            <MenuItem value={unit} key={unit}>
              {unit}
            </MenuItem>
          ))}
        </Select>
      );
    }
  };

  return (
    <FormControl
      error={isError}
      required={config.required}
      margin="dense"
      fullWidth
    >
      <Grid container>
        <Grid item xs={12}>
          <FormLabel>
            <>
              {question}
              {config.small_label && (
                <>
                  <br />
                  <small>{config.small_label}</small>
                </>
              )}
            </>
          </FormLabel>
        </Grid>
        <Grid item xs={2} className={classes.unitField}>
          <TextField
            label="Value"
            id={`${id}-value`}
            onChange={(event) => {
              const newValue = {
                ...stateValue,
                value: getNumberOrDefault(event.target.value, stateValue.value),
              };
              setStateValue(newValue);
              if (isEventFromAutoComplete(event)) {
                onComplete(newValue);
              } else {
                /* Firefox's number spinner arrows don't grant focus
                (see https://bugzilla.mozilla.org/show_bug.cgi?id=1012818)
                but we use loss of focus (blur) to update component state.
                Using blur means we don't update on every keystroke. */
                event.target.focus();
              }
            }}
            onBlur={() => onComplete(stateValue)}
            value={stateValue.value}
            data-cy={valueFieldId}
            data-natural-key={naturalKey}
            type="number"
            name={valueFieldId}
            margin="dense"
            fullWidth
            error={isError}
          />
        </Grid>
        <Grid item xs={10} className={classes.unitField}>
          {getUnits()}
        </Grid>

        <Grid item xs={2}>
          {isError && <FormHelperText>{fieldError.value}</FormHelperText>}
        </Grid>
        <Grid item xs={10}>
          {isError && <FormHelperText>{fieldError.unit}</FormHelperText>}
        </Grid>
      </Grid>
    </FormControl>
  );
}
