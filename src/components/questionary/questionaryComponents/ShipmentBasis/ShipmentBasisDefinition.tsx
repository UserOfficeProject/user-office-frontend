import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React from 'react';

import { DataType } from 'generated/sdk';

import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
import { createShipmentBasisValidationSchema } from './createShipmentBasisValidationSchema';
import { QuestionaryComponentShipmentBasis } from './QuestionaryComponentShipmentBasis';
import { QuestionShipmentBasisForm } from './QuestionShipmentBasisForm';
import { QuestionTemplateRelationShipmentBasisForm } from './QuestionTemplateRelationShipmentBasisForm';

export const shipmentBasisDefinition: QuestionaryComponentDefinition = {
  dataType: DataType.SHIPMENT_BASIS,
  name: 'Shpiment Basis',
  questionaryComponent: QuestionaryComponentShipmentBasis,
  questionForm: () => QuestionShipmentBasisForm,
  questionTemplateRelationForm: () => QuestionTemplateRelationShipmentBasisForm,
  readonly: true,
  creatable: false,
  icon: <QuestionAnswerIcon />,
  answerRenderer: () => null,
  createYupValidationSchema: createShipmentBasisValidationSchema,
  getYupInitialValue: ({ state }) => {
    // TODO implement validation
    // const sampleState = state as SampleSubmissionState;
    // return sampleState.sample.title;
  },
};
