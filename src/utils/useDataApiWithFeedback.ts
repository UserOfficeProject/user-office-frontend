import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

import { useDataApi } from 'hooks/common/useDataApi';

const isMutationResult = (result: Record<string, unknown>) => {
  return result.hasOwnProperty('error');
};

function useDataApiWithFeedback() {
  const dataApi = useDataApi();
  const { enqueueSnackbar } = useSnackbar();
  const [isExecutingCall, setIsExecutingCall] = useState(false);

  const api = useCallback(
    (successToastMessage?: string) =>
      new Proxy(dataApi(), {
        get(target, prop) {
          return async (args: any) => {
            setIsExecutingCall(true);

            // @ts-expect-error
            const serverResponse = await target[prop](args);
            const result = serverResponse[prop];

            if (result && isMutationResult(result)) {
              if (result.error) {
                enqueueSnackbar(result.error, {
                  variant: 'error',
                  className: 'snackbar-error',
                  autoHideDuration: 10000,
                });
              } else {
                successToastMessage &&
                  enqueueSnackbar(successToastMessage, {
                    variant: 'success',
                    className: 'snackbar-success',
                    autoHideDuration: 10000,
                  });
              }
            }
            setIsExecutingCall(false);

            return serverResponse;
          };
        },
      }),
    [setIsExecutingCall, dataApi, enqueueSnackbar]
  );

  return { api, isExecutingCall };
}

export default useDataApiWithFeedback;
