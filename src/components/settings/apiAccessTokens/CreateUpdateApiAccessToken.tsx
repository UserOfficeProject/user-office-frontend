import {
  createApiAccessTokenValidationSchema,
  updateApiAccessTokenValidationSchema,
} from '@esss-swap/duo-validation/lib/Admin';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
} from 'formik';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import React from 'react';

import SimpleTabs from 'components/common/TabPanel';
import UOLoader from 'components/common/UOLoader';
import { PermissionsWithAccessToken } from 'generated/sdk';
import { useQueriesAndMutationsData } from 'hooks/admin/useQueriesAndMutationsData';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '350px',
    marginTop: '10px',
    maxHeight: '550px',
    overflowY: 'auto',
    overflowX: 'hidden',
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
    '& input': {
      paddingRight: '2px',
      color: 'rgba(0, 0, 0, 0.7)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  tabsContainer: {
    '& > div': {
      margin: 0,
      padding: '10px 0',
      boxShadow: 'none',

      '& [role="tabpanel"] > div': {
        padding: '0 5px',
      },
    },
  },
  checkBoxLabelText: {
    '& label': {
      width: '100%',

      '& .MuiFormControlLabel-label': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
}));

type FormPermissionsWithAccessToken = {
  name: string;
  accessPermissions: string[];
  accessToken: string;
};

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
    const permissionsArray: string[] = [];

    if (data) {
      const parsedPermissions = JSON.parse(data);

      for (const key in parsedPermissions) {
        if (Object.prototype.hasOwnProperty.call(parsedPermissions, key)) {
          permissionsArray.push(key);
        }
      }
    }

    return permissionsArray;
  };

  const initialValues: FormPermissionsWithAccessToken = apiAccessToken
    ? {
        ...apiAccessToken,
        accessPermissions: normalizeAccessPermissions(
          apiAccessToken?.accessPermissions
        ),
      }
    : {
        name: '',
        accessPermissions: normalizeAccessPermissions(''),
        accessToken: '',
      };

  const allAccessPermissions = (
    items: string[],
    title: string,
    formValues: FormPermissionsWithAccessToken,
    fieldArrayHelpers: FieldArrayRenderProps
  ) => {
    return (
      <Grid className={classes.container} container spacing={1}>
        {items.map((item, index) => (
          <Grid
            item
            md={6}
            xs={12}
            key={index}
            className={classes.checkBoxLabelText}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id={item}
                  name="accessPermissions"
                  value={item}
                  checked={formValues.accessPermissions.includes(item)}
                  color="primary"
                  data-cy={`permission-${title.toLowerCase()}`}
                  onChange={e => {
                    if (e.target.checked) fieldArrayHelpers.push(item);
                    else {
                      const idx = formValues.accessPermissions.indexOf(item);
                      fieldArrayHelpers.remove(idx);
                    }
                  }}
                  inputProps={{
                    'aria-label': 'primary checkbox',
                  }}
                />
              }
              label={item}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, formikHelpers): Promise<void> => {
        const accessPermissions = {};
        values.accessPermissions.forEach(element => {
          if (element) {
            //@ts-expect-error
            accessPermissions[element] = true;
          }
        });

        if (apiAccessToken) {
          const data = await api(
            'Api access token updated successfully!'
          ).updateApiAccessToken({
            accessTokenId: apiAccessToken.id,
            name: values.name,
            accessPermissions: JSON.stringify(accessPermissions),
          });
          if (data.updateApiAccessToken.error) {
            close(null);
          } else if (data.updateApiAccessToken.apiAccessToken) {
            close(data.updateApiAccessToken.apiAccessToken);
          }
        } else {
          const data = await api(
            'Api access token created successfully!'
          ).createApiAccessToken({
            ...values,
            accessPermissions: JSON.stringify(accessPermissions),
          });

          if (
            !data.createApiAccessToken.error &&
            data.createApiAccessToken.apiAccessToken
          ) {
            formikHelpers.setFieldValue(
              'accessToken',
              data.createApiAccessToken.apiAccessToken.accessToken
            );
          }
        }
      }}
      validationSchema={
        apiAccessToken
          ? updateApiAccessTokenValidationSchema
          : createApiAccessTokenValidationSchema
      }
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

          {loadingQueriesAndMutations ? (
            <UOLoader style={{ marginLeft: '50%', marginTop: '100px' }} />
          ) : (
            <FieldArray
              name="accessPermissions"
              render={arrayHelpers => (
                <div className={classes.tabsContainer}>
                  <SimpleTabs tabNames={['Queries', 'Mutations']}>
                    {allAccessPermissions(
                      queriesAndMutations.queries,
                      'Queries',
                      values,
                      arrayHelpers
                    )}
                    {allAccessPermissions(
                      queriesAndMutations.mutations,
                      'Mutations',
                      values,
                      arrayHelpers
                    )}
                  </SimpleTabs>
                </div>
              )}
            />
          )}
          <Field
            name="accessToken"
            id="accessToken"
            label="Access token"
            type="text"
            component={TextField}
            margin="normal"
            fullWidth
            className={classes.darkerDisabledTextField}
            InputProps={{
              endAdornment: values.accessToken && (
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
            disabled
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
                name="accessPermissions"
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
