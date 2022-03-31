import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import * as Yup from 'yup';

import { UserRole } from 'generated/sdk';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: '10px',
  },
}));

interface FormType {
  firstname: string;
  lastname: string;
  email: string;
  userRole: UserRole;
}

interface InviteUserFormProps {
  title: string;
  initialValues: FormType;
  onSubmit: (values: FormType) => void;
  close: () => void;
}

function InviteUserForm(props: InviteUserFormProps) {
  const { api } = useDataApiWithFeedback();
  const classes = useStyles();
  const { title, initialValues, onSubmit, close } = props;

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string()
      .email()
      .required()
      .test(
        'checkAlreadyExists',
        'Can not invite user with this email, because user is already registered in the UserOffice. Please select the user searching by email.',
        (email) => {
          if (!email) {
            return true;
          }

          return api()
            .getBasicUserDetailsByEmail({ email })
            .then(
              ({ basicUserDetailsByEmail }) => basicUserDetailsByEmail === null
            );
        }
      ),
    userRole: Yup.string().oneOf(Object.keys(UserRole)).required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Field
            id="firstname-input"
            name="firstname"
            label="First name"
            type="text"
            component={TextField}
            fullWidth
            data-cy="firstname"
          />
          <Field
            id="lastname-input"
            name="lastname"
            label="Last name"
            type="text"
            component={TextField}
            fullWidth
            data-cy="lastname"
          />
          <Field
            id="email-input"
            name="email"
            label="E-mail"
            type="email"
            component={TextField}
            fullWidth
            data-cy="email"
          />

          <Box display="flex" justifyContent="flex-end" marginTop="25px">
            <Button
              onClick={() => close()}
              data-cy="invitation-close"
              color="secondary"
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-cy="invitation-submit"
              color="primary"
              className={classes.button}
            >
              {title}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default InviteUserForm;
