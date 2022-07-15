import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';
import { TextFieldProps } from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Field, FieldAttributes, useField } from 'formik';
import React, { useState } from 'react';

import { PredefinedMessageKey } from 'generated/sdk';

import PredefinedMessagesModal from './PredefinedMessagesModal';

const FormikUIPredefinedMessagesTextField: React.FC<
  FieldAttributes<TextFieldProps> & { 'message-key'?: PredefinedMessageKey }
> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, _, helpers] = useField(props.name);
  const [modalOpen, setModalOpen] = useState(false);

  const openPredefinedMessagesModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <PredefinedMessagesModal
        open={modalOpen}
        setOpen={setModalOpen}
        selectedMessage={field.value as string}
        messageKey={props['message-key']}
        setFieldValue={helpers.setValue}
      />

      <Field
        {...props}
        InputProps={{
          endAdornment: (
            <Tooltip title="Select from predefined messages">
              <IconButton
                aria-label="Select from predefined messages"
                onClick={openPredefinedMessagesModal}
              >
                <AddCommentIcon />
              </IconButton>
            </Tooltip>
          ),
        }}
      />
    </>
  );
};

export default FormikUIPredefinedMessagesTextField;
