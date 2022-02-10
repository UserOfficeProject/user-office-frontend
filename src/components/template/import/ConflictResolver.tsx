import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import Error from '@material-ui/icons/Error';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { useEffect } from 'react';

import {
  ConflictResolutionStrategy,
  QuestionComparisonStatus,
} from 'generated/sdk';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
  resolved: {
    color: '#ffbb00',
  },
  check: {
    color: '#00ff00',
  },
  highlight: {
    backgroundColor: '#faed27',
  },
}));

export function ConflictResolver<T>(props: {
  comparison: T;
  onConflictResolved: (
    comparison: T,
    resolution: ConflictResolutionStrategy
  ) => void;
  getStatus: (comparison: T) => QuestionComparisonStatus;
  getItemId: (comparison: T) => string;
  getItemTitle: (comparison: T) => string;
  getDiffInfo: (comparison: T) => {
    heading: string;
    existingVal: React.ReactNode;
    newVal: React.ReactNode;
    isDifferent: boolean;
  }[];
}) {
  const { comparison, onConflictResolved } = props;
  const { getStatus, getItemId, getItemTitle, getDiffInfo } = props;

  const [existingItemCheck, setExistingItemCheck] = React.useState(
    getStatus(comparison) === QuestionComparisonStatus.SAME
  );
  const [newItemCheck, setNewItemCheck] = React.useState(
    getStatus(comparison) === QuestionComparisonStatus.NEW
  );

  const classes = useStyles();

  const getStatusIcon = (status: QuestionComparisonStatus) => {
    const isResolved = existingItemCheck || newItemCheck;
    switch (status) {
      case QuestionComparisonStatus.DIFFERENT:
        return isResolved ? (
          <Check
            className={clsx(classes.icon, classes.resolved)}
            data-cy="resolved-icon"
          />
        ) : (
          <Error
            className={clsx(classes.icon, classes.error)}
            data-cy="conflict-icon"
          />
        );
      case QuestionComparisonStatus.NEW:
      case QuestionComparisonStatus.SAME:
        return (
          <Check
            className={clsx(classes.icon, classes.check)}
            data-cy="same-icon"
          />
        );

      default:
    }
  };

  // updating the checkboxes
  useEffect(() => {
    if (existingItemCheck) {
      onConflictResolved(comparison, ConflictResolutionStrategy.USE_EXISTING);
    } else if (newItemCheck) {
      onConflictResolved(comparison, ConflictResolutionStrategy.USE_NEW);
    } else {
      onConflictResolved(comparison, ConflictResolutionStrategy.UNRESOLVED);
    }
  }, [existingItemCheck, newItemCheck, onConflictResolved, comparison]);

  return (
    <Accordion data-cy={`${getItemId(comparison)}-accordion`}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        {getStatusIcon(getStatus(comparison))}
        {getItemTitle(comparison)}
      </AccordionSummary>

      <AccordionDetails>
        <TableContainer>
          <Table size="small" component="span">
            <TableHead>
              <TableRow>
                <TableCell>{getItemId(comparison)}</TableCell>
                <TableCell className={classes.heading}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        data-cy="existing-question-checkbox"
                        disabled={
                          getStatus(comparison) !==
                          QuestionComparisonStatus.DIFFERENT
                        }
                        checked={existingItemCheck}
                        onChange={(e) => {
                          setExistingItemCheck(e.target.checked);
                          setNewItemCheck(false);
                        }}
                      />
                    }
                    label="Existing Question"
                  />
                </TableCell>
                <TableCell className={classes.heading}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        data-cy="new-question-checkbox"
                        disabled={
                          getStatus(comparison) !==
                          QuestionComparisonStatus.DIFFERENT
                        }
                        checked={newItemCheck}
                        onChange={(e) => {
                          setNewItemCheck(e.target.checked);
                          setExistingItemCheck(false);
                        }}
                      />
                    }
                    label="New Question"
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getDiffInfo(comparison).map((diffInfo) => (
                <TableRow
                  className={clsx(diffInfo.isDifferent && classes.highlight)}
                  key={diffInfo.heading}
                >
                  <TableCell className={classes.heading}>
                    {diffInfo.heading}
                  </TableCell>
                  <TableCell>{diffInfo.existingVal}</TableCell>
                  <TableCell>{diffInfo.newVal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
