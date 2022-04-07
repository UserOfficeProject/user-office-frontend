import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export interface StepViewProps {
  title: string;
  content: JSX.Element;
}

export function StepView(props: StepViewProps) {
  const { title, content } = props;

  return (
    <Accordion
      defaultExpanded
      disableGutters
      elevation={0}
      square
      sx={(theme) => ({
        ':before': { display: 'none' },
        border: `1px solid ${theme.palette.grey[200]}`,
      })}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={(theme) => ({
          background: theme.palette.grey[100],
        })}
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  );
}
