import { Link } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import { StringParam, useQueryParams } from 'use-query-params';

import { SettingsContext } from 'context/SettingsContextProvider';
import { UserContext } from 'context/UserContextProvider';
import { SettingsId } from 'generated/sdk';
import { useUnauthorizedApi } from 'hooks/common/useDataApi';

const ExternalAuthQueryParams = {
  sessionid: StringParam,
  token: StringParam,
  code: StringParam,
};

function ExternalAuth() {
  const [urlQueryParams] = useQueryParams(ExternalAuthQueryParams);
  const externalToken = urlQueryParams.sessionid ?? urlQueryParams.code;

  const { token, handleLogin } = useContext(UserContext);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const unauthorizedApi = useUnauthorizedApi();

  const isFirstRun = useRef<boolean>(true);

  const settingsContext = useContext(SettingsContext);
  const externalAuthLoginUrl = settingsContext.settingsMap.get(
    SettingsId.EXTERNAL_AUTH_LOGIN_URL
  )?.settingsValue;

  useEffect(() => {
    if (!isFirstRun.current) {
      return;
    }
    isFirstRun.current = false;

    if (!externalToken) {
      return;
    }

    unauthorizedApi()
      .externalTokenLogin({ externalToken })
      .then((token) => {
        if (token.externalTokenLogin.rejection) {
          setError(token.externalTokenLogin.rejection.reason);

          return;
        }
        if (token.externalTokenLogin) {
          handleLogin(token.externalTokenLogin.token);
          const landingUrl = localStorage.getItem('landingUrl');
          localStorage.removeItem('landingUrl');
          window.location.href = landingUrl ?? '/';
        } else {
          if (externalAuthLoginUrl) {
            window.location.href = externalAuthLoginUrl;
          }
        }
      });
  }, [
    token,
    handleLogin,
    externalToken,
    unauthorizedApi,
    externalAuthLoginUrl,
  ]);

  if (error) {
    return (
      <div>
        Error occurred: {error}. <Link href="/">Go to frontpage</Link>
      </div>
    );
  }

  return <p>Logging in with external service...</p>;
}

export default ExternalAuth;
