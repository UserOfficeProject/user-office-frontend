import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import makeStyles from '@mui/styles/makeStyles';
import TextField from '@mui/material/TextField';
import { Field, getIn } from 'formik';
import React, { useState } from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { IntervalConfig } from 'generated/sdk';

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

export function QuestionaryComponentInterval(props: BasicComponentProps) {
  const {
    answer,
    onComplete,
    formikProps: { errors, touched },
  } = props;
  const {
    question: { id, question },
  } = answer;
  const config = answer.config as IntervalConfig;
  const fieldError = getIn(errors, id);
  const isError = getIn(touched, id) && !!fieldError;
  const [stateValue, setStateValue] = useState<{
    min: AcceptableUserInput;
    max: AcceptableUserInput;
    unit: string;
  }>(answer.value);

  const classes = useStyles();

  const minFieldId = `${id}.min`;
  const maxFieldId = `${id}.max`;
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
      return <Field type="hidden" value="" name={unitFieldId} />;
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
        <Grid item xs={3} className={classes.unitField}>
          <TextField
            label="Min"
            id={`${id}-Min`}
            onChange={(e) =>
              setStateValue({
                ...stateValue,
                min: getNumberOrDefault(e.target.value, stateValue.min),
              })
            }
            onBlur={() => onComplete(stateValue)}
            value={stateValue.min}
            data-cy={minFieldId}
            type="number"
            name={minFieldId}
            margin="dense"
            fullWidth
            error={isError}
          />
        </Grid>

        <Grid item xs={3} className={classes.unitField}>
          <TextField
            label="Max"
            id={`${id}-Max`}
            onChange={(e) =>
              setStateValue({
                ...stateValue,
                max: getNumberOrDefault(e.target.value, stateValue.max),
              })
            }
            onBlur={() => onComplete(stateValue)}
            value={stateValue.max}
            data-cy={maxFieldId}
            type="number"
            name={maxFieldId}
            margin="dense"
            fullWidth
            error={isError}
          />
        </Grid>
        <Grid item xs={6} className={classes.unitField}>
          {getUnits()}
        </Grid>

        <Grid item xs={3}>
          {isError && <FormHelperText>{fieldError.min}</FormHelperText>}
        </Grid>
        <Grid item xs={3}>
          {isError && <FormHelperText>{fieldError.max}</FormHelperText>}
        </Grid>
        <Grid item xs={6}>
          {isError && <FormHelperText>{fieldError.unit}</FormHelperText>}
        </Grid>
      </Grid>
    </FormControl>
  );
}
