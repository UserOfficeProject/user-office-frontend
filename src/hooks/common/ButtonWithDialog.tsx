import { Button } from '@material-ui/core';
import React from 'react';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import InputDialog from 'components/common/InputDialog';

interface ButtonWithDialogProps {
  children: JSX.Element;
  label: string;
}

function ButtonWithDialog({ children, label }: ButtonWithDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)}>{label}</Button>
      <InputDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        {children}
        <ActionButtonContainer>
          <Button
            type="button"
            variant="outlined"
            onClick={() => setIsDialogOpen(false)}
            data-cy="close-dialog"
          >
            Close
          </Button>
        </ActionButtonContainer>
      </InputDialog>
    </div>
  );
}

export default ButtonWithDialog;
