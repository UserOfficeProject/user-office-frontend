import React from 'react';

import UOLoader from 'components/common/UOLoader';
import { useVisit } from 'hooks/visit/useVisit';
import { VisitBasic } from 'models/VisitSubmissionState';

import VisitRegistrationContainer from './VisitRegistrationContainer';

interface UpdateVisitRegistrationProps {
  visit: VisitBasic;
  onUpdate?: (visit: VisitBasic) => void;
}

function UpdateVisitRegistration({
  onUpdate,
  visit: { id },
}: UpdateVisitRegistrationProps) {
  const { visit } = useVisit(id);

  if (!visit) {
    return <UOLoader />;
  }

  return <VisitRegistrationContainer visit={visit} onUpdate={onUpdate} />;
}

export default UpdateVisitRegistration;
