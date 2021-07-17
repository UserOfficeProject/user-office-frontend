import React from 'react';

import { RegistrationBasic } from 'models/VisitSubmissionState';

import CreateVisitRegistration from './CreateVisitRegistration';
import UpdateVisitRegistration from './UpdateVisitRegistration';

type CreateUpdateVisitRegistrationProps = {
  onCreate?: (registration: RegistrationBasic) => void;
  onUpdate?: (registration: RegistrationBasic) => void;
  registration: RegistrationBasic;
};

function CreateUpdateVisitRegistration({
  registration,
  onCreate,
  onUpdate,
}: CreateUpdateVisitRegistrationProps) {
  const hasQuestionary = !!registration.registrationQuestionaryId;

  return hasQuestionary ? (
    <UpdateVisitRegistration
      visitRegistration={registration}
      onUpdate={onUpdate}
    />
  ) : (
    <CreateVisitRegistration
      visitId={registration.visitId}
      onCreate={onCreate}
      onUpdate={onUpdate}
    />
  );
}

export default CreateUpdateVisitRegistration;
