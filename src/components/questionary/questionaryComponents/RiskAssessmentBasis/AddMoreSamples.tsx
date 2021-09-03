import React from 'react';

import UOLoader from 'components/common/UOLoader';
import { Questionary, Answer, DataType } from 'generated/sdk';
import { useProposalData } from 'hooks/proposal/useProposalData';
import { getAllFields } from 'models/questionary/QuestionaryFunctions';

import { SampleDeclarationContainerCallbacks } from '../SampleDeclaration/SampleDeclarationContainer';
import AddNewSample from './AddNewSample';

interface AddMoreSamplesProps extends SampleDeclarationContainerCallbacks {
  proposalPk: number;
}
const getSamplesAnswers = (questionary: Questionary): Answer[] => {
  const allAnswers: Answer[] = getAllFields(questionary.steps) as Answer[];

  const sampleAnswers = allAnswers.filter(
    (question) => question.question.dataType === DataType.SAMPLE_DECLARATION
  );

  return sampleAnswers;
};

function AddMoreSamples({ proposalPk, ...rest }: AddMoreSamplesProps) {
  const { proposalData } = useProposalData(proposalPk);

  if (!proposalData) {
    return <UOLoader />;
  }

  const sampleAnswers = getSamplesAnswers(proposalData.questionary);

  if (sampleAnswers.length === 1) {
    return (
      <AddNewSample
        proposalPk={proposalPk}
        answer={sampleAnswers[0]}
        {...rest}
      />
    );
  }

  return <div></div>;
}

export default AddMoreSamples;
