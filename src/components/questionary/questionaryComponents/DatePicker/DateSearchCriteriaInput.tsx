import LuxonUtils from '@date-io/luxon';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

import { SearchCriteriaInputProps } from 'components/proposal/SearchCriteriaInputProps';
import { QuestionFilterCompareOperator } from 'generated/sdk';
import { LUXON_DATE_FORMAT } from 'utils/Time';

function DateSearchCriteriaInput({
  onChange,
  searchCriteria,
}: SearchCriteriaInputProps) {
  const [value, setValue] = useState<DateTime | null>(
    searchCriteria
      ? DateTime.fromFormat(searchCriteria?.value as string, LUXON_DATE_FORMAT)
      : null
  );
  const [comparator, setComparator] = useState<QuestionFilterCompareOperator>(
    searchCriteria?.compareOperator ?? QuestionFilterCompareOperator.EQUALS
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl style={{ width: '100%' }}>
          <InputLabel shrink id="comparator">
            Operator
          </InputLabel>
          <Select
            onChange={(event) => {
              const newComparator = event.target
                .value as QuestionFilterCompareOperator;
              setComparator(newComparator);
              if (value) {
                onChange(newComparator, value.toFormat(LUXON_DATE_FORMAT));
              }
            }}
            value={comparator}
            labelId="comparator"
            data-cy="comparator"
          >
            <MenuItem key="eq" value={QuestionFilterCompareOperator.EQUALS}>
              Exact
            </MenuItem>
            <MenuItem key="lt" value={QuestionFilterCompareOperator.LESS_THAN}>
              Before
            </MenuItem>
            <MenuItem
              key="gt"
              value={QuestionFilterCompareOperator.GREATER_THAN}
            >
              After
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <KeyboardDatePicker
            disableToolbar
            format="yyyy-MM-dd"
            variant="inline"
            autoOk={true}
            label="Date"
            value={value}
            onChange={(date: MaterialUiPickersDate) => {
              const newDate = date as unknown as DateTime;
              if (newDate && newDate.isValid) {
                onChange(comparator, newDate.toFormat(LUXON_DATE_FORMAT));
              }
              setValue(newDate);
            }}
            InputLabelProps={{
              shrink: value ? true : undefined,
            }}
            data-cy="value"
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}

export default DateSearchCriteriaInput;
