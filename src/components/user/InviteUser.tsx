import React from 'react';

import { BasicUserDetails, UserRole } from 'generated/sdk';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { FunctionType } from 'utils/utilTypes';

import InviteUserForm from './InviteUserForm';

type InviteUserProps = {
  action: FunctionType<void, [BasicUserDetails]>;
  title: string;
  userRole: UserRole;
  close: FunctionType;
};

const InviteUser: React.FC<InviteUserProps> = ({
  action,
  title,
  userRole,
  close,
}) => {
  const { api } = useDataApiWithFeedback();

  return (
    <InviteUserForm
      title={title}
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        userRole: userRole,
      }}
      onSubmit={async (emailInvite) => {
        const createResult = await api(
          'Invitation sent successfully!'
        ).createUserByEmailInvite({ emailInvite });
        if (createResult?.createUserByEmailInvite.user) {
          action(createResult?.createUserByEmailInvite.user);
          close();
        }
      }}
      close={close}
    />
  );
};

export default InviteUser;
