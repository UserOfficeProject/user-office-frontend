import { ProposalStatusDefaultShortCodes } from 'components/proposal/ProposalsSharedConstants';
import { ProposalSubmissionState } from 'models/questionary/proposal/ProposalSubmissionState';
import { ProposalWithQuestionary } from 'models/questionary/proposal/ProposalWithQuestionary';
import { QuestionarySubmissionState } from 'models/questionary/QuestionarySubmissionState';

import { QuestionaryWizardStep } from '../../DefaultWizardStepFactory';

export class ProposalQuestionaryWizardStep extends QuestionaryWizardStep {
  isItemWithQuestionaryEditable(state: QuestionarySubmissionState) {
    const { proposal } = state as ProposalSubmissionState;

    const isCallActive = proposal.call?.isActive ?? true;
    const isCallInternalActive = proposal.call?.isActiveInternal ?? true;
    const proposalStatus = this.getProposalStatus(proposal);

    if (this.isProposalStatusEditable(proposalStatus)) {
      return true;
    }

    if (isCallActive || isCallInternalActive) {
      return proposalStatus === 'DRAFT';
    } else {
      return false;
    }
  }

  private getProposalStatus(proposal: ProposalWithQuestionary) {
    if (proposal.status != null) {
      return proposal.status.shortCode.toString();
    } else {
      return 'Proposal Status is null';
    }
  }
  private isProposalStatusEditable(proposalStatus: string) {
    return (
      proposalStatus === ProposalStatusDefaultShortCodes.EDITABLE_SUBMITTED ||
      proposalStatus ===
        ProposalStatusDefaultShortCodes.EDITABLE_SUBMITTED_INTERNAL
    );
  }
}
