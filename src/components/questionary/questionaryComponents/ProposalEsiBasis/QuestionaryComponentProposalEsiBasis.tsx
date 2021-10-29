import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Field, FieldProps } from 'formik';
import React, { MouseEvent, useContext, useState } from 'react';

import ErrorMessage from 'components/common/ErrorMessage';
import BoxIcon from 'components/common/icons/BoxIcon';
import StyledModal from 'components/common/StyledModal';
import UOLoader from 'components/common/UOLoader';
import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { ProposalEsiContextType } from 'components/proposalEsi/ProposalEsiContainer';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import SampleEsiContainer from 'components/sampleEsi/SampleEsiContainer';
import {
  DataType,
  GetSampleEsiQuery,
  SampleDeclarationConfig,
} from 'generated/sdk';
import { getQuestionsByType } from 'models/questionary/QuestionaryFunctions';
import { SampleEsiWithQuestionary } from 'models/questionary/sampleEsi/SampleEsiWithQuestionary';
import { ButtonContainer } from 'styles/StyledComponents';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';
import withConfirm, { WithConfirmType } from 'utils/withConfirm';
import withPrompt, { WithPromptType } from 'utils/withPrompt';

function QuestionaryComponentProposalEsiBasis(
  props: BasicComponentProps & { prompt: WithPromptType } & {
    confirm: WithConfirmType;
  }
) {
  const { answer, prompt, confirm } = props;
  const answerId = answer.question.id;
  const { state, dispatch } = useContext(
    QuestionaryContext
  ) as ProposalEsiContextType;
  const [selectedSampleEsi, setSelectedSampleEsi] =
    useState<GetSampleEsiQuery['sampleEsi']>(null);
  const { api } = useDataApiWithFeedback();

  if (!state) {
    throw new Error(createMissingContextErrorMessage());
  }

  return (
    <Field name={answerId}>
      {({ field, form }: FieldProps<SampleEsiWithQuestionary[]>) => {
        const declareEsi = (sampleId: number) => {
          api()
            .createSampleEsi({
              esiId: state!.esi.id,
              sampleId: sampleId,
            })
            .then((response) => {
              const sampleEsi = response.createSampleEsi?.esi;
              if (sampleEsi) {
                form.setFieldValue(answerId, [...field.value, sampleEsi]);
                dispatch({
                  type: 'ESI_SAMPLE_ESI_CREATED',
                  sampleEsi: sampleEsi,
                });
                setSelectedSampleEsi(response.createSampleEsi.esi);
              }
            });
        };

        const revokeEsi = (sampleId: number) => {
          api()
            .deleteSampleEsi({
              esiId: state!.esi.id,
              sampleId: sampleId,
            })
            .then((response) => {
              const deletedEsi = response.deleteSampleEsi?.esi;
              if (deletedEsi) {
                const newValue = field.value.filter(
                  (esi) => esi.sampleId !== deletedEsi.sampleId
                );
                form.setFieldValue(answerId, newValue);
                dispatch({
                  type: 'ESI_SAMPLE_ESI_DELETED',
                  sampleId: deletedEsi.sampleId,
                });
              }
            });
        };

        const addNewSample = async (title: string) => {
          const sampleQuestions = getQuestionsByType(
            state.esi.proposal.questionary.steps,
            DataType.SAMPLE_DECLARATION
          );

          const sampleQuestion = sampleQuestions[0];

          const result = await api().createSample({
            title: title,
            templateId: (sampleQuestion.config as SampleDeclarationConfig)
              .templateId!,
            proposalPk: state.esi.proposal.primaryKey,
            questionId: sampleQuestion.question.id,
            isPostProposalSubmission: true,
          });

          const sample = result.createSample.sample;

          if (sample !== null) {
            dispatch({ type: 'ESI_SAMPLE_CREATED', sample: sample });
            declareEsi(sample.id);
          }
        };

        const deleteSample = async (sampleId: number) => {
          await api()
            .deleteSample({
              sampleId: sampleId,
            })
            .then((response) => {
              const deletedSample = response.deleteSample.sample;
              if (deletedSample) {
                dispatch({
                  type: 'ESI_SAMPLE_DELETED',
                  sampleId: deletedSample.id,
                });
              }
            });
        };

        const handleRevokeEsiClick = async (sampleId: number) => {
          confirm(
            () => {
              revokeEsi(sampleId);
            },
            {
              title: 'Are you sure?',
              description:
                'Are you sure you want to deselect the sample? The information entered for the ESI will be lost!',
            }
          )();
        };

        const handleEditEsiClick = async (id: number) => {
          await api()
            .updateSampleEsi({
              esiId: state!.esi.id,
              sampleId: id,
              isSubmitted: false,
            })
            .then((response) => {
              const updatedEsi = response.updateSampleEsi.esi;
              if (updatedEsi) {
                setSelectedSampleEsi(updatedEsi);
                const newValue = field.value.map((esi) =>
                  esi.sampleId === updatedEsi.sampleId ? updatedEsi : esi
                );
                dispatch({
                  type: 'ESI_SAMPLE_ESI_UPDATED',
                  sampleEsi: updatedEsi,
                });
                form.setFieldValue(answerId, newValue);
              }
            });
        };

        const allSamples = state?.esi?.proposal.samples;
        const declaredEsis = field.value || [];

        return (
          <>
            <label>{answer.question.question}</label>
            <List dense={true} data-cy="sample-esi-list">
              {allSamples?.map((sample) => {
                const esi = declaredEsis.find(
                  (curEsi) => curEsi.sampleId === sample.id
                );
                const hasDeclaredEsi = esi !== undefined;
                const isDeclarationComplete = esi?.isSubmitted;

                return (
                  <ListItem key={sample.id}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={hasDeclaredEsi}
                        onChange={(e) =>
                          e.target.checked
                            ? declareEsi(sample.id)
                            : handleRevokeEsiClick(sample.id)
                        }
                        data-cy="select-sample-chk"
                      />
                    </ListItemIcon>
                    <ListItemIcon>
                      <BoxIcon
                        htmlColor={
                          isDeclarationComplete
                            ? 'green'
                            : hasDeclaredEsi
                            ? 'red'
                            : 'inherit'
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={sample.title}
                      secondary={
                        isDeclarationComplete
                          ? 'Ready'
                          : hasDeclaredEsi
                          ? 'Unfinished declaration'
                          : ''
                      }
                    />

                    {hasDeclaredEsi && (
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          title="Edit"
                          onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            handleEditEsiClick(sample.id);
                          }}
                          data-cy="edit-esi-btn"
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemIcon>
                    )}

                    {sample.isPostProposalSubmission && (
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          title="Delete sample"
                          data-cy="delete-sample-btn"
                          onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            confirm(
                              async () => {
                                deleteSample(sample.id);
                              },
                              {
                                title: 'Are you sure',
                                description: `Are you sure you want to delete sample "${sample.title}"`,
                              }
                            )();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemIcon>
                    )}
                  </ListItem>
                );
              })}
            </List>
            <ErrorMessage name={answerId} />
            <ButtonContainer>
              <Button
                onClick={() =>
                  prompt(
                    async (title) => {
                      addNewSample(title);
                    },
                    { question: 'Name of the sample' }
                  )()
                }
                variant="outlined"
                data-cy="add-sample-btn"
                size="small"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
              >
                Add sample
              </Button>
            </ButtonContainer>
            <Divider style={{ margin: '12px 0' }} />
            <Typography variant="body1" align={'right'}>
              {`${declaredEsis.length ?? 0} of
              ${state?.esi?.proposal.samples?.length ?? 0} samples selected`}
            </Typography>
            <StyledModal
              onClose={() => setSelectedSampleEsi(null)}
              open={selectedSampleEsi !== null}
              data-cy="sample-esi-modal"
            >
              {selectedSampleEsi ? (
                <SampleEsiContainer
                  esi={selectedSampleEsi}
                  onUpdate={(updatedSampleEsi) => {
                    const newValue = field.value.map((sampleEsi) =>
                      sampleEsi.sampleId === updatedSampleEsi.sampleId
                        ? updatedSampleEsi
                        : sampleEsi
                    );
                    dispatch({
                      type: 'ESI_SAMPLE_ESI_UPDATED',
                      sampleEsi: updatedSampleEsi,
                    });
                    form.setFieldValue(answerId, newValue);
                  }}
                  onSubmitted={() => {
                    // refresh all samples
                    api()
                      .getEsi({ esiId: state!.esi.id })
                      .then((result) => {
                        form.setFieldValue(answerId, result.esi?.sampleEsis);
                      });

                    setSelectedSampleEsi(null);
                  }}
                ></SampleEsiContainer>
              ) : (
                <UOLoader />
              )}
            </StyledModal>
          </>
        );
      }}
    </Field>
  );
}

export default withConfirm(withPrompt(QuestionaryComponentProposalEsiBasis));
