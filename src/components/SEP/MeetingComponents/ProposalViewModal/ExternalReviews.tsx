import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import { Review } from 'generated/sdk';
import { StyledPaper } from 'styles/StyledComponents';
import { getFullUserName } from 'utils/user';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(2),
  },
  textBold: {
    fontWeight: 'bold',
  },
  table: {
    minWidth: 500,
  },
}));

type ExternalReviewsProps = {
  reviews: Review[] | null;
};

const ExternalReviews: React.FC<ExternalReviewsProps> = ({ reviews }) => {
  const classes = useStyles();

  return (
    <div data-cy="SEP-meeting-components-external-reviews">
      <StyledPaper margin={[0]}>
        <Typography
          variant="h6"
          component="h2"
          className={classes.heading}
          gutterBottom
        >
          External reviews
        </Typography>
        <TableContainer>
          <Table className={classes.table}>
            <TableBody>
              <TableRow key="externalReviewsHeading">
                <TableCell width="50%" className={classes.textBold}>
                  Name
                </TableCell>
                <TableCell width="25%" className={classes.textBold}>
                  Score
                </TableCell>
                <TableCell className={classes.textBold}>Comment</TableCell>
              </TableRow>
              {reviews?.map((review) => (
                <TableRow key={`externalReviews_${review.id}_${review.userID}`}>
                  <TableCell>{getFullUserName(review.reviewer)}</TableCell>
                  <TableCell>{review.grade || '-'}</TableCell>
                  <TableCell
                    dangerouslySetInnerHTML={{
                      __html: review?.comment || '-',
                    }}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </div>
  );
};

ExternalReviews.propTypes = {
  reviews: PropTypes.array,
};

export default ExternalReviews;
