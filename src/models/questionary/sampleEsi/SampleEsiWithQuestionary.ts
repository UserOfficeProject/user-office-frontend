import { ExcludeNull } from 'utils/utilTypes';

import { GetEsiQuery } from '../../../generated/sdk';

export type SampleEsiWithQuestionary = ExcludeNull<GetEsiQuery['esi']>;
