import { useCallback, useContext } from 'react';

import {
  DownloadContext,
  PREPARE_DOWNLOAD_TYPE,
} from 'context/DownloadContextProvider';

export function useDownloadXLSXProposal() {
  const { prepareDownload } = useContext(DownloadContext);
  const downloadProposalXLSX = useCallback(
    (proposalPKs: number[], name: string) => {
      prepareDownload(PREPARE_DOWNLOAD_TYPE.XLSX_PROPOSAL, proposalPKs, name);
    },
    [prepareDownload]
  );

  return downloadProposalXLSX;
}
