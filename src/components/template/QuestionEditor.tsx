import React from 'react';

import StyledModal from 'components/common/StyledModal';
import { createQuestionForm } from 'components/questionary/QuestionaryComponentRegistry';
import { Question, Template } from 'generated/sdk';
import { Event } from 'models/QuestionaryEditorModel';

export default function QuestionEditor(props: {
  field: Question | null;
  dispatch: React.Dispatch<Event>;
  closeMe: () => void;
  template: Template;
}) {
  if (props.field === null) {
    return null;
  }

  return (
    <StyledModal onClose={props.closeMe} open={props.field != null}>
      {createQuestionForm({
        field: props.field,
        dispatch: props.dispatch,
        closeMe: props.closeMe,
      })}
    </StyledModal>
  );
}
