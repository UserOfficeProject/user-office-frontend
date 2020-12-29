import React, { useContext, useEffect, useState } from 'react';

import UOLoader from 'components/common/UOLoader';
import { UserContext } from 'context/UserContextProvider';
import {
  BasicUserDetails,
  QuestionaryStep,
  ShipmentStatus,
  TemplateCategoryId,
} from 'generated/sdk';
import { ShipmentExtended } from 'models/ShipmentSubmissionState';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

import ShipmentContainer from './ShipmentContainer';

function createShipmentStub(
  creator: BasicUserDetails,
  questionarySteps: QuestionaryStep[],
  templateId: number
): ShipmentExtended {
  return {
    id: 0,
    title: '',
    status: ShipmentStatus.DRAFT,
    externalRef: '',
    questionaryId: 0,
    created: new Date(),
    creatorId: creator.id,
    proposalId: 0,
    questionary: {
      questionaryId: 0,
      templateId: templateId,
      created: new Date(),
      steps: questionarySteps,
    },
    samples: [],
  };
}

function CreateShipment() {
  const { user } = useContext(UserContext);
  const { api } = useDataApiWithFeedback();
  const [blankShipment, setBlankShipment] = useState<ShipmentExtended>();

  useEffect(() => {
    api()
      .getActiveTemplateId({
        templateCategoryId: TemplateCategoryId.SHIPMENT_DECLARATION,
      })
      .then(data => {
        if (data.activeTemplateId) {
          api()
            .getBlankQuestionarySteps({ templateId: data.activeTemplateId })
            .then(result => {
              if (result.blankQuestionarySteps) {
                const blankShipment = createShipmentStub(
                  user,
                  result.blankQuestionarySteps,
                  data.activeTemplateId!
                );
                setBlankShipment(blankShipment);
              }
            });
        }
      });
  }, [setBlankShipment, api, user]);

  if (!blankShipment) {
    return <UOLoader />;
  }

  return <ShipmentContainer shipment={blankShipment} />;
}

export default CreateShipment;
