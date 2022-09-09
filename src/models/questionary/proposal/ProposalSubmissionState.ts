import { immerable } from 'immer';

import { Questionary, TemplateGroupId } from 'generated/sdk';
import { ProposalStatusDefaultShortCodes } from 'utils/sharedConstants';

import { QuestionarySubmissionState } from '../QuestionarySubmissionState';
import { ProposalWithQuestionary } from './ProposalWithQuestionary';

export class ProposalSubmissionState extends QuestionarySubmissionState {
  [immerable] = true;
  constructor(
    public proposal: ProposalWithQuestionary,
    public isPreviewMode: boolean | undefined
  ) {
    super(TemplateGroupId.PROPOSAL, proposal, isPreviewMode);
    this.stepIndex = this.getInitialStepIndex();
  }

  getItemId(): number {
    return this.proposal.primaryKey;
  }

  get itemWithQuestionary() {
    return this.proposal;
  }

  set itemWithQuestionary(item: { questionary: Questionary }) {
    this.proposal = { ...this.proposal, ...item };
  }

  private isProposalStatusEditable(proposalStatus: string) {
    return proposalStatus
      ? proposalStatus === ProposalStatusDefaultShortCodes.EDITABLE_SUBMITTED ||
          proposalStatus ===
            ProposalStatusDefaultShortCodes.EDITABLE_SUBMITTED_INTERNAL
      : false;
  }

  getInitialStepIndex(): number {
    if (
      this.isProposalStatusEditable(
        this.proposal?.status?.shortCode.toString() as string
      )
    ) {
      return 0;
    }

    return super.getInitialStepIndex();
  }
}
