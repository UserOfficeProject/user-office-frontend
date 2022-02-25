import { Button, Link, makeStyles } from '@material-ui/core';
import React from 'react';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import InputDialog from 'components/common/InputDialog';

interface ButtonWithDialogProps {
  children: JSX.Element;
  label: string;
}

const useStyles = makeStyles(() => ({
  container: {
    width: '500px',
  },
  button: {
    cursor: 'pointer',
  },
}));

function ButtonWithDialog({ children, label }: ButtonWithDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div>
      <Link
        onClick={() => setIsDialogOpen(true)}
        color="primary"
        className={classes.button}
      >
        {label}
      </Link>
      <InputDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div className={classes.container}>
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
        </div>
      </InputDialog>
    </div>
  );
}

export default ButtonWithDialog;
