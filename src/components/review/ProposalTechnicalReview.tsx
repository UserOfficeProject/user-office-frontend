import { proposalTechnicalReviewValidationSchema } from '@esss-swap/duo-validation/lib/Review';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { Prompt } from 'react-router';

import FormikDropdown from 'components/common/FormikDropdown';
import PreventTabChangeIfFormDirty from 'components/common/PreventTabChangeIfFormDirty';
import {
  TechnicalReviewStatus,
  CoreTechnicalReviewFragment,
} from 'generated/sdk';
import { ButtonContainer } from 'styles/StyledComponents';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

const useStyles = makeStyles(theme => ({
  submitButton: {
    marginLeft: theme.spacing(1),
  },
}));

type TechnicalReviewFormType = {
  status: string;
  timeAllocation: string | number;
  comment: string;
  publicComment: string;
};

export default function ProposalTechnicalReview(props: {
  data: CoreTechnicalReviewFragment | null | undefined;
  setReview: (data: CoreTechnicalReviewFragment) => void;
  id: number;
  setFormDirty: (dirty: boolean) => void;
}) {
  const { api } = useDataApiWithFeedback();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const classes = useStyles();

  const initialValues: TechnicalReviewFormType = {
    status: props?.data?.status || '',
    timeAllocation: props?.data?.timeAllocation || '',
    comment: props?.data?.comment || '',
    publicComment: props?.data?.publicComment || '',
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

  const handleUpdateOrSubmit = async (
    values: TechnicalReviewFormType,
    method: 'submitTechnicalReview' | 'addTechnicalReview'
  ) => {
    const shouldSubmit = method === 'submitTechnicalReview';
    const successMessage = `Technical review ${
      shouldSubmit ? 'submitted' : 'updated'
    } successfully!`;

    const result = await api(successMessage)[method]({
      proposalID: props.id,
      timeAllocation: +values.timeAllocation,
      comment: values.comment,
      publicComment: values.publicComment,
      status: TechnicalReviewStatus[values.status as TechnicalReviewStatus],
      submitted: shouldSubmit,
    });

    if (!(result as any)[method].error) {
      props.setReview({
        proposalID: props?.data?.proposalID,
        timeAllocation: +values.timeAllocation,
        comment: values.comment,
        publicComment: values.publicComment,
        status: TechnicalReviewStatus[values.status as TechnicalReviewStatus],
        submitted: shouldSubmit,
      } as CoreTechnicalReviewFragment);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Technical Review
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={proposalTechnicalReviewValidationSchema}
        onSubmit={async (values): Promise<void> => {
          if (shouldSubmit) {
            const confirmed = window.confirm(
              'I am aware that no future changes to the technical review is possible after submission.'
            );
            if (confirmed) {
              await handleUpdateOrSubmit(values, 'submitTechnicalReview');
            }
          } else {
            await handleUpdateOrSubmit(values, 'addTechnicalReview');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <PromptIfDirty />
            <PreventTabChangeIfFormDirty
              setFormDirty={props.setFormDirty}
              initialValues={initialValues}
            />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormikDropdown
                  name="status"
                  label="Status"
                  items={[
                    { text: 'Feasible', value: TechnicalReviewStatus.FEASIBLE },
                    {
                      text: 'Partially feasible',
                      value: TechnicalReviewStatus.PARTIALLY_FEASIBLE,
                    },
                    {
                      text: 'Unfeasible',
                      value: TechnicalReviewStatus.UNFEASIBLE,
                    },
                  ]}
                  disabled={isSubmitting || props.data?.submitted}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="timeAllocation"
                  label="Time Allocation(Days)"
                  type="number"
                  component={TextField}
                  margin="normal"
                  fullWidth
                  autoComplete="off"
                  data-cy="timeAllocation"
                  disabled={isSubmitting || props.data?.submitted}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="comment"
                  label="Internal comment"
                  type="text"
                  component={TextField}
                  margin="normal"
                  fullWidth
                  autoComplete="off"
                  data-cy="comment"
                  multiline
                  rowsMax="16"
                  rows="4"
                  disabled={isSubmitting || props.data?.submitted}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="publicComment"
                  label="Public comment"
                  type="text"
                  component={TextField}
                  margin="normal"
                  fullWidth
                  autoComplete="off"
                  data-cy="publicComment"
                  multiline
                  rowsMax="16"
                  rows="4"
                  disabled={isSubmitting || props.data?.submitted}
                />
              </Grid>
            </Grid>
            <ButtonContainer>
              <Button
                disabled={isSubmitting || props.data?.submitted}
                type="submit"
                onClick={() => setShouldSubmit(false)}
                variant="contained"
                color="secondary"
              >
                Update
              </Button>
              <Button
                disabled={isSubmitting || props.data?.submitted}
                type="submit"
                className={classes.submitButton}
                onClick={() => setShouldSubmit(true)}
                variant="contained"
                color="primary"
              >
                {props.data?.submitted ? 'Submitted' : 'Submit'}
              </Button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}
