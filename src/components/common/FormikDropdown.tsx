import { InputProps } from '@mui/material/Input';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { Field } from 'formik';
import { Autocomplete } from 'formik-mui';
import React from 'react';

import { Option } from 'utils/utilTypes';

type TProps = {
  items: Option[];
  name: string;
  label: string;
  loading?: boolean;
  noOptionsText?: string;
  required?: boolean;
  disabled?: boolean;
  InputProps?: Partial<InputProps> & { 'data-cy': string };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormikDropdown: React.FC<TProps> = ({
  name,
  label,
  required,
  disabled,
  loading = false,
  noOptionsText,
  items,
  InputProps,
  ...props
}) => {
  const options = items.map((item) => item.value);

  return (
    <Field
      id={name + '-input'}
      name={name}
      component={Autocomplete}
      loading={loading}
      options={options}
      noOptionsText={noOptionsText}
      isOptionEqualToValue={(
        option: string | number | null,
        value: string | number | null
      ) => {
        // TODO: Check if this is really needed or it can go without the option isOptionEqualToValue
        return option === value;
      }}
      getOptionLabel={(option: number | string) => {
        const foundOption = items.find((item) => item.value === option);

        return foundOption?.text || '';
      }}
      renderInput={(params: TextFieldProps) => (
        <MuiTextField
          {...params}
          label={label}
          required={required}
          disabled={disabled}
          InputProps={{ ...params.InputProps, ...InputProps }}
        />
      )}
    />
  );
};

export default FormikDropdown;
