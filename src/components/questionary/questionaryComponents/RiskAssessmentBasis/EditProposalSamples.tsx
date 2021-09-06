import { Button, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';

import { ActionButtonContainer } from 'components/common/ActionButtonContainer';
import { QuestionaryContext } from 'components/questionary/QuestionaryContext';
import { createFormikConfigObjects } from 'components/questionary/QuestionaryStepView';
import { Questionary as QuestionarySDK, Answer, DataType } from 'generated/sdk';
import { ProposalData } from 'hooks/proposal/useProposalData';
import { ProposalSubmissionState } from 'models/questionary/proposal/ProposalSubmissionState';
import { getAllFields } from 'models/questionary/QuestionaryFunctions';
import { QuestionarySubmissionModel } from 'models/questionary/QuestionarySubmissionState';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

import QuestionaryComponentSampleDeclaration from '../SampleDeclaration/QuestionaryComponentSampleDeclaration';

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: 15,
  },
}));

const filterSampleAnswers = (questionary: QuestionarySDK): Answer[] => {
  const allAnswers: Answer[] = getAllFields(questionary.steps) as Answer[];

  const sampleAnswers = allAnswers.filter(
    (question) => question.question.dataType === DataType.SAMPLE_DECLARATION
  );

  return sampleAnswers;
};

interface EditProposalSamplesProps {
  proposal: ProposalData;
  samplesUpdated: () => void;
}

function EditProposalSamples({
  proposal,
  samplesUpdated,
}: EditProposalSamplesProps) {
  const classes = useStyles();
  const { api } = useDataApiWithFeedback();

  const sampleAnswers = filterSampleAnswers(proposal.questionary);

  const initialState = new ProposalSubmissionState(proposal, 0, false, []);
  const {
    state,
    dispatch,
  } = QuestionarySubmissionModel<ProposalSubmissionState>(initialState, []);
  const { initialValues } = createFormikConfigObjects(
    sampleAnswers,
    state,
    api
  );

  return (
    <QuestionaryContext.Provider value={{ state, dispatch }}>
      <Typography variant="h5" className={classes.title}>
        Proposal samples
      </Typography>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {(formikProps) => (
          <Form>
            {sampleAnswers.map((answer) => (
              <QuestionaryComponentSampleDeclaration
                answer={answer}
                onComplete={() => {}}
                formikProps={formikProps}
                key={answer.question.id}
              />
            ))}
            <ActionButtonContainer>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => samplesUpdated()}
                data-cy="close-edit-proposal-samples"
              >
                Close
              </Button>
            </ActionButtonContainer>
          </Form>
        )}
      </Formik>
    </QuestionaryContext.Provider>
  );
}

export default EditProposalSamples;
