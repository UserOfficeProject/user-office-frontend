import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React from 'react';

import { DataType } from 'generated/sdk';
import { ProposalSubmissionState } from 'models/ProposalSubmissionState';

import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
import { createProposalBasisValidationSchema } from './proposalBasisValidationSchema';
import { QuestionaryComponentProposalBasis } from './QuestionaryComponentProposalBasis';
import { QuestionProposalBasisForm } from './QuestionProposalBasisForm';
import { QuestionTemplateRelationProposalBasisForm } from './QuestionTemplateRelationProposalBasisForm';

export const proposalBasisDefinition: QuestionaryComponentDefinition = {
  dataType: DataType.PROPOSAL_BASIS,
  name: 'Proposal Basis',
  questionaryComponent: QuestionaryComponentProposalBasis,
  questionForm: () => QuestionProposalBasisForm,
  questionTemplateRelationForm: () => QuestionTemplateRelationProposalBasisForm,
  readonly: true,
  creatable: false,
  icon: <QuestionAnswerIcon />,
  answerRenderer: () => null,
  createYupValidationSchema: createProposalBasisValidationSchema,
  getYupInitialValue: ({ state }) => {
    const proposalState = state as ProposalSubmissionState;

    return {
      title: proposalState.proposal.title,
      abstract: proposalState.proposal.abstract,
    };
  },
};
