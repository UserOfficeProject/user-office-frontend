import { Typography } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';

import FormikDropdown from 'components/common/FormikDropdown';
import FormikUICustomSelect, {
  ValueType,
} from 'components/common/FormikUICustomSelect';
import UOLoader from 'components/common/UOLoader';
import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { ShipmentContext } from 'components/shipments/ShipmentContainer';
import { Answer } from 'generated/sdk';
import { useUserProposals } from 'hooks/proposal/useUserProposals';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { useProposalSamples } from 'hooks/sample/useProposalSamples';
import { EventType } from 'models/QuestionarySubmissionState';
import { ShipmentSubmissionState } from 'models/ShipmentSubmissionState';

function QuestionaryComponentShipmentBasis(props: BasicComponentProps) {
  const {
    answer: {
      question: { proposalQuestionId, question },
    },
  } = props;

  const shipmentContext = useContext(ShipmentContext);

  const { proposals } = useUserProposals();
  const [selectedProposalId, setSelectedProposalId] = useState<number | null>(
    null
  );

  const { samples } = useProposalSamples(selectedProposalId);

  const proposalEntries = Array.from(proposals).map(({ id, title }) => ({
    text: title,
    value: id,
  }));

  const sampleEntries = Array.from(samples).map(({ id, title }) => ({
    label: title,
    value: id,
  }));

  if (!proposals) {
    return <UOLoader />;
  }

  if (!shipmentContext.state) {
    return null;
  }

  const { dispatch, state } = shipmentContext;

  return (
    <>
      <Typography>{question}</Typography>
      <Field
        name={`${proposalQuestionId}.title`}
        label="Brief description"
        inputProps={{
          onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              event.preventDefault();

              return false;
            }
          },
          onBlur: (event: ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: EventType.SHIPMENT_MODIFIED,
              payload: {
                shipment: {
                  ...state.shipment,
                  title: event.currentTarget.value,
                },
              },
            });
          },
        }}
        required
        fullWidth
        component={TextField}
        data-cy="title-input"
      />

      <FormikDropdown
        name={`${proposalQuestionId}.proposalId`}
        label={'Select proposal'}
        items={proposalEntries}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const newProposalId = parseInt(event.target.value);
          setSelectedProposalId(newProposalId);
          dispatch({
            type: EventType.SHIPMENT_MODIFIED,
            payload: {
              shipment: { ...state.shipment, proposalId: newProposalId },
            },
          });
        }}
      />

      <Field
        name={`${proposalQuestionId}.sampleIds`}
        component={FormikUICustomSelect}
        fullWidth
        multiple
        label={'Select samples'}
        availableOptions={sampleEntries}
        onChange={(event: React.ChangeEvent<{ value: ValueType[] }>) => {
          dispatch({
            type: EventType.SHIPMENT_MODIFIED,
            payload: {
              shipment: {
                ...state.shipment,
                samples: samples.filter(sample =>
                  event.target.value.includes(sample.id)
                ),
              },
            },
          });
        }}
      />
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
