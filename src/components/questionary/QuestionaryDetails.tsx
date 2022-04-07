import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Table, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

import UOLoader from 'components/common/UOLoader';
import { Answer, DataType, Question } from 'generated/sdk';
import { useQuestionary } from 'hooks/questionary/useQuestionary';
import { areDependenciesSatisfied } from 'models/questionary/QuestionaryFunctions';

import { getQuestionaryComponentDefinition } from './QuestionaryComponentRegistry';
interface StepViewProps {
  title: string;
  content: JSX.Element;
}

const StepView = (props: StepViewProps) => {
  const { title, content } = props;

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  );
};

interface AnswersTableProps {
  rows?: TableRowData[];
}

const AnswersTable = (props: AnswersTableProps) => {
  const { rows } = props;

  const createTableRow = (key: string, rowData: TableRowData) => (
    <TableRow key={key}>
      <TableCell padding={'normal'}>{rowData.label}</TableCell>
      <TableCell width={'35%'}>{rowData.value}</TableCell>
    </TableRow>
  );

  return (
    <Table sx={{ wordBreak: 'break-word' }} size="small">
      <TableBody>
        {rows?.map((row, index) => createTableRow(`row-${index}`, row))}
      </TableBody>
    </Table>
  );
};

export interface TableRowData {
  label: JSX.Element | string | null;
  value: JSX.Element | string | null;
}
export interface QuestionaryDetailsProps extends TableProps<FC<unknown>> {
  questionaryId: number;
  additionalDetails?: Array<TableRowData>;
  title?: string;
  answerRenderer?: (answer: Answer) => JSX.Element | null;
}

function QuestionaryDetails(props: QuestionaryDetailsProps) {
  const { answerRenderer, questionaryId, additionalDetails, title } = props;

  const { questionary, loadingQuestionary } = useQuestionary(questionaryId);

  if (loadingQuestionary) {
    return <UOLoader />;
  }

  if (!questionary) {
    return <span>Failed to load questionary details</span>;
  }

  const steps = questionary.steps.map((step, index) => {
    const displayableQuestions = step.fields.filter((field) => {
      const definition = getQuestionaryComponentDefinition(
        field.question.dataType
      );

      return (
        (!definition.readonly ||
          field.question.dataType === DataType.SAMPLE_DECLARATION ||
          field.question.dataType === DataType.GENERIC_TEMPLATE) &&
        areDependenciesSatisfied(questionary.steps, field.question.id)
      );
    });

    const rows = displayableQuestions
      .map((answer) => {
        const renderers = getQuestionaryComponentDefinition(
          answer.question.dataType
        ).renderers;

        if (!renderers) {
          return null;
        }

        const questionElem = React.createElement<Question>(
          renderers.questionRenderer,
          answer.question
        );
        const answerElem =
          answerRenderer?.(answer) ||
          React.createElement<Answer>(renderers.answerRenderer, answer);

        const row: TableRowData = {
          label: questionElem,
          value: answerElem,
        };

        return row;
      })
      .filter((row) => row !== null) as TableRowData[];

    if (index === 0 && additionalDetails !== undefined) {
      console.log(additionalDetails);
      rows.unshift(...additionalDetails);
    }

    const stepContent = <AnswersTable rows={rows} />;

    return (
      <StepView
        title={step.topic.title}
        content={stepContent}
        key={step.topic.id}
      />
    );
  });

  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      {steps}
    </>
  );
}

export default QuestionaryDetails;
