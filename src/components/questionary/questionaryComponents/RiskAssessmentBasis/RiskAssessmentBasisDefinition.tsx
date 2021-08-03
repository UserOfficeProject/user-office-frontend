import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import React from 'react';

import { DataType } from 'generated/sdk';
import { RiskAssessmentSubmissionState } from 'models/RiskAssessmentSubmissionState';

import { QuestionaryComponentDefinition } from '../../QuestionaryComponentRegistry';
import { createRiskAssessmentBasisValidationSchema } from './createRiskAssessmentValidationSchema';
import { QuestionaryComponentRiskAssessmentBasis } from './QuestionaryComponentRiskAssessmentBasis';
import { QuestionRiskAssessmentBasisForm } from './QuestionRiskAssessmentBasisForm';
import { QuestionTemplateRelationRiskAssessmentBasisForm } from './QuestionTemplateRelationVisitBasisForm';

export const riskAssessmentBasisDefinition: QuestionaryComponentDefinition = {
  dataType: DataType.RISK_ASSESSMENT_BASIS,
  name: 'Risk Assessment Basis',
  questionaryComponent: QuestionaryComponentRiskAssessmentBasis,
  questionForm: () => QuestionRiskAssessmentBasisForm,
  questionTemplateRelationForm: () =>
    QuestionTemplateRelationRiskAssessmentBasisForm,
  readonly: true,
  creatable: false,
  icon: <FlightTakeoffIcon />,
  createYupValidationSchema: createRiskAssessmentBasisValidationSchema,
  getYupInitialValue: ({ state }) => {
    const riskAssessmentState = state as RiskAssessmentSubmissionState;

    return riskAssessmentState.riskAssessment;
  },
};
