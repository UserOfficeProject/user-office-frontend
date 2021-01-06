import { makeStyles, Step, Stepper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';

import { useCheckAccess } from 'components/common/Can';
import { UserRole } from 'generated/sdk';
import { EventType, FormStepMetadata } from 'models/QuestionarySubmissionState';

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

const getConfirmNavigMsg = (): string => {
  return 'Changes you recently made in this step will not be saved! Are you sure?';
};

interface QuestionaryProps {
  title: string;
  info: string;
  displayElementFactory: (metadata: FormStepMetadata) => React.ReactNode;
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
    throw new Error(createMissingContextErrorMessage(Questionary));
  }

  const allStepsComplete = (steps: FormStepMetadata[]) =>
    steps.every(step => step.isCompleted);

  const getStepperNavig = () => {
    // if there are less than 2 steps then there is no need to show the wizard navigation
    if (state.stepMetadata.length < 2) {
      return null;
    }

    return (
      <Stepper
        nonLinear
        activeStep={state.stepIndex}
        className={classes.stepper}
      >
        {state.stepMetadata.map((metadata, index, steps) => (
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
              completed={metadata.isCompleted}
              editable={
                true
                // index === 0 ||
                // step.isCompleted ||
                // steps[index].isCompleted === true
              }
            >
              <span>{metadata.title}</span>
            </QuestionaryStepButton>
          </Step>
        ))}
      </Stepper>
    );
  };

  const getStepContent = () => {
    const currentStep = state.stepMetadata[state.stepIndex];

    if (!currentStep) {
      return null;
    }

    return displayElementFactory(currentStep);
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
