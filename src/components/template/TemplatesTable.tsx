import MaterialTable, {
  Column,
  MaterialTableProps,
} from '@material-table/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Archive from '@material-ui/icons/Archive';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FileCopy from '@material-ui/icons/FileCopy';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import InputDialog from 'components/common/InputDialog';
import { GetTemplatesQuery, Template, TemplateGroupId } from 'generated/sdk';
import { tableIcons } from 'utils/materialIcons';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import { WithConfirmType } from 'utils/withConfirm';

import CreateTemplate from './CreateTemplate';

export type TemplateRowDataType = Pick<
  Template,
  'templateId' | 'name' | 'description' | 'isArchived'
>;

export interface TemplatesTableProps {
  columns: Column<TemplateRowDataType>[];
  templateGroup: TemplateGroupId;
  dataProvider: () => Promise<Exclude<GetTemplatesQuery['templates'], null>>;
  isRowRemovable: (row: TemplateRowDataType) => boolean;
  confirm: WithConfirmType;
  actions?: MaterialTableProps<TemplateRowDataType>['actions'];
}
export function TemplatesTable({
  dataProvider,
  columns,
  templateGroup,
  isRowRemovable,
  confirm,
  actions,
}: TemplatesTableProps) {
  const [templates, setTemplates] = useState<TemplateRowDataType[]>([]);
  const { api } = useDataApiWithFeedback();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    dataProvider().then((data) => {
      data && setTemplates(data);
      setLoadingTemplates(false);
    });
  }, [dataProvider]);

  const UnarchiveIconComponent = () => <UnarchiveIcon />;
  const getUnarchiveButton = () => {
    return {
      icon: UnarchiveIconComponent,
      tooltip: 'Unarchive',
      onClick: (
        event: React.MouseEvent<HTMLButtonElement>,
        data: TemplateRowDataType | TemplateRowDataType[]
      ) => {
        confirm(
          () => {
            api()
              .updateTemplate({
                templateId: (data as TemplateRowDataType).templateId,
                isArchived: false,
              })
              .then((response) => {
                const data = [...templates];
                data.splice(
                  templates.findIndex(
                    (elem) =>
                      elem.templateId ===
                      response.updateTemplate.template?.templateId
                  ),
                  1
                );
                setTemplates(data);
              });
          },
          {
            title: 'Are you sure?',
            description: `Are you sure you want to unarchive ${
              (data as TemplateRowDataType).name
            }`,
            confirmationText: 'Yes',
            cancellationText: 'Cancel',
          }
        )();
      },
    };
  };

  const ArchiveIconComponent = () => <Archive />;
  const getArchiveButton = () => {
    return {
      icon: ArchiveIconComponent,
      tooltip: 'Archive',
      onClick: (
        event: React.MouseEvent<HTMLButtonElement>,
        data: TemplateRowDataType | TemplateRowDataType[]
      ) => {
        confirm(
          () => {
            api('Template archived successfully')
              .updateTemplate({
                templateId: (data as TemplateRowDataType).templateId,
                isArchived: true,
              })
              .then((response) => {
                const data = [...templates];
                data.splice(
                  templates.findIndex(
                    (elem) =>
                      elem.templateId ===
                      response.updateTemplate.template?.templateId
                  ),
                  1
                );
                setTemplates(data);
              });
          },
          {
            title: 'Are you sure?',
            description: `Are you sure you want to archive ${
              (data as TemplateRowDataType).name
            }`,
            confirmationText: 'Yes',
            cancellationText: 'Cancel',
          }
        )();
      },
    };
  };

  const DeleteIconComponent = () => <Delete />;
  const getDeleteButton = () => {
    return {
      icon: DeleteIconComponent,
      tooltip: 'Delete',
      onClick: (
        event: React.MouseEvent<HTMLButtonElement>,
        data: TemplateRowDataType | TemplateRowDataType[]
      ) => {
        confirm(
          () => {
            api()
              .deleteTemplate({
                id: (data as TemplateRowDataType).templateId,
              })
              .then((response) => {
                const data = [...templates];
                data.splice(
                  templates.findIndex(
                    (elem) =>
                      elem.templateId ===
                      response.deleteTemplate.template?.templateId
                  ),
                  1
                );
                setTemplates(data);
              });
          },
          {
            title: 'Are you sure?',
            description: `Are you sure you want to delete ${
              (data as TemplateRowDataType).name
            }`,
            confirmationText: 'Yes',
            cancellationText: 'Cancel',
          }
        )();
      },
    };
  };

  const getMaintenanceButton = (rowData: TemplateRowDataType) => {
    if (rowData.isArchived) {
      return getUnarchiveButton();
    } else {
      const isRemovable = isRowRemovable(rowData);
      if (isRemovable) {
        return getDeleteButton();
      } else {
        return getArchiveButton();
      }
    }
  };

  const editTemplate = (templateId: number) => {
    history.push(`/QuestionaryEditor/${templateId}`);
  };

  const customActions = actions || [];
  const EditIconComponent = () => <Edit />;
  const FileCopyIconComponent = () => <FileCopy />;

  return (
    <>
      <InputDialog open={show} onClose={() => setShow(false)}>
        <CreateTemplate
          onComplete={(template) => {
            if (template) {
              setTemplates([...templates, template]);

              setTimeout(() => {
                editTemplate(template.templateId);
              });
            }
            setShow(false);
          }}
          groupId={templateGroup}
        />
      </InputDialog>
      <MaterialTable
        icons={tableIcons}
        title={
          <Typography variant="h6" component="h2">
            Templates
          </Typography>
        }
        columns={columns}
        isLoading={loadingTemplates}
        data={templates.map((template) =>
          Object.assign(template, { id: template.templateId })
        )}
        actions={[
          {
            icon: EditIconComponent,
            tooltip: 'Edit',
            onClick: (event, data) => {
              editTemplate((data as TemplateRowDataType).templateId);
            },
          },
          {
            icon: FileCopyIconComponent,
            hidden: false,
            tooltip: 'Clone',
            onClick: (event, data) => {
              confirm(
                () => {
                  api()
                    .cloneTemplate({
                      templateId: (data as TemplateRowDataType).templateId,
                    })
                    .then((result) => {
                      const clonedTemplate = result.cloneTemplate.template;
                      if (clonedTemplate) {
                        const newTemplates = [...templates];
                        newTemplates.push(clonedTemplate);
                        setTemplates(newTemplates);
                      }
                    });
                },
                {
                  title: 'Are you sure?',
                  description: `Are you sure you want to clone ${
                    (data as TemplateRowDataType).name
                  }`,
                  confirmationText: 'Yes',
                  cancellationText: 'Cancel',
                }
              )();
            },
          },
          (rowData) => getMaintenanceButton(rowData),
          ...customActions,
        ]}
      />
      <ActionButtonContainer>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => setShow(true)}
          data-cy="create-new-button"
        >
          Create
        </Button>
      </ActionButtonContainer>
    </>
  );
}
