import { Select, TextField, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useContext, useState } from 'react';

import UOLoader from 'components/common/UOLoader';
import withPreventSubmit from 'components/common/withPreventSubmit';
import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { ShipmentContext } from 'components/shipments/ShipmentContainer';
import { Answer } from 'generated/sdk';
import { useUserProposals } from 'hooks/proposal/useUserProposals';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { useProposalSamples } from 'hooks/sample/useProposalSamples';
import { EventType } from 'models/QuestionarySubmissionState';
import {
  ShipmentBasisFormikData,
  ShipmentSubmissionState,
} from 'models/ShipmentSubmissionState';

const TextFieldNoSubmit = withPreventSubmit(TextField);

function QuestionaryComponentShipmentBasis(props: BasicComponentProps) {
  const {
    answer: {
      question: { proposalQuestionId, question },
    },
    formikProps,
  } = props;

  const shipmentContext = useContext(ShipmentContext);

  const { proposals, loading: loadingProposals } = useUserProposals();
  const [selectedProposalId, setSelectedProposalId] = useState<number | null>(
    shipmentContext.state?.shipment.proposalId || null
  );
  const [selectedSampleIds, setSelectedSampleIds] = useState<number[]>([]);

  const { samples } = useProposalSamples(selectedProposalId);

  if (loadingProposals || !shipmentContext.state) {
    return <UOLoader />;
  }

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

  const { dispatch, state } = shipmentContext;

  return (
    <>
      <Typography>{question}</Typography>
      <TextFieldNoSubmit
        name={`${proposalQuestionId}.title`}
        label="Brief description"
        onBlur={event => {
          handleChange({ title: event.target.value });
        }}
        required
        fullWidth
        data-cy="title-input"
      />

      <Select
        name={`${proposalQuestionId}.proposalId`}
        label={'Select proposal'}
        fullWidth
        onChange={event => {
          const newProposalId = event.target.value as number;
          setSelectedProposalId(newProposalId);
          setSelectedSampleIds([]);
          handleChange({ proposalId: newProposalId });
        }}
      >
        {proposals.map(proposal => (
          <MenuItem value={proposal.id}>{proposal.title}</MenuItem>
        ))}
      </Select>

      <Select
        name={`${proposalQuestionId}.samples`}
        fullWidth
        multiple
        label={'Select samples'}
        onChange={event => {
          const newSampleIds = event.target.value as number[];
          const newSamples = samples.filter(sample =>
            newSampleIds.includes(sample.id)
          );
          setSelectedSampleIds(newSampleIds);
          handleChange({ samples: newSamples });
        }}
        value={selectedSampleIds}
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
    sampleIds: shipment.samples.map(sample => sample.id),
  });
};

export { QuestionaryComponentShipmentBasis, shipmentBasisPresubmit };
