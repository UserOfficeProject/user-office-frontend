import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React, { useEffect, useState } from 'react';

import ModalWrapper from 'components/common/ModalWrapper';
import { Sample, SubtemplateConfig } from 'generated/sdk';
import { SampleBasic } from 'models/Sample';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

import { BasicComponentProps } from '../IBasicComponentProps';
import ProposalErrorLabel from '../ProposalErrorLabel';
import SampleDeclarationContainer from '../SampleDeclarationContainer';
import { QuestionariesList, QuestionariesListRow } from './QuestionariesList';

export default function ProposalComponentSampleDeclaration(
  props: BasicComponentProps
) {
  const { templateField, errors, onComplete } = props;
  const proposalQuestionId = templateField.question.proposalQuestionId;
  const config = templateField.config as SubtemplateConfig;
  const isError = errors[proposalQuestionId] ? true : false;

  const { api } = useDataApiWithFeedback();

  const [stateValue, setStateValue] = useState<number[]>(
    templateField.value || []
  );
  const [rows, setRows] = useState<QuestionariesListRow[]>([]);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  const sampleToListRow = (sample: SampleBasic): QuestionariesListRow => {
    return { id: sample.id, label: sample.title };
  };

  useEffect(() => {
    const getSamples = async (answerId: number): Promise<SampleBasic[]> => {
      return api()
        .getSamplesByAnswerId({ answerId })
        .then(response => {
          return response.samplesByAnswerId || [];
        });
    };

    if (templateField.answerId) {
      getSamples(templateField.answerId).then(samples =>
        setRows(samples.map(sampleToListRow))
      );
    }
  }, [templateField.answerId, api]);

  return (
    <>
      <FormControl error={isError} required={config.required} fullWidth>
        <FormLabel error={isError}>{templateField.question.question}</FormLabel>
        <span>{config.small_label}</span>

        <QuestionariesList
          addButtonLabel={config.addEntryButtonLabel}
          data={rows}
          onEditClick={item =>
            api()
              .getSample({ sampleId: item.id })
              .then(response => {
                if (response.sample) {
                  setSelectedSample(response.sample);
                }
              })
          }
          onDeleteClick={item => {
            const newStateValue = stateValue.filter(
              sampleId => sampleId !== item.id
            );
            setStateValue(newStateValue);
            setRows(rows.filter(row => row.id !== item.id));
            onComplete(null as any, newStateValue);
          }}
          onAddNewClick={() =>
            api()
              .createSample({
                title: '',
                templateId: config.templateId,
              })
              .then(response => {
                const newSample = response.createSample.sample;
                if (newSample) {
                  const newStateValue = [...stateValue, newSample.id];
                  setStateValue(newStateValue);
                  setRows([...rows, sampleToListRow(newSample)]);
                  setSelectedSample(newSample);
                  onComplete(null as any, newStateValue);
                }
              })
          }
          {...props}
        />
        {isError && (
          <ProposalErrorLabel>{errors[proposalQuestionId]}</ProposalErrorLabel>
        )}
      </FormControl>
      <ModalWrapper
        close={() => setSelectedSample(null)}
        isOpen={selectedSample !== null}
      >
        {selectedSample ? (
          <SampleDeclarationContainer
            data={selectedSample!}
            sampleEditDone={updatedSample => {
              if (updatedSample) {
                const index = rows.findIndex(
                  sample => sample.id === updatedSample.id
                );
                const newRows = [...rows];
                newRows.splice(index, 1, {
                  ...rows[index],
                  ...sampleToListRow(updatedSample),
                });
                setRows(newRows);
              }

              setSelectedSample(null);
            }}
          ></SampleDeclarationContainer>
        ) : null}
      </ModalWrapper>
    </>
  );
}
