import { Container } from '@material-ui/core';
import React from 'react';

import SimpleTabs from 'components/common/TabPanel';
import { TemplateGroupId } from 'generated/sdk';

import DefaultTemplatesTable from './DefaultTemplatesTable';
import withMarkTemplateAsActiveAction from './withMarkTemplateAsActiveAction';

export default function SampleEsiPage() {
  const templateGroup = TemplateGroupId.VISIT_REGISTRATION;
  const itemCountLabel = '# visits';

  const TableComponent = withMarkTemplateAsActiveAction(DefaultTemplatesTable);

  return (
    <Container>
      <SimpleTabs tabNames={['Current', 'Archived']}>
        <TableComponent
          templateGroup={templateGroup}
          itemCountLabel={itemCountLabel}
          isArchived={false}
        />
        <TableComponent
          templateGroup={templateGroup}
          itemCountLabel={itemCountLabel}
          isArchived={true}
        />
      </SimpleTabs>
    </Container>
  );
}
