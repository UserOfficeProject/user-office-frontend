import People from '@material-ui/icons/People';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import PeopleTable from 'components/user/PeopleTable';
import { BasicUserDetails, UserRole } from 'generated/sdk';

import ParticipantModal from './ParticipantModal';

type ProposalParticipantsProps = {
  /** Basic user details array to be shown in the modal. */
  users: BasicUserDetails[];
  /** Function for setting up the users. */
  setUsers: (users: BasicUserDetails[]) => void;
};

const ProposalParticipants: React.FC<ProposalParticipantsProps> = ({
  users,
  setUsers,
}) => {
  const [modalOpen, setOpen] = useState(false);

  const addUsers = (addedUsers: BasicUserDetails[]) => {
    setUsers([...users, ...addedUsers]);
    setOpen(false);
  };

  const removeUser = (user: BasicUserDetails) => {
    const newUsers = [...users];
    newUsers.splice(newUsers.indexOf(user), 1);
    setUsers(newUsers);
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <ParticipantModal
        show={modalOpen}
        close={() => setOpen(false)}
        addParticipants={addUsers}
        selectedUsers={users.map(user => user.id)}
        title={'Add Co-Proposer'}
        selection={true}
        userRole={UserRole.USER}
      />
      <PeopleTable
        title="Co-Proposers"
        actionIcon={<People data-cy="co-proposers-button" />}
        actionText={'Add Co-Proposers'}
        action={openModal}
        isFreeAction={true}
        selection={false}
        data={users}
        search={false}
        userRole={UserRole.USER}
        invitationUserRole={UserRole.USER}
        onRemove={removeUser}
      />
    </React.Fragment>
  );
};

ProposalParticipants.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default ProposalParticipants;
