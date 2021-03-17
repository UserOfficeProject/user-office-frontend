import { Grid, Link } from '@material-ui/core';
import React, { useState } from 'react';

import StyledModal from 'components/common/StyledModal';
import { SuperMaterialTable } from 'components/common/SuperMaterialTable';
import { createQuestionForm } from 'components/questionary/QuestionaryComponentRegistry';
import { Question } from 'generated/sdk';
import { useQuestions } from 'hooks/template/useQuestions';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';
import { tableIcons } from 'utils/materialIcons';
import { FunctionType } from 'utils/utilTypes';

import AnswerCountDetails from './AnswerCountDetails';
import QuestionsTableFilter from './QuestionsTableFilter';
import TemplateCountDetails from './TemplateCountDetails';

function QuestionsPage() {
  const {
    questions,
    setQuestions,
    setQuestionsFilter,
    loadingQuestions,
  } = useQuestions();

  const [
    selectedTemplateCountDetailsQuestion,
    setSelectedTemplateCountDetailsQuestion,
  ] = useState<Question | null>(null);

  const [
    selectedAnswerCountDetailsQuestion,
    setSelectedAnswerCountDetailsQuestion,
  ] = useState<Question | null>(null);

  const createModal = (
    onUpdate: FunctionType<void, [Question | null]>,
    onCreate: FunctionType<void, [Question | null]>,
    question: Question | null
  ) => {
    if (question) {
      return createQuestionForm({ question, onUpdated: onUpdate });
    }
  };

  const templateCountButton = (rowData: Question) => (
    <Link
      onClick={() => setSelectedTemplateCountDetailsQuestion(rowData)}
      style={{ cursor: 'pointer' }}
    >
      {rowData.templateCount}
    </Link>
  );

  const answerCountButton = (rowData: Question) => (
    <Link
      onClick={() => setSelectedAnswerCountDetailsQuestion(rowData)}
      style={{ cursor: 'pointer' }}
    >
      {rowData.answerCount}
    </Link>
  );

  const columns = [
    { title: 'Question', field: 'question' },
    { title: 'Key', field: 'naturalKey' },
    { title: 'Category', field: 'categoryId' },
    {
      title: '# Proposals',
      render: answerCountButton,
    },
    {
      title: '# Templates',
      render: templateCountButton,
    },
  ];

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
      <StyledModal
        onClose={() => setSelectedTemplateCountDetailsQuestion(null)}
        open={selectedTemplateCountDetailsQuestion !== null}
      >
        <TemplateCountDetails question={selectedTemplateCountDetailsQuestion} />
      </StyledModal>
      <StyledModal
        onClose={() => setSelectedAnswerCountDetailsQuestion(null)}
        open={selectedAnswerCountDetailsQuestion !== null}
      >
        <AnswerCountDetails question={selectedAnswerCountDetailsQuestion} />
      </StyledModal>
    </ContentContainer>
  );
}

export default QuestionsPage;
