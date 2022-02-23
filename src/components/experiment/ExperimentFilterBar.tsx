import React from 'react';
import {
  NumberParam,
  QueryParamConfig,
  useQueryParams,
} from 'use-query-params';

import {
  DefaultQueryParams,
  UrlQueryParamsType,
} from 'components/common/SuperMaterialTable';

export type ExperimentUrlQueryParamsType = {
  callId: QueryParamConfig<number | null | undefined>;
  instrumentId: QueryParamConfig<number | null | undefined>;
} & UrlQueryParamsType;

interface ExperimentFilterBarProps {
  visit?: number;
}

function ExperimentFilterBar(props: ExperimentFilterBarProps) {
  const [urlQueryParams, setUrlQueryParams] =
    useQueryParams<ExperimentUrlQueryParamsType>({
      ...DefaultQueryParams,
      callId: NumberParam,
      instrumentId: NumberParam,
    });

  return <div>Bar</div>;
}

export default ExperimentFilterBar;
