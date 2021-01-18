import { SepProposalBasics } from 'hooks/SEP/useSEPProposalData';

export const getSepTimeAllocation = <
  T extends Pick<SepProposalBasics, 'sepTimeAllocation'> | undefined | null
>(
  SEPProposalData: T,
  timeAllocation: any
): number | null => {
  let sepTimeAllocation = null;

  // if the SEP time allocation is not null and is different from technical review's time allocation
  // use the SEP time allocation
  if (
    SEPProposalData?.sepTimeAllocation !== undefined &&
    SEPProposalData.sepTimeAllocation !== null &&
    SEPProposalData.sepTimeAllocation !== timeAllocation
  ) {
    sepTimeAllocation = SEPProposalData.sepTimeAllocation;
  }

  return sepTimeAllocation;
};
