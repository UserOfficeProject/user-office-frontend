// import {
//   createApiAccessTokenValidationSchema,
//   updateApiAccessTokenValidationSchema,
// } from '@esss-swap/duo-validation/lib/Instrument';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import React from 'react';

import TitledContainer from 'components/common/TitledContainer';
import UOLoader from 'components/common/UOLoader';
import { PermissionsWithAccessToken } from 'generated/sdk';
import { useQueriesAndMutationsData } from 'hooks/admin/useQueriesAndMutationsData';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '350px',
    marginTop: '10px',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: theme.palette.error.main,
    marginRight: '10px',
  },
  submitContainer: {
    margin: theme.spacing(2, 0, 2),
  },
  darkerDisabledTextField: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.7) !important',
    },
  },
}));

type CreateUpdateApiAccessTokenProps = {
  close: (apiAccessTokenAdded: PermissionsWithAccessToken | null) => void;
  apiAccessToken: PermissionsWithAccessToken | null;
};

const CreateUpdateApiAccessToken: React.FC<CreateUpdateApiAccessTokenProps> = ({
  close,
  apiAccessToken,
}) => {
  const classes = useStyles();
  const { api, isExecutingCall } = useDataApiWithFeedback();
  const {
    queriesAndMutations,
    loadingQueriesAndMutations,
  } = useQueriesAndMutationsData();

  const normalizeAccessPermissions = (data: string | undefined) => {
    const parsedPermissions = JSON.parse(data || '');
    const permissionsArray = [];

    for (const key in parsedPermissions) {
      if (Object.prototype.hasOwnProperty.call(parsedPermissions, key)) {
        const element = parsedPermissions[key];

        for (const itemKey in element) {
          if (Object.prototype.hasOwnProperty.call(element, itemKey)) {
            permissionsArray.push(`${key}.${itemKey}`);
          }
        }
      }
    }

    return permissionsArray;
  };

  const initialValues = apiAccessToken
    ? {
        ...apiAccessToken,
        accessPermissions: normalizeAccessPermissions(
          apiAccessToken?.accessPermissions
        ),
      }
    : {
        name: '',
        accessPermissions: [''],
        accessToken: '',
      };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values): Promise<void> => {
        const accessPermissions = {};
        values.accessPermissions.forEach(element => {
          //@ts-expect-error
          accessPermissions[element] = true;
        });

        if (apiAccessToken) {
          // const data = await api(
          //   'Api access token updated successfully!'
          // ).updateApiAccessToken({
          //   id: apiAccessToken.id,
          //   ...values,
          // });
          // if (data.updateApiAccessToken.error) {
          //   close(null);
          // } else if (data.updateApiAccessToken.apiAccessToken) {
          //   close(data.updateApiAccessToken.apiAccessToken);
          // }
        } else {
          const data = await api(
            'Api access token created successfully!'
          ).createApiAccessToken({
            ...values,
            accessPermissions: JSON.stringify(values.accessPermissions),
          });
          if (data.createApiAccessToken.error) {
            close(null);
          } else if (data.createApiAccessToken.apiAccessToken) {
            close(data.createApiAccessToken.apiAccessToken);
          }
        }
      }}
      // validationSchema={
      //   apiAccessToken
      //     ? updateApiAccessTokenValidationSchema
      //     : createApiAccessTokenValidationSchema
      // }
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Typography variant="h6">
            {apiAccessToken ? 'Update' : 'Create new'} api access token
          </Typography>
          <Field
            name="name"
            id="name"
            label="Name"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            data-cy="name"
            disabled={isExecutingCall}
            required
          />

          <Grid container spacing={1} className={classes.container}>
            {loadingQueriesAndMutations ? (
              <UOLoader style={{ marginLeft: '50%', marginTop: '100px' }} />
            ) : (
              <FieldArray
                name="accessPermissions"
                render={arrayHelpers => (
                  <>
                    <Grid item sm={5}>
                      <TitledContainer label="Queries">
                        {queriesAndMutations.queries.map((query, index) => (
                          <Grid item sm={12} key={index}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  id={query}
                                  name="accessPermissions"
                                  value={query}
                                  checked={values.accessPermissions.includes(
                                    query
                                  )}
                                  color="primary"
                                  data-cy="permission-queries"
                                  onChange={e => {
                                    if (e.target.checked)
                                      arrayHelpers.push(query);
                                    else {
                                      const idx = values.accessPermissions.indexOf(
                                        query
                                      );
                                      arrayHelpers.remove(idx);
                                    }
                                  }}
                                  inputProps={{
                                    'aria-label': 'primary checkbox',
                                  }}
                                />
                              }
                              label={query}
                            />
                          </Grid>
                        ))}
                      </TitledContainer>
                    </Grid>
                    <Grid item sm={7}>
                      <TitledContainer label="Mutations">
                        {queriesAndMutations.mutations.map(
                          (mutation, index) => (
                            <Grid item sm={12} key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id={mutation}
                                    name="accessPermissions"
                                    value={mutation}
                                    checked={values.accessPermissions.includes(
                                      mutation
                                    )}
                                    color="primary"
                                    data-cy="permission-queries"
                                    onChange={e => {
                                      if (e.target.checked)
                                        arrayHelpers.push(mutation);
                                      else {
                                        const idx = values.accessPermissions.indexOf(
                                          mutation
                                        );
                                        arrayHelpers.remove(idx);
                                      }
                                    }}
                                    inputProps={{
                                      'aria-label': 'primary checkbox',
                                    }}
                                  />
                                }
                                label={mutation}
                              />
                            </Grid>
                          )
                        )}
                      </TitledContainer>
                    </Grid>
                  </>
                )}
              />
            )}
          </Grid>
          <Field
            name="accessToken"
            id="accessToken"
            label="Access token"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            className={
              !!initialValues.accessToken ? classes.darkerDisabledTextField : ''
            }
            InputProps={{
              endAdornment: (
                <>
                  <Tooltip title="Copy">
                    <IconButton
                      edge="start"
                      onClick={() =>
                        navigator.clipboard.writeText(values.accessToken)
                      }
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ),
            }}
            data-cy="accessToken"
            disabled={!!initialValues.accessToken || isExecutingCall}
          />
          <Grid
            container
            justify="flex-end"
            className={classes.submitContainer}
          >
            <Grid item>
              <ErrorMessage
                className={classes.error}
                component="span"
                name="selectedNextStatusEvents"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  isSubmitting || loadingQueriesAndMutations || isExecutingCall
                }
                data-cy="submit"
              >
                {isExecutingCall && <UOLoader size={14} />}
                {apiAccessToken ? 'Update' : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

CreateUpdateApiAccessToken.propTypes = {
  apiAccessToken: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    accessPermissions: PropTypes.string.isRequired,
  }),
  close: PropTypes.func.isRequired,
};

export default CreateUpdateApiAccessToken;
