import { ExcludeNull } from 'utils/utilTypes';

import { GetEsiQuery } from './../../../generated/sdk';

export type EsiWithQuestionary = ExcludeNull<GetEsiQuery['esi']>;
