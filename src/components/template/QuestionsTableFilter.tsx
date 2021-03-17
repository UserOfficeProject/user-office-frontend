import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

import { getQuestionaryComponentDefinitions } from 'components/questionary/QuestionaryComponentRegistry';
import { DataType, QuestionsFilter } from 'generated/sdk';

interface QuestionsTableFilterProps {
  onChange?: (filter: QuestionsFilter) => unknown;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textSearch: {
    width: 300,
  },
}));

const questionTypes = getQuestionaryComponentDefinitions();

function QuestionsTableFilter(props: QuestionsTableFilterProps) {
  const classes = useStyles();
  const [questionType, setQuestionType] = useState<DataType | undefined>();
  const [searchText, setSearchText] = useState<string | undefined>();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink>Type</InputLabel>
        <Select
          onChange={(e) => {
            const newDataType = e.target.value as DataType;
            setQuestionType(newDataType);
            props.onChange?.({ dataType: newDataType, text: searchText });
          }}
          value={questionType ?? ''}
        >
          <MenuItem value={undefined} key={'None'}>
            None
          </MenuItem>
          {questionTypes.map((questionType) => (
            <MenuItem value={questionType.dataType} key={questionType.dataType}>
              {questionType.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={`${classes.formControl} ${classes.textSearch}`}>
        <InputLabel shrink>Search</InputLabel>
        <TextField
          label=" "
          value={searchText ?? ''}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              props.onChange?.({ dataType: questionType, text: searchText });
              event.preventDefault();
            }
          }}
        />
      </FormControl>
    </div>
  );
}

export default QuestionsTableFilter;
