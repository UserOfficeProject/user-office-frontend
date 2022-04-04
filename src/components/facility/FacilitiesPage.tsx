import React from 'react';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import FacilitiesTable from './FacilitiesTable';

const FacilitiesPage: React.FC = () => {
  return (
    <StyledContainer>
      <StyledPaper>
        <FacilitiesTable />
      </StyledPaper>
    </StyledContainer>
  );
};

export default FacilitiesPage;
