import { Field, FieldProps, FormikProps } from 'formik';
import { fieldToDateTimePicker } from 'formik-material-ui-pickers';
import React, { useContext, useState } from 'react';

import StyledModal from 'components/common/StyledModal';
import UOLoader from 'components/common/UOLoader';
import { ProposalContextType } from 'components/proposal/ProposalContainer';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import {
  Answer,
  QuestionaryStep,
  Sample,
  SampleStatus,
  SubtemplateConfig,
} from 'generated/sdk';
import { SampleBasic } from 'models/Sample';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';

import {
  QuestionnairesList,
  QuestionnairesListRow,
} from '../QuestionnairesList';
import { SampleDeclarationContainer } from './SampleDeclarationContainer';

const sampleToListRow = (sample: SampleBasic): QuestionnairesListRow => {
  return {
    id: sample.id,
    label: sample.title,
    isCompleted: !!sample.questionary?.steps.every((step) => step.isCompleted),
  };
};

function createSampleStub(
  templateId: number,
  questionarySteps: QuestionaryStep[],
  proposalId: number,
  questionId: string
): Sample {
  return {
    id: 0,
    created: new Date(),
    creatorId: 0,
    questionary: {
      questionaryId: 0,
      templateId: templateId,
      created: new Date(),
      steps: questionarySteps,
    },
    questionId: questionId,
    questionaryId: 0,
    safetyComment: '',
    safetyStatus: SampleStatus.PENDING_EVALUATION,
    title: '',
    proposalId: proposalId,
  };
}

type QuestionaryComponentSampleDeclarationProps = {
  answer: Answer;
  formikProps: FormikProps<Record<string, unknown>>;
  onComplete: (newValue: Answer['value']) => void;
  confirm: WithConfirmType;
};

function QuestionaryComponentSampleDeclaration(
  props: QuestionaryComponentSampleDeclarationProps
) {
  const { answer, confirm } = props;
  const answerId = answer.question.id;
  const config = answer.config as SubtemplateConfig;
  const { state } = useContext(QuestionaryContext) as ProposalContextType;

  const { api } = useDataApiWithFeedback();

  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  if (!state) {
    throw new Error(createMissingContextErrorMessage());
  }

  return (
    <Field name={answerId}>
      {({ field, form }: FieldProps<Sample[]>) => {
        const copySample = (id: number) =>
          api()
            .cloneSample({ sampleId: id })
            .then((response) => {
              const clonedSample = response.cloneSample.sample;
              if (clonedSample) {
                form.setFieldValue(answerId, [...field.value, clonedSample]);
              }
            });

        const deleteSample = (id: number) =>
          api()
            .deleteSample({ sampleId: id })
            .then((response) => {
              if (!response.deleteSample.error) {
                const newStateValue = field.value.filter(
                  (sample) => sample.id !== id
                );
                form.setFieldValue(answerId, newStateValue);
              }
            });

        return (
          <div>
            <QuestionnairesList
              addButtonLabel={config.addEntryButtonLabel}
              data={field.value?.map(sampleToListRow) ?? []}
              maxEntries={config.maxEntries || undefined}
              onEditClick={(item) =>
                api()
                  .getSample({ sampleId: item.id })
                  .then((response) => {
                    if (response.sample) {
                      setSelectedSample(response.sample);
                    }
                  })
              }
              onDeleteClick={(item) => {
                confirm(() => deleteSample(item.id), {
                  title: 'Delete Sample',
                  description:
                    'This action will delete the sample and all data associated with it',
                })();
              }}
              onCloneClick={(item) => {
                confirm(() => copySample(item.id), {
                  title: 'Copy Sample',
                  description:
                    'This action will copy the sample and all data associated with it',
                })();
              }}
              onAddNewClick={() => {
                // TODO move this into a function like copySample
                if (!state) {
                  throw new Error(
                    'Sample Declaration is missing proposal context'
                  );
                }

                const proposalId = state.proposal.id;
                const questionId = props.answer.question.id;
                if (proposalId <= 0 || !questionId) {
                  throw new Error(
                    'Sample Declaration is missing proposal id and/or question id'
                  );
                }
                const templateId = config.templateId;

                if (!templateId) {
                  throw new Error('Sample Declaration is missing templateId');
                }

                api()
                  .getBlankQuestionarySteps({ templateId })
                  .then((result) => {
                    const blankSteps = result.blankQuestionarySteps;
                    if (blankSteps) {
                      const sampleStub = createSampleStub(
                        templateId,
                        blankSteps,
                        proposalId,
                        questionId
                      );
                      setSelectedSample(sampleStub);
                    }
                  });
              }}
              {...props}
            />

            {/* TODO add small label */}
            <StyledModal
              onClose={() => setSelectedSample(null)}
              open={selectedSample !== null}
              data-cy="sample-declaration-modal"
            >
              {selectedSample ? (
                <SampleDeclarationContainer
                  sample={selectedSample}
                  sampleUpdated={(updatedSample) => {
                    const newValue = field.value.map((sample) =>
                      sample.id === updatedSample.id ? updatedSample : sample
                    );

                    form.setFieldValue(answerId, newValue);
                  }}
                  sampleCreated={(newSample) => {
                    form.setFieldValue(answerId, [...field.value, newSample]);
                  }}
                  // TODO remove it if async is working fine
                  sampleEditDone={() => {
                    // const index = field.value.findIndex(
                    //   (sample) => sample.id === selectedSample.id
                    // );

                    // form.setFieldValue(
                    //   answerId,
                    //   field.value.splice(index, 1, { ...selectedSample })
                    // );

                    setSelectedSample(null);
                  }}
                ></SampleDeclarationContainer>
              ) : (
                <UOLoader />
              )}
            </StyledModal>
          </div>
        );
      }}
    </Field>
  );
}

export default withConfirm(QuestionaryComponentSampleDeclaration);
