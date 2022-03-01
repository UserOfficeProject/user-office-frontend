import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { Check, MergeType } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import { Checkbox, TextField } from 'formik-mui';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import UOLoader from 'components/common/UOLoader';
import { Institution } from 'generated/sdk';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

type CreateUpdateInstitutionProps = {
  close: (institution: Institution | null) => void;
  institution: Institution | null;
};

const CreateUpdateInstitution: React.FC<CreateUpdateInstitutionProps> = ({
  close,
  institution,
}) => {
  const { api, isExecutingCall } = useDataApiWithFeedback();
  const history = useHistory();

  const initialValues = institution
    ? {
        name: institution.name,
        verified: institution.verified,
      }
    : {
        name: '',
        verified: false,
      };

  const createInstitution = async (verified: boolean, name: string) => {
    const response = await api(
      'Institution created successfully!'
    ).createInstitution({
      name,
      verified,
    });

    const { rejection, institution } = response.createInstitution;
    if (rejection) {
      close(null);
    } else if (institution) {
      close(institution);
    }
  };

  const updateInstitution = async (
    id: number,
    verified: boolean,
    name: string
  ) => {
    const response = await api(
      'Institution updated successfully!'
    ).updateInstitution({
      id,
      name,
      verified,
    });
    const { rejection: error, institution } = response.updateInstitution;
    if (error) {
      close(null);
    } else if (institution) {
      close(institution);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values): Promise<void> => {
        institution
          ? await updateInstitution(
              institution.id,
              values.verified,
              values.name
            )
          : await createInstitution(values.verified, values.name);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        verified: Yup.boolean().required(),
      })}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Typography variant="h6" component="h1">
            {institution ? 'Update' : 'Create new'} institution
          </Typography>
          <Field
            name="name"
            id="name"
            label="Name"
            type="text"
            component={TextField}
            data-cy="name"
            fullWidth
            disabled={isExecutingCall}
          />
          <FormControlLabel
            style={{ marginTop: '10px' }}
            control={
              <Field
                id="verified"
                name="verified"
                type="checkbox"
                component={Checkbox}
                checked={values.verified}
                color="primary"
                onChange={(): void =>
                  setFieldValue('verified', !values.verified)
                }
                inputProps={{
                  'aria-label': 'primary checkbox',
                  'data-cy': 'institution-verified',
                }}
                disabled={isExecutingCall}
              />
            }
            label="Verified"
          />
          <ActionButtonContainer>
            {institution && (
              <Tooltip title="Merge with existing institution">
                <Button
                  startIcon={
                    <MergeType style={{ transform: 'rotate(90deg)' }} />
                  }
                  type="button"
                  variant="outlined"
                  color="primary"
                  data-cy="merge"
                  disabled={isExecutingCall}
                  onClick={() =>
                    history.push(`/MergeInstitutionsPage/${institution.id}`)
                  }
                >
                  {isExecutingCall && <UOLoader size={14} />}
                  Merge
                </Button>
              </Tooltip>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-cy="submit"
              disabled={isExecutingCall}
              startIcon={<Check />}
            >
              {isExecutingCall && <UOLoader size={14} />}
              {institution ? 'Update' : 'Create'}
            </Button>
          </ActionButtonContainer>
        </Form>
      )}
    </Formik>
  );
};

CreateUpdateInstitution.propTypes = {
  institution: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    verified: PropTypes.bool.isRequired,
  }),
  close: PropTypes.func.isRequired,
};

export default CreateUpdateInstitution;
