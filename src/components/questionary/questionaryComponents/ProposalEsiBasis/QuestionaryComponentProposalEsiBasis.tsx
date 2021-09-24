import React from 'react';

import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { ProposalEsiSubmissionState } from 'models/questionary/proposalEsi/ProposalEsiSubmissionState';

function QuestionaryComponentProposalEsiBasis() {
  return <span>TODO</span>;
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
