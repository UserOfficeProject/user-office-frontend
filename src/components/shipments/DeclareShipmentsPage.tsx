import Grid from '@mui/material/Grid';
import React from 'react';
import { useParams } from 'react-router';

import { ContentContainer, StyledPaper } from 'styles/StyledComponents';

import DeclareShipments from './DeclareShipments';

export default function DeclareShipmentsPage() {
  const { scheduledEventId } = useParams<{ scheduledEventId: string }>();

  if (!scheduledEventId) {
    return <span>Missing query params</span>;
  }

  return (
    <ContentContainer maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper>
            <DeclareShipments scheduledEventId={+scheduledEventId} />
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
