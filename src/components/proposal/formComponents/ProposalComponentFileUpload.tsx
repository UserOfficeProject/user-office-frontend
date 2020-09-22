import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React, { ChangeEvent, useState, useEffect } from 'react';

import { FileUploadConfig } from '../../../generated/sdk';
import { FileUploadComponent } from '../../common/FileUploadComponent';
import { BasicComponentProps } from '../IBasicComponentProps';
import ProposalErrorLabel from '../ProposalErrorLabel';

export function ProposalComponentFileUpload(
  props: BasicComponentProps & { files?: string[] }
) {
  const { templateField, errors, onComplete } = props;
  const {
    question: { proposalQuestionId },
    value,
  } = templateField;
  const isError = errors[proposalQuestionId] ? true : false;
  const config = templateField.config as FileUploadConfig;
  const [stateValue, setStateValue] = useState<string[]>(value);

  useEffect(() => {
    setStateValue(templateField.value);
  }, [templateField]);

  return (
    <FormControl error={isError} required={config.required ? true : false}>
      <FormLabel error={isError}>{templateField.question.question}</FormLabel>
      <span>{config.small_label}</span>
      <FileUploadComponent
        maxFiles={config.max_files}
        id={templateField.question.proposalQuestionId}
        fileType={config.file_type ? config.file_type.join(',') : ''}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          const newValue = evt.target.value.split(',');
          setStateValue(newValue);
          onComplete(evt, newValue); // letting Formik know that there was a change
        }}
        value={stateValue}
      />
      {isError && (
        <ProposalErrorLabel>{errors[proposalQuestionId]}</ProposalErrorLabel>
      )}
    </FormControl>
  );
}
