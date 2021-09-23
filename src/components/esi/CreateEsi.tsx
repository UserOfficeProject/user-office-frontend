import React, { useEffect, useState } from 'react';

import UOLoader from 'components/common/UOLoader';
import { QuestionaryStep } from 'generated/sdk';
import { useCallData } from 'hooks/call/useCallData';
import { useProposalData } from 'hooks/proposal/useProposalData';
import { useBlankQuestionaryStepsData } from 'hooks/questionary/useBlankQuestionaryStepsData';
import { useVisit } from 'hooks/visit/useVisit';
import { EsiWithQuestionary } from 'models/questionary/esi/EsiWithQuestionary';

import EsiContainer from './EsiContainer';

function createEsiStub(
  visitId: number,
  templateId: number,
  questionarySteps: QuestionaryStep[]
): EsiWithQuestionary {
  return {
    id: 0,
    isSubmitted: false,
    created: new Date(),
    creatorId: 0,
    questionaryId: 0,
    visitId: visitId,
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
  visitId: number;
}
function CreateEsi({
  onCreate,
  onUpdate,
  onSubmitted,
  visitId,
}: CreateEsiProps) {
  const [blankEsi, setBlankEsi] = useState<EsiWithQuestionary>();
  const { visit } = useVisit(visitId);
  const { proposalData } = useProposalData(visit?.proposalPk);
  const { call } = useCallData(proposalData?.callId);
  const { questionarySteps } = useBlankQuestionaryStepsData(
    call?.esiTemplateId
  );

  useEffect(() => {
    if (!call?.esiTemplateId || !questionarySteps || !visitId) {
      return;
    }
    const blankEsi = createEsiStub(
      visitId,
      call.esiTemplateId,
      questionarySteps
    );
    setBlankEsi(blankEsi);
  }, [setBlankEsi, questionarySteps, call?.esiTemplateId, visitId]);

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
