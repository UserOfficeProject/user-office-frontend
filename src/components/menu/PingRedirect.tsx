import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

function PingRedirect() {
  const location = useLocation();
  const hashFragment = location.hash;
  const urlParamsAsString = hashFragment.replace(/^#/, '');
  const params = new URLSearchParams(urlParamsAsString);
  const accessTokenQueryParam = params.get('access_token');
  if (params.get('access_token') !== null) {
    return (
      <Redirect
        to={{
          pathname: `/external-auth`,
          search: `token=${accessTokenQueryParam}`,
        }}
      />
    );
  } else {
    return null;
  }
}

export default PingRedirect;
