import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { DataType } from 'generated/sdk';
import React from 'react';
import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
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
  createYupValidationSchema: null,
  getYupInitialValue: () => {
    return { title: '', abstract: '' };
  },
};
