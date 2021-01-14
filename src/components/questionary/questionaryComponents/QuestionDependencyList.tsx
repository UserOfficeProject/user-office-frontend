import { Field, FieldArray } from 'formik';
import React from 'react';

import FormikUICustomDependencySelector from 'components/common/FormikUICustomDependencySelector';

const QuestionDependencyList = (props: any) => {
  return (
    <FieldArray name="dependencies">
      {() =>
        props.field.dependencies?.map((dependency: any, i: number) => {
          return (
            <Field
              name={`dependencies.${i}`}
              key={dependency.dependencyId}
              component={FormikUICustomDependencySelector}
              template={props.template}
              dependency={dependency}
              margin="normal"
              fullWidth
              inputProps={{ 'data-cy': 'dependencies' }}
            />
          );
        })
      }
    </FieldArray>
  );
};

export default QuestionDependencyList;
