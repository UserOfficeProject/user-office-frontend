import { Grid } from '@material-ui/core';
import React from 'react';

import SuperMaterialTable from 'components/common/SuperMaterialTable';
import { useQuestions } from 'hooks/template/useQuestions';
import { ContentContainer, StyledPaper } from 'styles/StyledComponents';
import { tableIcons } from 'utils/materialIcons';

const columns = [
  { title: 'Question', field: 'question' },
  { title: 'Key', field: 'naturalKey' },
  { title: 'Category', field: 'categoryId' },
];

function QuestionsPage() {
  const { questions, setQuestions, loadingQuestions } = useQuestions();

  return (
    <ContentContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <SuperMaterialTable
              createModal={() => <div></div>}
              setData={setQuestions}
              icons={tableIcons}
              title="Questions"
              columns={columns}
              isLoading={loadingQuestions}
              data={questions}
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}

export default QuestionsPage;
