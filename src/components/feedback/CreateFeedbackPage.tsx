import Grid from '@mui/material/Grid';
import React from 'react';
import { useParams } from 'react-router';

import { StyledContainer, StyledPaper } from 'styles/StyledComponents';

import CreateFeedback from './CreateFeedback';

function CreateFeedbackPage() {
  const { scheduledEventId } = useParams<{ scheduledEventId: string }>();

  if (!scheduledEventId) {
    return <span>Missing query params</span>;
  }

  return (
    <StyledContainer maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper>
            <CreateFeedback scheduledEventId={+scheduledEventId} />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default CreateFeedbackPage;
