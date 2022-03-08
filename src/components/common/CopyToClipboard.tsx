import { makeStyles, Tooltip } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';

const useStyles = makeStyles(() => ({
  withPointer: {
    cursor: 'pointer',
  },
}));

interface CopyToClipboardProps {
  text: string;
  children: React.ReactChild;
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

  if (!children) return null;

  const isChildrenPrimitive =
    typeof children === 'string' || typeof children === 'number';
  const childrenJsx = isChildrenPrimitive ? <span>{children}</span> : children;

  return (
    <>
      <Tooltip
        onClick={handleClick}
        color="primary"
        title="Copy to clipboard"
        className={classes.withPointer}
      >
        {childrenJsx}
      </Tooltip>
    </>
  );
};

export default CopyToClipboard;
