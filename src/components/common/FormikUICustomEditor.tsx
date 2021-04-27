import makeStyles from '@material-ui/core/styles/makeStyles';
import { Editor } from '@tinymce/tinymce-react';
import { FormikHelpers, FormikValues } from 'formik';
import React, { useState } from 'react';

import { FunctionType } from 'utils/utilTypes';

const useStyles = makeStyles((theme) => ({
  label: {
    marginTop: '17px',
    fontSize: '1.1875em',
    display: 'block',
    color: theme.palette.grey[800],
  },
}));

const FormikUICustomEditor = ({
  field,
  form,
  ...props
}: {
  field: {
    name: string;
    onBlur: FunctionType;
    onChange: FunctionType;
    value: string;
  };
  form: FormikHelpers<FormikValues>;
  'data-cy'?: string;
  label?: string;
}) => {
  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState(field.value);

  return (
    <div data-cy={props['data-cy']}>
      {props.label && <label className={classes.label}>{props.label}</label>}
      <Editor
        initialValue={field.value}
        {...props}
        onEditorChange={(content) => setFieldValue(content)}
        onBlur={() => form.setFieldValue(field.name, fieldValue)}
      />
    </div>
  );
};

export default FormikUICustomEditor;
