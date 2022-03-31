import { Chip, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { EmailInviteInput } from 'generated/sdk';

interface InviteParticipantsListProps {
  data: EmailInviteInput[];
  onDelete: (invite: EmailInviteInput) => void;
}
function InviteParticipantsList(props: InviteParticipantsListProps) {
  const { data, onDelete } = props;

  return (
    <>
      <Typography variant="caption">
        <Tooltip
          title="After you finish this step invited users will receive an email and will immediately become part of your proposal.
          The invitee will have to finish setting up their account to participate in proposal creation."
        >
          <span>Invite Co-Proposers</span>
        </Tooltip>
      </Typography>
      <Stack direction="row" spacing={1}>
        {data.map((invite) => (
          <Chip
            label={`${invite.firstname} ${invite.lastname} (${invite.email})`}
            onDelete={() => onDelete(invite)}
            key={invite.email}
          />
        ))}
      </Stack>
    </>
  );
}

export default InviteParticipantsList;
