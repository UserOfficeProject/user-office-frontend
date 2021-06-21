import React, { useContext, useEffect, useState } from 'react';

import UOLoader from 'components/common/UOLoader';
import { UserContext } from 'context/UserContextProvider';
import {
  BasicUserDetails,
  QuestionaryStep,
  ShipmentStatus,
  TemplateCategoryId,
} from 'generated/sdk';
import {
  ShipmentBasic,
  ShipmentExtended,
} from 'models/ShipmentSubmissionState';
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
    proposalPK: 0,
    questionary: {
      questionaryId: 0,
      templateId: templateId,
      created: new Date(),
      steps: questionarySteps,
    },
    proposal: {
      shortCode: '123456',
    },
    samples: [],
  };
}

interface CreateShipmentProps {
  close: (shipment: ShipmentBasic | null) => void;
}
function CreateShipment({ close }: CreateShipmentProps) {
  const { user } = useContext(UserContext);
  const { api } = useDataApiWithFeedback();
  const [blankShipment, setBlankShipment] = useState<ShipmentExtended>();
  const [
    noActiveShipmentTemplates,
    setNoActiveShipmentTemplates,
  ] = useState<boolean>(false);

  useEffect(() => {
    api()
      .getActiveTemplateId({
        templateCategoryId: TemplateCategoryId.SHIPMENT_DECLARATION,
      })
      .then((data) => {
        if (data.activeTemplateId) {
          api()
            .getBlankQuestionarySteps({ templateId: data.activeTemplateId })
            .then((result) => {
              if (result.blankQuestionarySteps) {
                const blankShipment = createShipmentStub(
                  user,
                  result.blankQuestionarySteps,
                  data.activeTemplateId as number
                );
                setBlankShipment(blankShipment);
              }
              setNoActiveShipmentTemplates(false);
            });
        } else {
          setNoActiveShipmentTemplates(true);
        }
      });
  }, [setBlankShipment, api, user]);

  if (noActiveShipmentTemplates) {
    return <div>No active templates found</div>;
  }

  if (!blankShipment) {
    return <UOLoader />;
  }

  return (
    <ShipmentContainer
      shipment={blankShipment}
      done={(shipment) => close({ ...shipment })} // because of immer immutable object we clone it before sending out
    />
  );
}

export default CreateShipment;
