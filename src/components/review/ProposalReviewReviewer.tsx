import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router';

import SimpleTabs from 'components/common/TabPanel';
import UOLoader from 'components/common/UOLoader';
import ProposalQuestionaryReview from 'components/review/ProposalQuestionaryReview';
import { useProposalData } from 'hooks/proposal/useProposalData';
import { useReviewData } from 'hooks/review/useReviewData';

import ProposalGrade from './ProposalGrade';
import TechnicalReviewInformation from './TechnicalReviewInformation';

type ProposalReviewProps = {
  reviewId?: number;
  sepId?: number | null;
};

const ProposalReview: React.FC<ProposalReviewProps> = ({ reviewId, sepId }) => {
  const { id } = useParams<{ id: string }>();
  const { reviewData } = useReviewData(reviewId || +id, sepId);
  const { proposalData } = useProposalData(reviewData?.proposal?.id);

  if (!reviewData || !proposalData) {
    return <UOLoader style={{ marginLeft: '50%', marginTop: '100px' }} />;
  }

  return (
    <SimpleTabs
      tabNames={['Proposal Information', 'Technical Review', 'Grade']}
    >
      <ProposalQuestionaryReview data={proposalData} />
      <TechnicalReviewInformation data={proposalData.technicalReview} />
      <ProposalGrade
        onChange={() => {}}
        reviewID={reviewId || +id}
        sepId={sepId}
      />
    </SimpleTabs>
  );
};

ProposalReview.propTypes = {
  reviewId: PropTypes.number,
  sepId: PropTypes.number,
};

export default ProposalReview;
