import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';
import { Field, FieldArray } from 'formik';
import React from 'react';

import FormikUICustomDependencySelector from 'components/common/FormikUICustomDependencySelector';
import {
  EvaluatorOperator,
  QuestionTemplateRelation,
  Template,
} from 'generated/sdk';

type QuestionDependencyListProps = {
  template: Template;
  field: QuestionTemplateRelation;
};

const QuestionDependencyList: React.FC<QuestionDependencyListProps> = ({
  template,
  field,
}) => {
  return (
    <>
      <FieldArray name="dependencies">
        {({ remove, push }) => (
          <>
            <Box display="flex" flexDirection="row-reverse">
              <Tooltip title="Add dependency">
                <IconButton
                  onClick={() =>
                    push({
                      dependencyId: '',
                      questionId: field.question.proposalQuestionId,
                      dependencyNaturalKey: '',
                      condition: {
                        condition: EvaluatorOperator.EQ,
                        params: '',
                      },
                    })
                  }
                  data-cy="add-dependency-button"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {field.dependencies?.map((dependency, i) => {
              return (
                <Box key={`${dependency?.dependencyId}_${i}`} mb={1}>
                  <Grid container>
                    <Grid item xs={11}>
                      <Field
                        name={`dependencies.${i}`}
                        component={FormikUICustomDependencySelector}
                        template={template}
                        dependency={dependency}
                        margin="normal"
                        fullWidth
                        inputProps={{ 'data-cy': 'dependencies' }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={(): void => {
                          remove(i);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </>
        )}
      </FieldArray>
    </>
  );
};

export default QuestionDependencyList;
