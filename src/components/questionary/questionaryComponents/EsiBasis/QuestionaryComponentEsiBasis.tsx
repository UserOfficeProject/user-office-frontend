import React from 'react';

import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { EsiSubmissionState } from 'models/questionary/esi/EsiSubmissionState';

function QuestionaryComponentEsiBasis() {
  return <span>TODO</span>;
}

const esiBasisPreSubmit = () => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  const esi = (state as EsiSubmissionState).esi;

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

export {
  QuestionaryComponentEsiBasis as QuestionaryComponentEsiBasis,
  esiBasisPreSubmit,
};
