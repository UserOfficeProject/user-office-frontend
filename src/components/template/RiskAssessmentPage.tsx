import Container from '@material-ui/core/Container';
import React from 'react';

import SimpleTabs from 'components/common/TabPanel';
import { TemplateCategoryId } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

import RiskAssessmentTemplatesTable from './RiskAssessmentTemplatesTable';

export default function RiskAssessmentPage() {
  const api = useDataApi();

  return (
    <Container>
      <SimpleTabs tabNames={['Current', 'Archived']}>
        <RiskAssessmentTemplatesTable
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
        <RiskAssessmentTemplatesTable
          dataProvider={() =>
            api()
              .getTemplates({
                filter: {
                  isArchived: true,
                  category: TemplateCategoryId.VISIT_REGISTRATION,
                },
              })
              .then((data) => data.templates || [])
          }
        />
      </SimpleTabs>
    </Container>
  );
}
