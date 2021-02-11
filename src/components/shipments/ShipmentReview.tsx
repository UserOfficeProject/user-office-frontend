import { Box, Button, Link, makeStyles } from '@material-ui/core';
import UOLoader from 'components/common/UOLoader';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import QuestionaryDetails, {
  TableRowData,
} from 'components/questionary/QuestionaryDetails';
import { ShipmentStatus } from 'generated/sdk';
import { useProposalData } from 'hooks/proposal/useProposalData';
import React, { useContext } from 'react';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';
import { ShipmentContextType } from './ShipmentContainer';

interface ShipmentReviewProps {
  isReadonly: boolean;
  onComplete?: () => any;
  confirm: WithConfirmType;
}

const useStyles = makeStyles(theme => ({
  sampleList: {
    listStyle: 'none',
    padding: 0,
  },
}));

function ShipmentReview({
  isReadonly,
  onComplete,
  confirm,
}: ShipmentReviewProps) {
  const { api, isExecutingCall } = useDataApiWithFeedback();
  const { state, dispatch } = useContext(
    QuestionaryContext
  ) as ShipmentContextType;
  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  const { proposalData } = useProposalData(state.shipment.proposalId);
  const classes = useStyles();

  if (!proposalData) {
    return <UOLoader />;
  }

  const additionalDetails: TableRowData[] = [
    { label: 'Title', value: state.shipment.title },
    { label: 'Status', value: state.shipment.status },
    {
      label: 'Proposal',
      value: (
        <Link href={`/ProposalEdit/${proposalData.id}`}>
          {proposalData.title}
        </Link>
      ),
    },
    {
      label: 'Samples',
      value: (
        <ul className={classes.sampleList}>
          {state.shipment.samples.map(sample => (
            <li key={sample.id}>{sample.title}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div>
      <QuestionaryDetails
        questionaryId={state.shipment.questionaryId}
        additionalDetails={additionalDetails}
        title="Shipment information"
      />
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        {/* TODO handle is loading state isExecutingCall*/}
        <Button
          variant="contained"
          disabled={isReadonly}
          onClick={() =>
            confirm(
              async () => {
                await api().updateShipment({
                  shipmentId: state.shipment.id,
                  status: ShipmentStatus.SUBMITTED,
                });
                onComplete?.();
              },
              {
                title: 'Confirmation',
                description:
                  'I am aware that no further edits can be done after shipment submission.',
              }
            )()
          }
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default withConfirm(ShipmentReview);
