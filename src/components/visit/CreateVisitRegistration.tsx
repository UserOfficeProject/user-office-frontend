import React, { useContext, useEffect, useState } from 'react';

import UOLoader from 'components/common/UOLoader';
import { UserContext } from 'context/UserContextProvider';
import { QuestionaryStep, TemplateCategoryId } from 'generated/sdk';
import {
  RegistrationBasic,
  RegistrationExtended,
} from 'models/VisitSubmissionState';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

import VisitRegistrationContainer from './VisitRegistrationContainer';

function createRegistrationStub(
  userId: number,
  templateId: number,
  questionarySteps: QuestionaryStep[],
  visitId: number
): RegistrationExtended {
  return {
    userId: userId,
    registrationQuestionaryId: 0,
    isRegistrationSubmitted: false,
    trainingExpiryDate: null,
    visitId: visitId,
    questionary: {
      questionaryId: 0,
      templateId: templateId,
      created: new Date(),
      steps: questionarySteps,
    },
  };
}

interface CreateVisitProps {
  onCreate?: (visit: RegistrationBasic) => void;
  onUpdate?: (visit: RegistrationBasic) => void;
  visitId: number;
}
function CreateVisit({ onCreate, onUpdate, visitId }: CreateVisitProps) {
  const { user } = useContext(UserContext);
  const { api } = useDataApiWithFeedback();
  const [blankVisit, setBlankRegistration] = useState<RegistrationExtended>();

  useEffect(() => {
    api()
      .getActiveTemplateId({
        templateCategoryId: TemplateCategoryId.VISIT,
      })
      .then(({ activeTemplateId }) => {
        if (activeTemplateId) {
          api()
            .getBlankQuestionarySteps({ templateId: activeTemplateId })
            .then((result) => {
              if (result.blankQuestionarySteps) {
                const blankRegistration = createRegistrationStub(
                  user.id,
                  activeTemplateId,
                  result.blankQuestionarySteps,
                  visitId
                );
                setBlankRegistration(blankRegistration);
              }
            });
        }
      });
  }, [setBlankRegistration, api, user]);

  if (!blankVisit) {
    return <UOLoader />;
  }

  return (
    <VisitRegistrationContainer
      registration={blankVisit}
      onCreate={onCreate}
      onUpdate={onUpdate}
    />
  );
}

export default CreateVisit;
