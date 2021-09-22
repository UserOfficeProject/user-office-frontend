import React, { useEffect, useState } from 'react';

import UOLoader from 'components/common/UOLoader';
import { QuestionaryStep } from 'generated/sdk';
import { useCallData } from 'hooks/call/useCallData';
import { useProposalData } from 'hooks/proposal/useProposalData';
import { useBlankQuestionaryStepsData } from 'hooks/questionary/useBlankQuestionaryStepsData';
import { EsiWithQuestionary } from 'models/questionary/esi/EsiWithQuestionary';

import EsiContainer from './EsiContainer';

function createEsiStub(
  templateId: number,
  questionarySteps: QuestionaryStep[]
): EsiWithQuestionary {
  return {
    id: 0,
    isSubmitted: false,
    created: new Date(),
    creatorId: 0,
    questionaryId: 0,
    visitId: 0,
    samples: [],
    questionary: {
      isCompleted: false,
      questionaryId: 0,
      templateId: templateId,
      created: new Date(),
      steps: questionarySteps,
    },
  };
}

interface CreateEsiProps {
  onCreate?: (esi: EsiWithQuestionary) => void;
  onUpdate?: (esi: EsiWithQuestionary) => void;
  onSubmitted?: (esi: EsiWithQuestionary) => void;
  proposalPk: number;
}
function CreateEsi({
  onCreate,
  onUpdate,
  onSubmitted,
  proposalPk,
}: CreateEsiProps) {
  const [blankEsi, setBlankEsi] = useState<EsiWithQuestionary>();
  const { proposalData } = useProposalData(proposalPk);
  const { call } = useCallData(proposalData?.callId);
  const { questionarySteps } = useBlankQuestionaryStepsData(
    call?.esiTemplateId
  );

  useEffect(() => {
    if (!call?.esiTemplateId || !questionarySteps) {
      return;
    }
    const blankEsi = createEsiStub(call.esiTemplateId, questionarySteps);
    setBlankEsi(blankEsi);
  }, [setBlankEsi, questionarySteps, call?.esiTemplateId]);

  if (!blankEsi) {
    return <UOLoader />;
  }

  return (
    <EsiContainer
      esi={blankEsi}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onSubmitted={onSubmitted}
    />
  );
}

export default CreateEsi;
