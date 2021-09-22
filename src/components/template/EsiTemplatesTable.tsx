import { Column } from 'material-table';
import React from 'react';

import { Template, TemplateCategoryId } from 'generated/sdk';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

import { TemplateRowDataType, TemplatesTable } from './TemplatesTable';
import withMarkTemplateAsActiveAction from './withMarkTemplateAsActiveAction';

type EsiTemplateRowDataType = TemplateRowDataType & Record<string, unknown>;

type EsiTemplatesTableProps = {
  dataProvider: () => Promise<
    Pick<
      Template,
      'templateId' | 'name' | 'description' | 'isArchived' | 'questionaryCount'
    >[]
  >;
  confirm: WithConfirmType;
};

function EsiTemplatesTable(props: EsiTemplatesTableProps) {
  const columns: Column<EsiTemplateRowDataType>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: '# Proposal ESIs', field: 'questionaryCount' },
  ];

  const Table = withMarkTemplateAsActiveAction(TemplatesTable);

  return (
    <Table
      columns={columns}
      templateCategory={TemplateCategoryId.PROPOSAL_ESI}
      isRowRemovable={() => {
        return true;
      }}
      dataProvider={props.dataProvider}
      confirm={props.confirm}
    />
  );
}

export default withConfirm(EsiTemplatesTable);
