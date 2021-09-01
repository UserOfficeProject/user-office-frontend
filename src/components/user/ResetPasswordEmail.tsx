import { resetPasswordByEmailValidationSchema } from '@esss-swap/duo-validation/lib/User';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUnauthorizedApi } from 'hooks/common/useDataApi';
import { FormWrapper } from 'styles/StyledComponents';

import PhotoInSide from './PhotoInSide';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sentMessageSuccess: {
    color: theme.palette.secondary.main,
  },
  sentMessageError: {
    color: theme.palette.error.main,
  },
}));

export default function ResetPasswordEmail() {
  const classes = useStyles();
  const [emailSuccess, setEmailSuccess] = useState<null | boolean>(null);
  const unauthorizedApi = useUnauthorizedApi();
  const requestResetEmail = async (values: { email: string }) => {
    await unauthorizedApi()
      .resetPasswordEmail({ email: values.email })
      .then((data) => setEmailSuccess(!!data.resetPasswordEmail.isSuccess));
  };

  return (
    <PhotoInSide>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values): Promise<void> => {
          await requestResetEmail(values);
        }}
        validationSchema={resetPasswordByEmailValidationSchema}
      >
        <Form className={classes.form}>
          <CssBaseline />
          <FormWrapper margin={[8, 4]}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Field
              name="email"
              label="Email"
              id="email-id"
              type="email"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="reset-password-email"
            />
            {emailSuccess !== null &&
              (emailSuccess ? (
                <p className={classes.sentMessageSuccess}>
                  A mail has been sent to the provided email.
                </p>
              ) : (
                <p className={classes.sentMessageError}>
                  No account found for this email address.
                </p>
              ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Email
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/SignIn/">Have an account? Sign In</Link>
              </Grid>
            </Grid>
          </FormWrapper>
        </Form>
      </Formik>
    </PhotoInSide>
  );
}
