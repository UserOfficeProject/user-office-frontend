import { Grid } from '@material-ui/core';
import React from 'react';

import { SuperMaterialTable } from 'components/common/SuperMaterialTable';
import { createQuestionForm } from 'components/questionary/QuestionaryComponentRegistry';
import { Question } from 'generated/sdk';
import { useQuestions } from 'hooks/template/useQuestions';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';
import { tableIcons } from 'utils/materialIcons';
import { FunctionType } from 'utils/utilTypes';

import QuestionsTableFilter from './QuestionsTableFilter';

const columns = [
  { title: 'Question', field: 'question' },
  { title: 'Key', field: 'naturalKey' },
  { title: 'Category', field: 'categoryId' },
];

function QuestionsPage() {
  const {
    questions,
    setQuestions,
    setQuestionsFilter,
    loadingQuestions,
  } = useQuestions();

  const createModal = (
    onUpdate: FunctionType<void, [Question | null]>,
    onCreate: FunctionType<void, [Question | null]>,
    question: Question | null
  ) => {
    if (question) {
      return createQuestionForm({ question, onUpdated: onUpdate });
    }
  };

  return (
    <ContentContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <QuestionsTableFilter
              onChange={(filter) => {
                setQuestionsFilter(filter);
              }}
            />
            <SuperMaterialTable
              createModal={createModal}
              setData={setQuestions}
              icons={tableIcons}
              title="Questions"
              columns={columns}
              isLoading={loadingQuestions}
              data={questions}
              options={{ search: false }}
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}

export default QuestionsPage;
