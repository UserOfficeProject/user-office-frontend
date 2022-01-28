import { MenuItem } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { FieldInputProps, FormikHelpers, FormikValues } from 'formik';
import React from 'react';

import { Unit } from 'generated/sdk';

import MultiMenuItem from './MultiMenuItem';

export interface FormikUICustomMultipleSelectProps {
  id: string;
  avalableUnits: Unit[];
  label: string;
  multiple?: boolean;
  // props below are injected by Field
  field: FieldInputProps<Unit[]>;
  form: FormikHelpers<FormikValues>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
};

const FormikUIUnitSelect = ({
  field,
  form,
  avalableUnits,
  id,
  label,
  multiple,
  ...props
}: FormikUICustomMultipleSelectProps) => {
  function getUnitById(id: Unit['id']) {
    return avalableUnits.find((unit) => unit.id === id);
  }

  const handleChange = (
    event: React.ChangeEvent<{
      value: Unit[];
    }>
  ) => {
    const selectedUnits = event.target.value;
    form.setFieldValue(field.name, selectedUnits);
  };

  const SelectMenuItem = multiple ? MultiMenuItem : MenuItem;

  return (
    <>
      <InputLabel id={`${id}-label`} shrink>
        {label}
      </InputLabel>
      <Select
        value={field.value}
        multiple={multiple}
        // @ts-expect-error seems to have wrong typedefinition for onChange signature
        onChange={handleChange}
        input={<Input />}
        renderValue={(value) => {
          if (multiple) {
            const units = value as Unit[];

            return units.map((unit) => unit.symbol).join(', ');
          } else {
            const unit = value as Unit;

            return unit.symbol;
          }
        }}
        MenuProps={MenuProps}
        id={id}
        labelId={`${id}-label`}
        {...props}
      >
        {avalableUnits.map((curOption) => (
          <SelectMenuItem
            key={curOption.id}
            value={curOption as unknown as string[]}
          >
            <ListItemText primary={curOption.unit} />
          </SelectMenuItem>
        ))}
      </Select>
    </>
  );
};

export default FormikUIUnitSelect;
