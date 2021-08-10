import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

import { getQuestionaryComponentDefinitions } from 'components/questionary/QuestionaryComponentRegistry';
import { DataType } from 'generated/sdk';

import { QuestionFilter } from './QuestionPicker';

interface QuestionPickerProps {
  onChange: (filter: QuestionFilter) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formItem: {
    marginBottom: theme.spacing(1),
  },
}));
function QuestionPickerFilter({ onChange }: QuestionPickerProps) {
  const [filter, setFilter] = useState<QuestionFilter>({
    dataType: null,
    searchText: '',
  });
  const classes = useStyles();
  const questionDefs = getQuestionaryComponentDefinitions();

  return (
    <Paper
      data-cy="question-picker-filter"
      elevation={1}
      className={classes.container}
    >
      <FormControl fullWidth>
        <TextField
          label="Question text"
          data-cy="search-text"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel shrink htmlFor="operator">
          Compare
        </InputLabel>
        <Select
          label="DataType"
          fullWidth
          onChange={(event) => {
            const newFilter = {
              ...filter,
              dataType: event.target.value as DataType,
            };
            setFilter(newFilter);
            onChange(newFilter);
          }}
          value={filter.dataType}
          data-cy="data-type"
          defaultValue={null}
        >
          {questionDefs.map((definition) => (
            <MenuItem key={definition.dataType} value={definition.dataType}>
              {definition.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}

export default QuestionPickerFilter;
