// import {
//   createProposalWorkflowValidationSchema,
//   updateProposalWorkflowValidationSchema,
// } from '@esss-swap/duo-validation/lib/ProposalWorkflows';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import UOLoader from 'components/common/UOLoader';
import { ProposalWorkflow } from 'generated/sdk';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type CreateProposalWorkflowProps = {
  close: (proposalWorkflowAdded: ProposalWorkflow | null) => void;
};

const CreateProposalWorkflow: React.FC<CreateProposalWorkflowProps> = ({
  close,
}) => {
  const classes = useStyles();
  const { api } = useDataApiWithFeedback();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const initialValues = {
    name: '',
    description: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions): Promise<void> => {
        setSubmitting(true);

        const data = await api(
          'Proposal workflow created successfully'
        ).createProposalWorkflow(values);
        if (data.createProposalWorkflow.error) {
          close(null);
        } else if (data.createProposalWorkflow.proposalWorkflow) {
          close(data.createProposalWorkflow.proposalWorkflow);
        }

        setSubmitting(false);
        actions.setSubmitting(false);
      }}
      // validationSchema={
      //   proposalWorkflow
      //     ? updateProposalWorkflowValidationSchema
      //     : createProposalWorkflowValidationSchema
      // }
    >
      {() => (
        <Form>
          <Typography variant="h6">Create new proposal workflow</Typography>
          <Field
            name="name"
            id="name"
            label="Name"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            data-cy="name"
            disabled={submitting}
          />
          <Field
            id="description"
            name="description"
            label="Description"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            multiline
            rowsMax="16"
            rows="3"
            data-cy="description"
            disabled={submitting}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-cy="submit"
            disabled={submitting}
          >
            {submitting && <UOLoader size={14} />}
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

CreateProposalWorkflow.propTypes = {
  close: PropTypes.func.isRequired,
};

export default CreateProposalWorkflow;
