import { useEffect, useState } from 'react';

import { GetTemplatesQuery } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

import { TemplatesFilter } from './../../generated/sdk';

export function useTemplates(filter: TemplatesFilter) {
  const [templatesFilter, setTemplatesFilter] = useState(filter);
  const api = useDataApi();
  const [templates, setTemplates] = useState<GetTemplatesQuery['templates']>(
    null
  );
  useEffect(() => {
    api()
      .getTemplates({ filter: templatesFilter })
      .then((data) => {
        if (data.templates) {
          setTemplates(data.templates);
        }
      });
  }, [api, templatesFilter]);

  return { templates, setTemplates, setTemplatesFilter };
}
