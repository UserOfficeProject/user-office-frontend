import React from 'react';
import { DateParam, NumberParam, useQueryParams } from 'use-query-params';

import CallFilter from 'components/common/proposalFilters/CallFilter';
import InstrumentFilter from 'components/common/proposalFilters/InstrumentFilter';
import { DefaultQueryParams } from 'components/common/SuperMaterialTable';
import { useCallsData } from 'hooks/call/useCallsData';
import { useInstrumentsData } from 'hooks/instrument/useInstrumentsData';

import DateFilter from './DateFilter';
import { ExperimentUrlQueryParamsType } from './ExperimentUrlQueryParamsType';

function ExperimentFilterBar() {
  const [urlQueryParams, setUrlQueryParams] =
    useQueryParams<ExperimentUrlQueryParamsType>({
      ...DefaultQueryParams,
      call: NumberParam,
      instrument: NumberParam,
      from: DateParam,
      to: DateParam,
    });

  const { instruments, loadingInstruments } = useInstrumentsData();
  const { calls, loadingCalls } = useCallsData();

  return (
    <div>
      <CallFilter
        callId={urlQueryParams.call ?? undefined}
        calls={calls}
        isLoading={loadingCalls}
        shouldShowAll={true}
        onChange={(callId) => {
          setUrlQueryParams({ call: callId });
        }}
      />

      <InstrumentFilter
        instrumentId={urlQueryParams.instrument ?? undefined}
        instruments={instruments}
        isLoading={loadingInstruments}
        shouldShowAll={true}
        onChange={(instrumentId) => {
          setUrlQueryParams({ instrument: instrumentId });
        }}
      />

      <DateFilter
        from={urlQueryParams.from ?? undefined}
        to={urlQueryParams.to ?? undefined}
        onChange={(from, to) => {
          setUrlQueryParams({ from: from, to: to });
        }}
      />
    </div>
  );
}

export default ExperimentFilterBar;
