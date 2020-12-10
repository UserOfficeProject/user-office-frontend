import { Column } from 'material-table';
import React from 'react';

import { ProposalTemplate, TemplateCategoryId } from 'generated/sdk';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

import { TemplateRowDataType, TemplatesTable } from './TemplatesTable';

type SampleTemplateRowDataType = TemplateRowDataType & {};

function ShipmentTemplatesTable(props: ShipmentTemplatesTableProps) {
  const columns: Column<SampleTemplateRowDataType>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: '# shipments', field: 'questionaryCount' },
  ];

  return (
    <>
      <TemplatesTable
        columns={columns}
        templateCategory={TemplateCategoryId.SHIPMENT_DECLARATION}
        isRowRemovable={() => {
          return true;
        }}
        dataProvider={props.dataProvider}
        confirm={props.confirm}
      />
    </>
  );
}

interface ShipmentTemplatesTableProps {
  dataProvider: () => Promise<
    Pick<
      ProposalTemplate,
      'templateId' | 'name' | 'description' | 'isArchived' | 'questionaryCount'
    >[]
  >;
  confirm: WithConfirmType;
}

export default withConfirm(ShipmentTemplatesTable);
