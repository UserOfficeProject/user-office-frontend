import {
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
} from 'react';

import { UserContext } from 'context/UserContextProvider';
import { Facility, UserRole } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useFacilitiesData(): {
  loading: boolean;
  data: Facility[];
  setDataWithLoading: Dispatch<SetStateAction<Facility[]>>;
} {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loadingFacilities, setLoadingFacilities] = useState(true);
  const { currentRole } = useContext(UserContext);

  const api = useDataApi();

  const setFacilitiesWithLoading = (data: SetStateAction<Facility[]>) => {
    setLoadingFacilities(true);
    setFacilities(data);
    setLoadingFacilities(false);
  };

  useEffect(() => {
    let unmounted = false;

    setLoadingFacilities(true);
    if (
      currentRole &&
      [
        UserRole.USER_OFFICER,
        UserRole.SEP_REVIEWER,
        UserRole.SEP_CHAIR,
        UserRole.SEP_SECRETARY,
        UserRole.USER,
      ].includes(currentRole)
    ) {
      api()
        .getFacilities()
        .then((data) => {
          if (unmounted) {
            return;
          }

          if (data.facilities) {
            setFacilities(data.facilities);
          }
          setLoadingFacilities(false);
        });
    }

    return () => {
      // used to avoid unmounted component state update error
      unmounted = true;
    };
  }, [api, currentRole]);

  return {
    loading: loadingFacilities,
    data: facilities,
    setDataWithLoading: setFacilitiesWithLoading,
  };
}
