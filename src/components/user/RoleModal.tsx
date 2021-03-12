import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import React from 'react';

import { Role } from 'generated/sdk';

import RoleTable from './RoleTable';

type RoleModalProps = {
  show: boolean;
  close: () => void;
  add: (role: Role[]) => void;
  activeRoles: Role[];
};

const RoleModal: React.FC<RoleModalProps> = ({
  show,
  close,
  add,
  activeRoles,
}) => {
  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={show}
      onClose={() => close()}
      disableScrollLock={true}
      data-cy="role-modal"
    >
      <DialogContent>
        <RoleTable add={add} activeRoles={activeRoles} />
      </DialogContent>
    </Dialog>
  );
};

RoleModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  activeRoles: PropTypes.array.isRequired,
};

export default RoleModal;
