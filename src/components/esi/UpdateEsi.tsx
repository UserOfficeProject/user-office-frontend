import React from 'react';

import UOLoader from 'components/common/UOLoader';
import { useEsi } from 'hooks/esi/useEsi';
import { EsiCore } from 'models/questionary/esi/EsiCore';

import EsiContainer from './EsiContainer';

interface UpdateEsiProps {
  esiId: number;
  onUpdate?: (esi: EsiCore) => void;
  onSubmitted?: (esi: EsiCore) => void;
}

function UpdateEsi({ esiId, onUpdate, onSubmitted }: UpdateEsiProps) {
  const { esi } = useEsi(esiId);

  if (!esi) {
    return <UOLoader />;
  }

  return (
    <EsiContainer esi={esi} onUpdate={onUpdate} onSubmitted={onSubmitted} />
  );
}

export default UpdateEsi;
