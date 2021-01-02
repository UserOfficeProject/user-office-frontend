import { Select, TextField, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import UOLoader from 'components/common/UOLoader';
import withPreventSubmit from 'components/common/withPreventSubmit';
import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { ShipmentContext } from 'components/shipments/ShipmentContainer';
import { Answer, Sample } from 'generated/sdk';
import { useUserProposals } from 'hooks/proposal/useUserProposals';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { useProposalSamples } from 'hooks/sample/useProposalSamples';
import { EventType } from 'models/QuestionarySubmissionState';
import {
  ShipmentBasisFormikData,
  ShipmentSubmissionState,
} from 'models/ShipmentSubmissionState';
import React, { useContext, useState } from 'react';

const TextFieldNoSubmit = withPreventSubmit(TextField);

const samplesToSampleIds = (samples: Pick<Sample, 'id'>[]) =>
  samples.map(sample => sample.id);

function QuestionaryComponentShipmentBasis(props: BasicComponentProps) {
  const {
    answer: {
      question: { proposalQuestionId, question },
    },
    formikProps: { touched, errors },
  } = props;

  const shipmentContext = useContext(ShipmentContext);

  const [title, setTitle] = useState(shipmentContext.state?.shipment.title);
  const [proposalId, setProposalId] = useState<number | null>(
    shipmentContext.state?.shipment.proposalId || null
  );
  const [sampleIds, setSampleIds] = useState<number[]>(
    shipmentContext.state?.shipment.samples.map(sample => sample.id) || []
  );

  const { proposals, loadingProposals } = useUserProposals();
  const { samples, loadingSamples } = useProposalSamples(proposalId);

  if (!shipmentContext.state || loadingProposals || loadingSamples) {
    return <UOLoader />;
  }

  const { dispatch, state } = shipmentContext;

  const handleChange = (changes: Partial<ShipmentBasisFormikData>) => {
    dispatch({
      type: EventType.SHIPMENT_MODIFIED,
      payload: {
        shipment: {
          ...state.shipment,
          ...changes,
        },
      },
    });
  };

  return (
    <>
      <Typography>{question}</Typography>
      <TextFieldNoSubmit
        value={title}
        label="Brief description"
        onBlur={event => {
          handleChange({ title: event.target.value });
        }}
        onChange={event => setTitle(event.target.value)}
        required
        fullWidth
        data-cy="title-input"
      />

      <Select
        label={'Select proposal'}
        fullWidth
        onChange={event => {
          const newProposalId = event.target.value as number;
          setProposalId(newProposalId);
          setSampleIds([]);
          handleChange({ proposalId: newProposalId });
        }}
        value={proposalId || ''}
      >
        {proposals.map(proposal => (
          <MenuItem key={proposal.id} value={proposal.id}>
            {proposal.title}
          </MenuItem>
        ))}
      </Select>

      <Select
        fullWidth
        multiple
        label={'Select samples'}
        onChange={event => {
          const newSampleIds = event.target.value as number[];
          const newSamples = samples.filter(sample =>
            newSampleIds.includes(sample.id)
          );
          setSampleIds(newSampleIds);
          handleChange({ samples: newSamples });
        }}
        value={sampleIds}
      >
        {samples.map(sample => (
          <MenuItem key={sample.id} value={sample.id}>
            {sample.title}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

const shipmentBasisPresubmit = (answer: Answer) => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  const shipment = (state as ShipmentSubmissionState).shipment;
  const title = shipment.title;
  let shipmentId = shipment.id;
  if (shipmentId > 0) {
    const result = await api.updateShipment({
      title: title,
      shipmentId: shipment.id,
      proposalId: shipment.proposalId,
    });
    if (result.updateShipment.shipment) {
      dispatch({
        type: EventType.SHIPMENT_UPDATED,
        payload: {
          shipment: result.updateShipment.shipment,
        },
      });
    }
  } else {
    const result = await api.createShipment({
      title: title,
      proposalId: shipment.proposalId,
    });
    if (result.createShipment.shipment) {
      dispatch({
        type: EventType.SHIPMENT_CREATED,
        payload: {
          shipment: result.createShipment.shipment,
        },
      });
      shipmentId = result.createShipment.shipment.id;
    } else {
      return;
    }
  }

  api.addSamplesToShipment({
    shipmentId: shipmentId,
    sampleIds: samplesToSampleIds(shipment.samples),
  });
};

export { QuestionaryComponentShipmentBasis, shipmentBasisPresubmit };
