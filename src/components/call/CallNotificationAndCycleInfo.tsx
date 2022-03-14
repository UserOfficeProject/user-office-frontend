import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import useTheme from '@mui/material/styles/useTheme';
import { Field, useFormikContext } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import React, { useContext, useEffect } from 'react';

import { SettingsContext } from 'context/SettingsContextProvider';
import {
  CreateCallMutationVariables,
  SettingsId,
  UpdateCallMutationVariables,
} from 'generated/sdk';

const CallCycleInfo: React.FC = () => {
  const theme = useTheme();
  const { settings } = useContext(SettingsContext);
  const dateFormat = settings.get(SettingsId.DATE_FORMAT)?.settingsValue;
  const mask = dateFormat?.replace(/[a-zA-Z]/g, '_');
  const formik = useFormikContext<
    CreateCallMutationVariables | UpdateCallMutationVariables
  >();
  const { startNotify, endNotify, startCycle, endCycle } = formik.values;

  useEffect(() => {
    if (endNotify && endNotify < startNotify) {
      formik.setFieldValue('endNotify', startNotify);
      formik.setFieldTouched('endNotify', false);
    }

    if (endCycle && endCycle < startCycle) {
      formik.setFieldValue('endCycle', startCycle);
      formik.setFieldTouched('endCycle', false);
    }
  }, [startNotify, endNotify, startCycle, endCycle, formik]);

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Field
          name="startNotify"
          label="Start of notification period"
          id="start-notification-period-input"
          inputFormat={dateFormat}
          mask={mask}
          allowSameDateSelection
          component={DatePicker}
          inputProps={{ placeholder: dateFormat }}
          textField={{
            fullWidth: true,
          }}
          desktopModeMediaQuery={theme.breakpoints.up('sm')}
        />
        <Field
          name="endNotify"
          label="End of notification period"
          id="end-notification-period-input"
          inputFormat={dateFormat}
          mask={mask}
          minDate={startNotify}
          allowSameDateSelection
          component={DatePicker}
          inputProps={{ placeholder: dateFormat }}
          textField={{
            fullWidth: true,
          }}
          desktopModeMediaQuery={theme.breakpoints.up('sm')}
        />
        <Field
          name="startCycle"
          label="Start of cycle"
          id="start-cycle-input"
          inputFormat={dateFormat}
          mask={mask}
          component={DatePicker}
          inputProps={{ placeholder: dateFormat }}
          allowSameDateSelection
          textField={{
            fullWidth: true,
            'data-cy': 'start-cycle',
          }}
          desktopModeMediaQuery={theme.breakpoints.up('sm')}
        />
        <Field
          name="endCycle"
          label="End of cycle"
          id="end-cycle-input"
          inputFormat={dateFormat}
          mask={mask}
          minDate={startCycle}
          component={DatePicker}
          inputProps={{ placeholder: dateFormat }}
          allowSameDateSelection
          textField={{
            fullWidth: true,
            'data-cy': 'end-cycle',
          }}
          desktopModeMediaQuery={theme.breakpoints.up('sm')}
        />
      </LocalizationProvider>
      <Field
        name="cycleComment"
        label="Cycle comment (public)"
        id="cycle-comment-input"
        type="text"
        component={TextField}
        required
        fullWidth
        data-cy="cycle-comment"
        inputProps={{ maxLength: '100' }}
      />
      <Field
        name="submissionMessage"
        label="Submission Message"
        id="submission-message-input"
        type="text"
        component={TextField}
        fullWidth
        data-cy="submission-message"
      />
    </>
  );
};

export default CallCycleInfo;
