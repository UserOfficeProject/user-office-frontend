import React, { FC } from 'react';
import * as Yup from 'yup';

import { QuestionTemplateRelationFormProps } from 'components/questionary/QuestionaryComponentRegistry';

import { QuestionExcerpt } from '../QuestionExcerpt';
import { QuestionTemplateRelationFormShell } from '../QuestionTemplateRelationFormShell';

export const QuestionTemplateRelationProposalBasisForm: FC<QuestionTemplateRelationFormProps> = (
  props
) => {
  return (
    <QuestionTemplateRelationFormShell
      closeMe={props.closeMe}
      dispatch={props.dispatch}
      questionRel={props.field}
      template={props.template}
      validationSchema={Yup.object().shape({})}
    >
      {() => (
        <>
          <QuestionExcerpt question={props.field.question} />
        </>
      )}
    </QuestionTemplateRelationFormShell>
  );
};
