import React from 'react';

import UOLoader from 'components/common/UOLoader';
import { Answer, SubTemplateConfig } from 'generated/sdk';
import { useBlankQuestionaryStepsData } from 'hooks/questionary/useBlankQuestionaryStepsData';

import { createSampleStub } from '../SampleDeclaration/QuestionaryComponentSampleDeclaration';
import {
  SampleDeclarationContainer,
  SampleDeclarationContainerCallbacks,
} from '../SampleDeclaration/SampleDeclarationContainer';

interface AddNewSampleProps extends SampleDeclarationContainerCallbacks {
  proposalPk: number;
  answer: Answer;
}

function AddNewSample({ proposalPk, answer, ...rest }: AddNewSampleProps) {
  const config = answer.config as SubTemplateConfig;
  const sampleTemplateId = config.templateId;
  if (!sampleTemplateId) {
    throw new Error(
      'Template id is missing from the sub-template question config'
    );
  }

  const { questionarySteps } = useBlankQuestionaryStepsData(sampleTemplateId);

  if (!questionarySteps) {
    return <UOLoader />;
  }

  const sampleStub = createSampleStub(
    sampleTemplateId,
    questionarySteps,
    proposalPk,
    answer.question.id
  );

  return <SampleDeclarationContainer sample={sampleStub} {...rest} />;
}

export default AddNewSample;
