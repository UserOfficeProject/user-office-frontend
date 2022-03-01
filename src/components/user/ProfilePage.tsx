import PropTypes from 'prop-types';
import React from 'react';

import SimpleTabs from 'components/common/TabPanel';
import { StyledContainer } from 'styles/StyledComponents';

import UpdatePassword from './UpdatePassword';
import UpdateUserInformation from './UpdateUserInformation';

const ProfilePagePropTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

type ProfilePageProps = PropTypes.InferProps<typeof ProfilePagePropTypes>;

const ProfilePage: React.FC<ProfilePageProps> = ({ match }) => {
  return (
    <StyledContainer>
      <SimpleTabs tabNames={['General', 'Settings']}>
        <UpdateUserInformation id={parseInt(match.params.id)} />
        <UpdatePassword id={parseInt(match.params.id)} />
      </SimpleTabs>
    </StyledContainer>
  );
};

ProfilePage.propTypes = ProfilePagePropTypes;

export default ProfilePage;
