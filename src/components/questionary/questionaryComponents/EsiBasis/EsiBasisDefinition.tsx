import React from 'react';

import EsiIcon from 'components/common/icons/EsiIcon';
import { DataType } from 'generated/sdk';
import { EsiSubmissionState } from 'models/questionary/esi/EsiSubmissionState';

import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
import { createEsiBasisValidationSchema } from './createEsiValidationSchema';
import { QuestionaryComponentEsiBasis } from './QuestionaryComponentEsiBasis';
import { QuestionEsiBasisForm } from './QuestionEsiBasisForm';
import { QuestionTemplateRelationEsiBasisForm } from './QuestionTemplateRelationEsiBasisForm';

export const esiBasisDefinition: QuestionaryComponentDefinition = {
  dataType: DataType.PROPOSAL_ESI_BASIS,
  name: 'Proposal ESI Basis',
  questionaryComponent: QuestionaryComponentEsiBasis,
  questionForm: () => QuestionEsiBasisForm,
  questionTemplateRelationForm: () => QuestionTemplateRelationEsiBasisForm,
  readonly: true,
  creatable: false,
  icon: <EsiIcon />,
  createYupValidationSchema: createEsiBasisValidationSchema,
  getYupInitialValue: ({ state }) => {
    const esiState = state as EsiSubmissionState;

    return esiState.esi;
  },
};
