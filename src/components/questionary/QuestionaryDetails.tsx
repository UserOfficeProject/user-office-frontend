import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

import UOLoader from 'components/common/UOLoader';
import { Answer } from 'generated/sdk';
import { useQuestionary } from 'hooks/questionary/useQuestionary';
import {
  areDependenciesSatisfied,
  getAllFields,
} from 'models/QuestionaryFunctions';

import { getQuestionaryComponentDefinition } from './QuestionaryComponentRegistry';

function QuestionaryDetails(props: { questionaryId: number }) {
  const { questionary, loadingQuestionary } = useQuestionary(
    props.questionaryId
  );

  if (loadingQuestionary) {
    return <UOLoader />;
  }

  if (!questionary) {
    return <span>Failed to load questionary details</span>;
  }

  const allQuestions = getAllFields(questionary.steps) as Answer[];
  const displayableQuestions = allQuestions.filter(field => {
    const definition = getQuestionaryComponentDefinition(
      field.question.dataType
    );

    const isDisplayable =
      areDependenciesSatisfied(
        questionary.steps,
        field.question.proposalQuestionId
      ) && definition.readonly;
  });

  // if(isDisplayable) {
  //   return {
  //     id: field.question.proposalQuestionId,
  //     question: definition.renderers?.questionRenderer({question:field.question}),
  //     answer:definition.renderers?.answerRenderer({answer:field})
  //   }
  // }
  // else{
  //   return null
  // }

  return (
    <>
      <Table>
        <TableBody>
          {displayableQuestions.map(row => {
            const definition = getQuestionaryComponentDefinition(
              row.question.dataType
            );
            const question = definition.renderers?.questionRenderer({
              question: row.question,
            });
            const answer = definition.renderers?.answerRenderer({
              answer: row,
            });

            return (
              <TableRow key={`answer-${row.answerId}`}>
                <TableCell>{question}</TableCell>
                <TableCell>{answer}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default QuestionaryDetails;
