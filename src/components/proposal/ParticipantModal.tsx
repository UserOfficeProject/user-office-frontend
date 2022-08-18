import AddBox from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import { useCheckAccess } from 'components/common/Can';
import PeopleTable from 'components/user/PeopleTable';
import ProposalPeopleTable from 'components/user/ProposalsPeopleTable';
import { UserRole, BasicUserDetails } from 'generated/sdk';

function ParticipantModal(props: {
  title: string;
  addParticipants: (data: BasicUserDetails[]) => void;
  show: boolean;
  close: () => void;
  selection?: boolean;
  selectedUsers?: number[];
  userRole?: UserRole;
  invitationUserRole?: UserRole;
  participant?: boolean;
}) {
  const addUser = (rowData: BasicUserDetails | BasicUserDetails[]) => {
    const addedUserDetails = rowData as BasicUserDetails;

    props.addParticipants([addedUserDetails]);
  };

  const userTableProps = {
    title: props.title,
    action: {
      fn: addUser,
      actionText: 'Select user',
      actionIcon: <AddBox data-cy="select-user" />,
    },
    selectedUsers: props.selectedUsers,
    userRole: props.userRole || ('' as UserRole),
    emailInvite: true,
    selection: !!props.selection,
    onUpdate: (data: BasicUserDetails[]) => props.addParticipants(data),
    invitationUserRole: props.invitationUserRole || props.userRole,
  };

  const isUserOfficer = useCheckAccess([UserRole.USER_OFFICER]);

  const peopleTable = <PeopleTable {...userTableProps} />;

  const proposalPeopleTable = <ProposalPeopleTable {...userTableProps} />;

  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.show}
      onClose={(_, reason) => {
        if (reason && reason == 'backdropClick') return;
        if (reason && reason == 'escapeKeyDown') return;
        props.close();
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        {props.participant && !isUserOfficer
          ? proposalPeopleTable
          : peopleTable}
        <ActionButtonContainer>
          <Button
            data-cy="close-modal-btn"
            onClick={() => props.close()}
            fullWidth
            variant="text"
          >
            Close
          </Button>
        </ActionButtonContainer>
      </DialogContent>
    </Dialog>
  );
}

export default ParticipantModal;
