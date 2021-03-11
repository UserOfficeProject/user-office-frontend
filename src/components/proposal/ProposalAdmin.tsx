import { administrationProposalValidationSchema } from '@esss-swap/duo-validation/lib/Proposal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { Fragment } from 'react';
import { Prompt } from 'react-router';

import { useCheckAccess } from 'components/common/Can';
import FormikDropdown from 'components/common/FormikDropdown';
import { Proposal, UserRole } from 'generated/sdk';
import { ProposalEndStatus } from 'generated/sdk';
import { useProposalStatusesData } from 'hooks/settings/useProposalStatusesData';
import { ButtonContainer } from 'styles/StyledComponents';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

export type AdministrationFormData = {
  id: number;
  commentForUser: string;
  commentForManagement: string;
  finalStatus: ProposalEndStatus;
  rankOrder?: number;
};

type ProposalAdminProps = {
  data: Proposal;
  setAdministration: (data: AdministrationFormData) => void;
  confirm: WithConfirmType;
};

const ProposalAdmin: React.FC<ProposalAdminProps> = ({
  data,
  setAdministration,
  confirm,
}) => {
  const { api } = useDataApiWithFeedback();
  const isUserOfficer = useCheckAccess([UserRole.USER_OFFICER]);
  const {
    proposalStatuses,
    loadingProposalStatuses,
  } = useProposalStatusesData();

  const initialValues = {
    id: data.id,
    finalStatus: data.finalStatus || ProposalEndStatus.UNSET,
    proposalStatus: data.statusId,
    commentForUser: data.commentForUser || '',
    commentForManagement: data.commentForManagement || '',
  };

  const PromptIfDirty = () => {
    const formik = useFormikContext();

    return (
      <Prompt
        when={formik.dirty && formik.submitCount === 0}
        message="Changes you recently made in this tab will be lost! Are you sure?"
      />
    );
  };

  const handleProposalAdministration = async (
    administrationValues: AdministrationFormData
  ) => {
    const result = await api('Updated!').administrationProposal(
      administrationValues
    );

    if (!result.administrationProposal.error) {
      setAdministration(administrationValues);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Administration
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={administrationProposalValidationSchema}
        onSubmit={async (values): Promise<void> => {
          const administrationValues = {
            id: data.id,
            finalStatus:
              ProposalEndStatus[values.finalStatus as ProposalEndStatus],
            statusId: values.proposalStatus,
            commentForUser: values.commentForUser,
            commentForManagement: values.commentForManagement,
          };

          const isDraftStatus =
            proposalStatuses.find((status) => status.shortCode === 'DRAFT')
              ?.id === values.proposalStatus;

          if (isDraftStatus) {
            confirm(
              async () => {
                await handleProposalAdministration(administrationValues);
              },
              {
                title: 'Are you sure?',
                description:
                  'This will re-open proposal for changes and submission. Are you sure you want to change status to DRAFT?',
              }
            )();
          } else {
            await handleProposalAdministration(administrationValues);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <PromptIfDirty />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormikDropdown
                  name="finalStatus"
                  label="Final status"
                  data-cy="proposalFinalStatus"
                  items={[
                    { text: 'Unset', value: ProposalEndStatus.UNSET },
                    { text: 'Accepted', value: ProposalEndStatus.ACCEPTED },
                    { text: 'Reserved', value: ProposalEndStatus.RESERVED },
                    { text: 'Rejected', value: ProposalEndStatus.REJECTED },
                  ]}
                  required
                  disabled={!isUserOfficer}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikDropdown
                  name="proposalStatus"
                  label="Proposal status"
                  data-cy="proposalStatus"
                  loading={loadingProposalStatuses}
                  items={proposalStatuses.map((proposalStatus) => ({
                    text: proposalStatus.name,
                    value: proposalStatus.id,
                  }))}
                  required
                  disabled={!isUserOfficer}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="commentForUser"
                  label="Comment for user"
                  type="text"
                  component={TextField}
                  margin="normal"
                  fullWidth
                  autoComplete="off"
                  data-cy="commentForUser"
                  multiline
                  rowsMax="16"
                  rows="4"
                  disabled={!isUserOfficer}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="commentForManagement"
                  label="Comment for management"
                  type="text"
                  component={TextField}
                  margin="normal"
                  fullWidth
                  autoComplete="off"
                  data-cy="commentForManagement"
                  multiline
                  rowsMax="16"
                  rows="4"
                  disabled={!isUserOfficer}
                />
              </Grid>
            </Grid>
            {isUserOfficer && (
              <ButtonContainer>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </ButtonContainer>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withConfirm(ProposalAdmin);
