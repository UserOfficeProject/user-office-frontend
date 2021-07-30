import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import People from '@material-ui/icons/People';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import PeopleTable from 'components/user/PeopleTable';
import { BasicUserDetails, UserRole } from 'generated/sdk';

import ParticipantModal from './ParticipantModal';

type ParticipantsProps = {
  /** Basic user details array to be shown in the modal. */
  users: BasicUserDetails[];
  /** Function for setting up the users. */
  setUsers: (users: BasicUserDetails[]) => void;
  className?: string;
  title: string;
};

const Participants: React.FC<ParticipantsProps> = ({
  users,
  setUsers,
  className,
  title,
}) => {
  const [modalOpen, setOpen] = useState(false);

  const addUsers = (addedUsers: BasicUserDetails[]) => {
    setUsers([...users, ...addedUsers]);
    setOpen(false);
  };

  const removeUser = (user: BasicUserDetails) => {
    const newUsers = users.filter((u) => u.id !== user.id);
    setUsers(newUsers);
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={className}>
      <ParticipantModal
        show={modalOpen}
        close={() => setOpen(false)}
        addParticipants={addUsers}
        selectedUsers={users.map((user) => user.id)}
        title={title}
        selection={true}
        userRole={UserRole.USER}
      />
      <FormControl margin="dense" fullWidth>
        <FormLabel component="div">
          {title}
          <Tooltip title={title}>
            <IconButton onClick={openModal}>
              <People data-cy="add-participant-button" />
            </IconButton>
          </Tooltip>
        </FormLabel>

        <PeopleTable
          mtOptions={{
            showTitle: false,
            toolbar: false,
            paging: false,
          }}
          isFreeAction={true}
          selection={false}
          data={users}
          search={false}
          userRole={UserRole.USER}
          invitationUserRole={UserRole.USER}
          onRemove={removeUser}
        />
      </FormControl>
    </div>
  );
};

Participants.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Participants;
