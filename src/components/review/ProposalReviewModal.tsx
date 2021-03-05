import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { Ref, useCallback } from 'react';

import { Proposal } from 'generated/sdk';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const SlideComponent = (props: TransitionProps, ref: Ref<unknown>) => (
  <Slide direction="up" ref={ref} {...props} />
);

const Transition = React.forwardRef<unknown, TransitionProps>(SlideComponent);

type ProposalReviewModalProps = {
  proposalReviewModalOpen: boolean;
  setProposalReviewModalOpen: (updatedProposal?: Proposal) => void;
  title: string;
  proposalId?: number | null;
};

const ProposalReviewModal: React.FC<ProposalReviewModalProps> = ({
  title,
  proposalReviewModalOpen,
  setProposalReviewModalOpen,
  proposalId,
  children,
}) => {
  const classes = useStyles();
  const { api } = useDataApiWithFeedback();

  const loadProposal = async () => {
    if (!proposalId) {
      return;
    }

    return api()
      .getProposal({ id: proposalId })
      .then((data) => {
        return data.proposal as Proposal;
      });
  };

  const handleClose = async () => {
    const freshProposal = await loadProposal();
    console.log(freshProposal);
    setProposalReviewModalOpen(freshProposal);
  };

  return (
    <>
      <Dialog
        open={proposalReviewModalOpen}
        fullScreen
        onClose={(): Promise<void> => handleClose()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default ProposalReviewModal;
