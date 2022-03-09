import { makeStyles, Tooltip } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';

const useStyles = makeStyles(() => ({
  withPointer: {
    cursor: 'pointer',
  },
  container: {
    display: 'inline-block',
  },
}));

interface CopyToClipboardProps {
  text: string;
  children: React.ReactNode;
  successMessage?: string;
}
const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { successMessage, children, text } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleClick = () => {
    enqueueSnackbar(successMessage ?? 'Copied to clipboard', {
      variant: 'success',
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <Tooltip
      onClick={handleClick}
      color="primary"
      title="Copy to clipboard"
      className={classes.withPointer}
    >
      <div className={classes.container}>{children}</div>
    </Tooltip>
  );
};

export default CopyToClipboard;
