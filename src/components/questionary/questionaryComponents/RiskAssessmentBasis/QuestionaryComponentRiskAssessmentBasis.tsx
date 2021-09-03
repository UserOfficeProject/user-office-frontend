import {
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  Link,
  makeStyles,
  Select,
} from '@material-ui/core';
import { useContext } from 'react';
import React, { useState } from 'react';

import MultiMenuItem from 'components/common/MultiMenuItem';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import { RiskAssessmentContextType } from 'components/riskAssessment/RiskAssessmentContainer';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';
import { useProposalSamples } from 'hooks/sample/useProposalSamples';
import { RiskAssessmentSubmissionState } from 'models/questionary/riskAssessment/RiskAssessmentSubmissionState';

import AddMoreSamples from './AddMoreSamples';

const useStyles = makeStyles(() => ({
  addMoreSamplesButton: {
    cursor: 'pointer',
  },
}));

function QuestionaryComponentRiskAssessmentBasis() {
  const { dispatch, state } = useContext(
    QuestionaryContext
  ) as RiskAssessmentContextType;

  const [showAddMoreSamples, setShowAddMoreSamples] = useState(false);
  const classes = useStyles();
  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }
  const { samples, setSamples, loadingSamples } = useProposalSamples(
    state.riskAssessment.proposalPk
  );

  const [sampleIds, setSampleIds] = useState<number[]>(
    state?.riskAssessment.samples.map((sample) => sample.id) || []
  );

  return (
    <>
      {!loadingSamples && samples.length > 0 && (
        <FormControl fullWidth>
          <InputLabel id="sample-ids">Select samples</InputLabel>
          <Select
            labelId="sample-ids"
            multiple
            onChange={(event) => {
              const newSampleIds = event.target.value as number[];
              const newSamples = samples.filter((sample) =>
                newSampleIds.includes(sample.id)
              );
              setSampleIds(newSampleIds);
              dispatch({
                type: 'RISK_ASSESSMENT_MODIFIED',
                assessment: { samples: newSamples },
              });
            }}
            value={sampleIds}
            fullWidth
            data-cy="samples-dropdown"
            className="MuiFormControl-marginDense"
            MenuProps={{
              variant: 'menu',
              getContentAnchorEl: null,
            }}
          >
            {samples.map((sample) => (
              <MultiMenuItem key={sample.id} value={sample.id}>
                {sample.title}
              </MultiMenuItem>
            ))}
          </Select>
          <Link
            align="right"
            onClick={() => setShowAddMoreSamples(true)}
            className={classes.addMoreSamplesButton}
            data-cy="add-more-samples-btn"
          >
            Add more samples
          </Link>
        </FormControl>
      )}
      <Dialog open={showAddMoreSamples} maxWidth="sm" fullWidth>
        <DialogContent>
          <AddMoreSamples
            proposalPk={state.riskAssessment.proposalPk}
            sampleCreated={(newSample) => setSamples([newSample, ...samples])}
            sampleEditDone={() => setShowAddMoreSamples(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const riskAssessmentBasisPreSubmit = () => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  const riskAssessment = (state as RiskAssessmentSubmissionState)
    .riskAssessment;

  const riskAssessmentExists = riskAssessment.riskAssessmentId > 0;

  let questionaryId: number;
  let riskAssessmentId: number;
  if (riskAssessmentExists) {
    questionaryId = riskAssessment.questionary.questionaryId;
    riskAssessmentId = riskAssessment.riskAssessmentId;
  } else {
    // create new risk assessment with questionary
    const result = await api.createRiskAssessment({
      proposalPk: riskAssessment.proposalPk,
      scheduledEventId: riskAssessment.scheduledEventId,
    });
    const newRiskAssessment = result.createRiskAssessment.riskAssessment;

    if (newRiskAssessment) {
      dispatch({
        type: 'RISK_ASSESSMENT_CREATED',
        assessment: newRiskAssessment,
      });
      questionaryId = newRiskAssessment.questionary.questionaryId;
      riskAssessmentId = newRiskAssessment.riskAssessmentId;
    } else {
      return 0; // error
    }
  }

  const sampleIds = riskAssessment.samples.map((sample) => sample.id);
  await api.updateRiskAssessment({
    riskAssessmentId: riskAssessmentId,
    sampleIds: sampleIds,
  });

  return questionaryId;
};

export {
  QuestionaryComponentRiskAssessmentBasis,
  riskAssessmentBasisPreSubmit,
};
