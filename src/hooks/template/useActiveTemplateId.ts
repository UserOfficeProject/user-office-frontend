import { useEffect, useState } from 'react';

import { TemplateCategoryId } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useActiveTemplateId(templateCategoryId: TemplateCategoryId) {
  const api = useDataApi();
  const [activeTemplateId, setActiveTemplateId] = useState<number | null>(null);
  useEffect(() => {
    api()
      .getActiveTemplateId({ templateCategoryId })
      .then(data => {
        if (data.activeTemplateId) {
          setActiveTemplateId(data.activeTemplateId);
        }
      });
  }, [api, templateCategoryId]);

  return { activeTemplateId, setActiveTemplateId };
}
