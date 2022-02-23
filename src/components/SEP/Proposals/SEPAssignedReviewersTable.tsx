import MaterialTable from '@material-table/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Visibility from '@material-ui/icons/Visibility';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { NumberParam, useQueryParams } from 'use-query-params';

import { useCheckAccess } from 'components/common/Can';
import ProposalReviewContent, {
  TabNames,
} from 'components/review/ProposalReviewContent';
import ProposalReviewModal from 'components/review/ProposalReviewModal';
import { ReviewAndAssignmentContext } from 'context/ReviewAndAssignmentContextProvider';
import { SepAssignment, ReviewStatus, UserRole } from 'generated/sdk';
import { SEPProposalType } from 'hooks/SEP/useSEPProposalsData';
import { tableIcons } from 'utils/materialIcons';

// NOTE: Some custom styles for row expand table.
const useStyles = makeStyles(() => ({
  root: {
    '& tr:last-child td': {
      border: 'none',
    },
    '& .MuiPaper-root': {
      padding: '0 40px',
      backgroundColor: '#fafafa',
    },
  },
}));

type SEPAssignedReviewersTableProps = {
  sepProposal: SEPProposalType;
  removeAssignedReviewer: (
    assignedReviewer: SepAssignment,
    proposalPk: number
  ) => Promise<void>;
  updateView: (currentAssignment: SepAssignment) => void;
};

const assignmentColumns = [
  {
    title: 'First name',
    field: 'user.firstname',
  },
  {
    title: 'Last name',
    field: 'user.lastname',
  },
  {
    title: 'Date assigned',
    field: 'dateAssigned',
    render: (rowData: SepAssignment): string =>
      dateformat(new Date(rowData.dateAssigned), 'dd-mmm-yyyy HH:MM:ss'),
  },
  { title: 'Review status', field: 'review.status' },
  {
    title: 'Grade',
    field: 'review.grade',
    emptyValue: '-',
  },
];

const SEPAssignedReviewersTable: React.FC<SEPAssignedReviewersTableProps> = ({
  sepProposal,
  removeAssignedReviewer,
  updateView,
}) => {
  const [urlQueryParams, setUrlQueryParams] = useQueryParams({
    reviewerModal: NumberParam,
    modalTab: NumberParam,
  });
  const classes = useStyles();
  const { setCurrentAssignment, currentAssignment } = useContext(
    ReviewAndAssignmentContext
  );
  const hasAccessRights = useCheckAccess([
    UserRole.USER_OFFICER,
    UserRole.SEP_CHAIR,
    UserRole.SEP_SECRETARY,
  ]);

  const isDraftStatus = (status?: ReviewStatus) =>
    status === ReviewStatus.DRAFT;

  const reviewProposalTabNames: TabNames[] = [
    'Proposal information',
    'Technical review',
    'Grade',
  ];

  return (
    <div className={classes.root} data-cy="sep-reviewer-assignments-table">
      <ProposalReviewModal
        title={`Proposal: ${sepProposal.proposal.title} (${sepProposal.proposal.proposalId})`}
        proposalReviewModalOpen={!!urlQueryParams.reviewerModal}
        setProposalReviewModalOpen={() => {
          setUrlQueryParams({ reviewerModal: undefined, modalTab: undefined });
          currentAssignment && updateView(currentAssignment);
        }}
      >
        <ProposalReviewContent
          reviewId={urlQueryParams.reviewerModal}
          sepId={sepProposal.sepId}
          tabNames={reviewProposalTabNames}
        />
      </ProposalReviewModal>

      <MaterialTable
        icons={tableIcons}
        columns={assignmentColumns}
        title={'Assigned reviewers'}
        data={(sepProposal.assignments as SepAssignment[]).map(
          (sepAssignment) =>
            Object.assign(sepAssignment, { id: sepAssignment.sepMemberUserId })
        )}
        editable={
          hasAccessRights
            ? {
                deleteTooltip: () => 'Remove assignment',
                onRowDelete: (
                  rowAssignmentsData: SepAssignment
                ): Promise<void> =>
                  removeAssignedReviewer(
                    rowAssignmentsData,
                    sepProposal.proposalPk
                  ),
              }
            : {}
        }
        actions={[
          (rowData) => ({
            icon: isDraftStatus(rowData?.review?.status)
              ? () => <RateReviewIcon data-cy="grade-proposal-icon" />
              : () => <Visibility data-cy="view-proposal-details-icon" />,
            onClick: () => {
              if (!rowData.review) {
                return;
              }

              setUrlQueryParams({
                modalTab: isDraftStatus(rowData?.review?.status)
                  ? reviewProposalTabNames.indexOf('Grade')
                  : reviewProposalTabNames.indexOf('Proposal information'),
                reviewerModal: rowData.review.id,
              });
              setCurrentAssignment({
                ...rowData,
                proposalPk: sepProposal.proposalPk,
              });
            },
            tooltip: isDraftStatus(rowData?.review?.status)
              ? 'Grade proposal'
              : 'View review',
          }),
        ]}
        options={{
          search: false,
          paging: false,
          toolbar: false,
          headerStyle: { backgroundColor: '#fafafa' },
        }}
      />
    </div>
  );
};

SEPAssignedReviewersTable.propTypes = {
  sepProposal: PropTypes.any.isRequired,
  removeAssignedReviewer: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
};

export default SEPAssignedReviewersTable;
