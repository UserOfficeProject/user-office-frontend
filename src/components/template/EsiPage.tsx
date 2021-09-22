import Container from '@material-ui/core/Container';
import React from 'react';

import SimpleTabs from 'components/common/TabPanel';
import { TemplateCategoryId } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

import EsiTemplatesTable from './EsiTemplatesTable';

export default function EsiPage() {
  const api = useDataApi();

  return (
    <Container>
      <SimpleTabs tabNames={['Current', 'Archived']}>
        <EsiTemplatesTable
          dataProvider={() =>
            api()
              .getTemplates({
                filter: {
                  isArchived: false,
                  category: TemplateCategoryId.PROPOSAL_ESI,
                },
              })
              .then((data) => data.templates || [])
          }
        />
        <EsiTemplatesTable
          dataProvider={() =>
            api()
              .getTemplates({
                filter: {
                  isArchived: true,
                  category: TemplateCategoryId.PROPOSAL_ESI,
                },
              })
              .then((data) => data.templates || [])
          }
        />
      </SimpleTabs>
    </Container>
  );
}
