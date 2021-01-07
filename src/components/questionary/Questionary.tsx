import { makeStyles, Step, Stepper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';

import { useCheckAccess } from 'components/common/Can';
import { UserRole } from 'generated/sdk';
import { EventType, WizardStep } from 'models/QuestionarySubmissionState';

import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from './QuestionaryContext';
import { QuestionaryStepButton } from './QuestionaryStepButton';

const useStyles = makeStyles(theme => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

interface QuestionaryProps {
  title: string;
  info: string;
  displayElementFactory: (
    metadata: WizardStep,
    isReadonly: boolean
  ) => React.ReactNode;
  handleReset: () => Promise<boolean>;
}

function Questionary({
  title,
  info,
  handleReset,
  displayElementFactory,
}: QuestionaryProps) {
  const isNonOfficer = !useCheckAccess([UserRole.USER_OFFICER]);
  const classes = useStyles();
  const { state, dispatch } = useContext(QuestionaryContext);

  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  const getStepperNavig = () => {
    // if there are less than 2 steps then there is no need to show the wizard navigation
    if (state.wizardSteps.length < 2) {
      return null;
    }

    return (
      <Stepper
        nonLinear
        activeStep={state.stepIndex}
        className={classes.stepper}
      >
        {state.wizardSteps.map((wizardStep, index) => {
          const stepMetadata = wizardStep.getMetadata(
            state,
            wizardStep.payload
          );

          return (
            <Step key={index}>
              <QuestionaryStepButton
                onClick={async () => {
                  if (!state.isDirty || (await handleReset())) {
                    dispatch({
                      type: EventType.GO_TO_STEP,
                      payload: { stepIndex: index },
                    });
                  }
                }}
                completed={stepMetadata.isCompleted}
                readonly={stepMetadata.isReadonly}
              >
                <span>{stepMetadata.title}</span>
              </QuestionaryStepButton>
            </Step>
          );
        })}
      </Stepper>
    );
  };

  const getStepContent = () => {
    const currentStep = state.wizardSteps[state.stepIndex];

    const stepMetadata = currentStep.getMetadata(state, currentStep.payload);

    if (!currentStep) {
      return null;
    }

    return displayElementFactory(currentStep, stepMetadata.isReadonly);
  };

  return (
    <div>
      <Typography component="h1" align="center">
        {title}
      </Typography>
      <div>{info}</div>
      {getStepperNavig()}
      {getStepContent()}
    </div>
  );
}

export default Questionary;
