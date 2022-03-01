import Grid from '@mui/material/Grid';
import parse from 'html-react-parser';
import React from 'react';

import { PageName } from 'generated/sdk';
import { useGetPageContent } from 'hooks/admin/useGetPageContent';
import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

const HelpPage: React.FC = () => {
  const [loadingHelpContent, helpPageContent] = useGetPageContent(
    PageName.HELPPAGE
  );

  return (
    <React.Fragment>
      <StyledContainer>
        <Grid container>
          <Grid item xs={12}>
            <StyledPaper>
              {loadingHelpContent ? null : parse(helpPageContent)}
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledContainer>
    </React.Fragment>
  );
};

export default HelpPage;
