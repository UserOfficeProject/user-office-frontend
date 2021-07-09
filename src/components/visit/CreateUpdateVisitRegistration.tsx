import React from 'react';

import { VisitBasic } from 'models/VisitSubmissionState';

import CreateVisitRegistration from './CreateVisitRegistration';
import UpdateVisitRegistration from './UpdateVisitRegistration';

type CreateUpdateVisitRegistrationProps = {
  onCreate?: (visit: VisitBasic) => void;
  onUpdate?: (visit: VisitBasic) => void;
  visit: VisitBasic | null;
};

function CreateUpdateVisitRegistration({
  visit,
  onCreate,
  onUpdate,
}: CreateUpdateVisitRegistrationProps) {
  return visit ? (
    <UpdateVisitRegistration visit={visit} onUpdate={onUpdate} />
  ) : (
    <CreateVisitRegistration onCreate={onCreate} onUpdate={onUpdate} />
  );
}

export default CreateUpdateVisitRegistration;
