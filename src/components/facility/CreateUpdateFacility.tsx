import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
//import {
//  createInstrumentValidationSchema,
//  updateInstrumentValidationSchema,
//} from '@user-office-software/duo-validation/lib/Instrument';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
//import PropTypes from 'prop-types';
import React from 'react';

import UOLoader from 'components/common/UOLoader';
import { Facility, UserRole } from 'generated/sdk';
import { useUsersData } from 'hooks/user/useUsersData';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type CreateUpdateFacilityProps = {
  close: (facilityAdded: Facility | null) => void;
  facility: Facility | null;
};

const CreateUpdateFacility: React.FC<CreateUpdateFacilityProps> = ({
  close,
  facility,
}) => {
  const classes = useStyles();
  const { api, isExecutingCall } = useDataApiWithFeedback();
  const { usersData } = useUsersData({
    userRole: UserRole.INSTRUMENT_SCIENTIST,
  });

  if (!usersData) {
    return <UOLoader />;
  }
  const initialValues = facility
    ? facility
    : {
        name: '',
      };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values): Promise<void> => {
        if (facility) {
          const data = await api(
            'Facility updated successfully!'
          ).updateFacility({
            id: facility.id,
            ...values,
          });
          if (data.updateFacility.rejection) {
            close(null);
          } else if (data.updateFacility.facility) {
            close(data.updateFacility.facility);
          }
        } else {
          const data = await api(
            'Facility created successfully!'
          ).createFacility(values);
          if (data.createFacility.rejection) {
            close(null);
          } else if (data.createFacility.facility) {
            close(data.createFacility.facility);
          }
        }
      }}
      //validationSchema={
      //  facility
      //    ? updateInstrumentValidationSchema
      //    : createInstrumentValidationSchema
      //}
    >
      {() => (
        <Form>
          <Typography variant="h6" component="h1">
            {facility ? 'Update' : 'Create new'} facility
          </Typography>
          <Field
            name="name"
            id="name"
            label="Name"
            type="text"
            component={TextField}
            fullWidth
            data-cy="name"
            disabled={isExecutingCall}
          />
          <Button
            type="submit"
            fullWidth
            className={classes.submit}
            data-cy="submit"
            disabled={isExecutingCall}
          >
            {isExecutingCall && <UOLoader size={14} />}
            {facility ? 'Update' : 'Create'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

//CreateUpdateFacility.propTypes = {
//  facility: PropTypes.shape({
//    id: PropTypes.number.isRequired,
//    name: PropTypes.string.isRequired,
//    shortCode: PropTypes.string.isRequired,
//    description: PropTypes.string.isRequired,
//    managerUserId: PropTypes.number.isRequired,
//    scientists: PropTypes.array.isRequired,
//  }),
//  close: PropTypes.func.isRequired,
//};

export default CreateUpdateFacility;
