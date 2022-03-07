import DateAdapter from '@mui/lab/AdapterLuxon';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

import { SearchCriteriaInputProps } from 'components/proposal/SearchCriteriaInputProps';
import { QuestionFilterCompareOperator } from 'generated/sdk';

function DateSearchCriteriaInput({
  onChange,
  searchCriteria,
}: SearchCriteriaInputProps) {
  const [value, setValue] = useState<Date | null>(
    searchCriteria ? new Date(searchCriteria?.value as string) : null
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
                onChange(newComparator, value.toISOString());
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
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            // disableToolbar
            inputFormat="yyyy-MM-dd"
            renderInput={(props) => (
              <TextField
                {...props}
                required
                margin="none"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: value ? true : undefined,
                }}
              />
            )}
            // autoOk={true}
            label="Date"
            value={value}
            onChange={(date) => {
              /*
              DateFnsUtils uses native Date object, but use of Luxon elsewhere (in call modal)
              causes incorrect type inference: https://github.com/dmtrKovalenko/date-io/issues/584
              */
              const newDate = date as Date;
              if (newDate && !isNaN(newDate.getTime())) {
                newDate.setUTCHours(0, 0, 0, 0);
                onChange(comparator, newDate.toISOString());
              }
              setValue(newDate);
            }}
            data-cy="value"
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

export default DateSearchCriteriaInput;
