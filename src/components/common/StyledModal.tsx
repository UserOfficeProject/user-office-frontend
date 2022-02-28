import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Modal, { ModalProps } from '@mui/material/Modal';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'white',
    padding: theme.spacing(3),
    maxWidth: '700px',
    maxHeight: '100%',
    overflowY: 'auto',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
export default function StyledModal(
  props: Omit<ModalProps, 'Backdrop' | 'BackdropProps' | 'className'>
) {
  const { children, ...restOfTheProps } = props;
  const classes = useStyles();

  return (
    <Modal
      {...restOfTheProps}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Grid container className={classes.container}>
          {children}
        </Grid>
      </Fade>
    </Modal>
  );
}
