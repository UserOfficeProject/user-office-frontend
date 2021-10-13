import { getTranslation } from '@esss-swap/duo-localisation';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';

import { TechnicalReview } from 'generated/sdk';
import { getFullUserName } from 'utils/user';

type TechnicalReviewInformationProps = {
  data: TechnicalReview | null | undefined;
};

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(2),
  },
}));
const TechnicalReviewInformation: React.FC<TechnicalReviewInformationProps> = (
  props
) => {
  const classes = useStyles();

  if (!props.data) {
    return <p>Proposal has no technical review</p>;
  }

  return (
    <Fragment>
      <Typography variant="h6" className={classes.heading} gutterBottom>
        Technical Review
      </Typography>
      <Table>
        <TableBody>
          <TableRow key="status">
            <TableCell>Status</TableCell>
            <TableCell>
              {props.data.status && getTranslation(props.data.status)}
            </TableCell>
          </TableRow>
          <TableRow key="comment">
            <TableCell>Comment</TableCell>
            <TableCell
              dangerouslySetInnerHTML={{
                __html: props.data?.publicComment || '-',
              }}
            />
          </TableRow>
          <TableRow key="timeAllocation">
            <TableCell>
              Time Allocation({props.data.proposal?.call?.allocationTimeUnit}s)
            </TableCell>
            <TableCell>{props.data.timeAllocation}</TableCell>
          </TableRow>
          <TableRow key="reviewer">
            <TableCell>Reviewer</TableCell>
            <TableCell>{getFullUserName(props.data.reviewer)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default TechnicalReviewInformation;
