import React, { useContext } from 'react';

import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { ProposalEsiContextType } from 'components/proposalEsi/ProposalEsiContainer';
import { QuestionaryContext } from 'components/questionary/QuestionaryContext';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { ProposalEsiSubmissionState } from 'models/questionary/proposalEsi/ProposalEsiSubmissionState';

import { QuestionnairesList } from '../QuestionnairesList';

function QuestionaryComponentProposalEsiBasis({}: BasicComponentProps) {
  const { state } = useContext(QuestionaryContext) as ProposalEsiContextType;

  return (
    <QuestionnairesList
      data={
        state?.esi.samples.map((sample) => ({
          id: sample.id,
          label: sample.title,
          isCompleted: sample.questionary.isCompleted,
        })) ?? []
      }
      onEditClick={(item) => {}}
      onDeleteClick={(item) => {}}
      onCloneClick={(item) => {}}
      onAddNewClick={() => {}}
    />
  );
}

const proposalEsiBasisPreSubmit = () => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  const esi = (state as ProposalEsiSubmissionState).esi;

  const esiExists = esi.id > 0;

  let questionaryId: number;
  if (esiExists) {
    questionaryId = esi.questionary.questionaryId;
  } else {
    // create new item with questionary
    const result = await api.createEsi({
      visitId: esi.visitId,
    });
    const newEsi = result.createEsi.esi;

    if (newEsi) {
      dispatch({
        type: 'ESI_CREATED',
        esi: newEsi,
      });
      questionaryId = newEsi.questionary.questionaryId;
    } else {
      return 0; // error
    }
  }

  return questionaryId;
};

export { QuestionaryComponentProposalEsiBasis, proposalEsiBasisPreSubmit };
