import { proposalTechnicalReviewValidationSchema } from '@esss-swap/duo-validation/lib/Review';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { Fragment, useEffect } from 'react';
import { Prompt } from 'react-router';

import FormikDropdown from 'components/common/FormikDropdown';
import {
  TechnicalReviewStatus,
  CoreTechnicalReviewFragment,
} from 'generated/sdk';
import { ButtonContainer } from 'styles/StyledComponents';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

export default function ProposalTechnicalReview(props: {
  data: CoreTechnicalReviewFragment | null | undefined;
  setReview: (data: CoreTechnicalReviewFragment) => void;
  id: number;
  setFormDirty: (dirty: boolean) => void;
}) {
  const { api } = useDataApiWithFeedback();

  const initialValues = {
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
        message="Changes you recently made in this step will not be saved! Are you sure?"
      />
    );
  };

  const PreventTabChangeIfFormDirty = ({
    setFormDirty,
  }: {
    setFormDirty: Function;
  }) => {
    const formik = useFormikContext();

    useEffect(() => {
      const isFormDirty =
        formik.dirty &&
        JSON.stringify(formik.values) !== JSON.stringify(initialValues);

      if (isFormDirty) {
        setFormDirty(true);
      } else {
        setFormDirty(false);
      }
    }, [formik.dirty, formik.values, setFormDirty]);

    return null;
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Technical Review
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={proposalTechnicalReviewValidationSchema}
        onSubmit={async (values): Promise<void> => {
          await api(
            'Technical review updated successfully!'
          ).addTechnicalReview({
            proposalID: props.id,
            timeAllocation: +values.timeAllocation,
            comment: values.comment,
            publicComment: values.publicComment,
            status:
              TechnicalReviewStatus[values.status as TechnicalReviewStatus],
          });
          props.setReview({
            proposalID: props?.data?.proposalID,
            timeAllocation: +values.timeAllocation,
            comment: values.comment,
            publicComment: values.publicComment,
            status:
              TechnicalReviewStatus[values.status as TechnicalReviewStatus],
          } as CoreTechnicalReviewFragment);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <PromptIfDirty />
            <PreventTabChangeIfFormDirty setFormDirty={props.setFormDirty} />
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
                />
              </Grid>
            </Grid>
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
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}
