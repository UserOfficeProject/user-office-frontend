import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import FormikDropdown from 'components/common/FormikDropdown';
import { ProposalStatus } from 'generated/sdk';
import { useProposalStatusesData } from 'hooks/settings/useProposalStatusesData';

const changeProposalStatusValidationSchema = yup.object().shape({
  selectedStatusId: yup.string().required('You must select proposal status'),
});

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    fontSize: '18px',
    padding: '22px 0 0',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type ChangeProposalStatusProps = {
  close: () => void;
  changeStatusOnProposals: (status: ProposalStatus) => Promise<void>;
};

const ChangeProposalStatus: React.FC<ChangeProposalStatusProps> = ({
  close,
  changeStatusOnProposals,
}) => {
  const classes = useStyles();
  const {
    proposalStatuses,
    loadingProposalStatuses,
  } = useProposalStatusesData();

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{
          selectedStatusId: '',
        }}
        onSubmit={async (values, actions): Promise<void> => {
          const selectedStatus = proposalStatuses.find(
            (call) => call.id === +values.selectedStatusId
          );

          if (!selectedStatus) {
            actions.setFieldError('selectedStatusId', 'Required');

            return;
          }

          await changeStatusOnProposals(selectedStatus);
          close();
        }}
        validationSchema={changeProposalStatusValidationSchema}
      >
        {({ isSubmitting }): JSX.Element => (
          <Form>
            <Typography className={classes.cardHeader}>
              Change proposal/s status
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormikDropdown
                  name="selectedStatusId"
                  label="Select proposal status"
                  items={proposalStatuses.map((status) => ({
                    value: status.id.toString(),
                    text: status.name,
                  }))}
                  required
                  disabled={loadingProposalStatuses || isSubmitting}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loadingProposalStatuses || isSubmitting}
              data-cy="submit=proposal-status-change"
            >
              Change status
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ChangeProposalStatus;
