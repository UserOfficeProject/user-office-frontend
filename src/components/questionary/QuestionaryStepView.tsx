import makeStyles from '@material-ui/core/styles/makeStyles';
import { Formik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';

import { ErrorFocus } from 'components/common/ErrorFocus';
import UOLoader from 'components/common/UOLoader';
import { Answer, QuestionaryStep } from 'generated/sdk';
import {
  usePostSubmitActions,
  usePreSubmitActions,
} from 'hooks/questionary/useSubmitActions';
import {
  areDependenciesSatisfied,
  getQuestionaryStepByTopicId as getStepByTopicId,
  prepareAnswers,
} from 'models/QuestionaryFunctions';
import {
  EventType,
  QuestionarySubmissionState,
} from 'models/QuestionarySubmissionState';
import submitFormAsync from 'utils/FormikAsyncFormHandler';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

import NavigationFragment from './NavigationFragment';
import {
  createQuestionaryComponent,
  getQuestionaryComponentDefinition,
} from './QuestionaryComponentRegistry';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from './QuestionaryContext';

const useStyles = makeStyles({
  componentWrapper: {
    margin: '10px 0',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.7,
  },
});

export const createFormikConfigObjects = (
  answers: Answer[],
  state: QuestionarySubmissionState
): { validationSchema: any; initialValues: any } => {
  const validationSchema: any = {};
  const initialValues: any = {};

  answers.forEach(answer => {
    const definition = getQuestionaryComponentDefinition(
      answer.question.dataType
    );
    if (definition.createYupValidationSchema) {
      validationSchema[
        answer.question.proposalQuestionId
      ] = definition.createYupValidationSchema(answer);
      initialValues[
        answer.question.proposalQuestionId
      ] = definition.getYupInitialValue({ answer, state });
    }
  });

  return { initialValues, validationSchema };
};

export default function QuestionaryStepView(props: {
  topicId: number;
  readonly: boolean;
}) {
  const { topicId } = props;
  const classes = useStyles();

  const preSubmitActions = usePreSubmitActions();
  const postSubmitActions = usePostSubmitActions();
  const { api } = useDataApiWithFeedback();

  const { state, dispatch } = useContext(QuestionaryContext);

  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  const questionaryStep = getStepByTopicId(state.steps, topicId) as
    | QuestionaryStep
    | undefined;

  if (!questionaryStep) {
    throw new Error(
      `Could not find questionary step with topic id: ${topicId}`
    );
  }

  const activeFields = questionaryStep.fields.filter(field => {
        return areDependenciesSatisfied(
          state.steps,
          field.question.proposalQuestionId
        );
      })
    : [];

  const saveHandler = async () => {
    await Promise.all(
      preSubmitActions(activeFields).map(
        async f => await f({ state, dispatch, api: api() })
      )
    );

    const questionaryId = state.questionaryId;
    if (!questionaryId) {
      throw new Error('Missing questionaryId');
    }

    api('Saved')
      .answerTopic({
        questionaryId: questionaryId,
        answers: prepareAnswers(activeFields),
        topicId: topicId,
        isPartialSave: true,
      })
      .then(async result => {
        if (result.answerTopic.questionaryStep) {
          await Promise.all(
            postSubmitActions(result.answerTopic.questionaryStep.fields).map(
              async f => await f({ state, dispatch, api: api() })
            )
          );
          dispatch({
            type: EventType.QUESTIONARY_STEP_ANSWERED,
            payload: {
              questionaryStep: result.answerTopic.questionaryStep,
            },
          });
          dispatch({
            type: EventType.GO_STEP_FORWARD,
          });
        }
      });
  };

  if (state === null || !questionaryStep) {
    return <UOLoader style={{ marginLeft: '50%', marginTop: '100px' }} />;
  }

  const { initialValues, validationSchema } = createFormikConfigObjects(
    activeFields,
    state
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(validationSchema)}
      onSubmit={() => {}}
      enableReinitialize={true}
    >
      {formikProps => {
        const {
          submitForm,
          validateForm,
          setFieldValue,
          isSubmitting,
        } = formikProps;

        // <Prompt when={state.isDirty} message={() => getConfirmNavigMsg()} />
        return (
          <form className={props.readonly ? classes.disabled : undefined}>
            {activeFields.map(field => {
              return (
                <div
                  className={classes.componentWrapper}
                  key={field.question.proposalQuestionId}
                >
                  {createQuestionaryComponent({
                    answer: field,
                    formikProps,
                    onComplete: (newValue: Answer['value']) => {
                      if (field.value !== newValue) {
                        dispatch({
                          type: EventType.FIELD_CHANGED,
                          payload: {
                            id: field.question.proposalQuestionId,
                            newValue: newValue,
                          },
                        });
                        setFieldValue(
                          field.question.proposalQuestionId,
                          newValue,
                          true
                        );
                      }
                    },
                  })}
                </div>
              );
            })}
            <NavigationFragment
              disabled={props.readonly}
              back={{
                callback: () => {
                  dispatch({ type: EventType.BACK_CLICKED });
                },
                disabled: state.stepIndex === 0,
              }}
              reset={{
                callback: () => dispatch({ type: EventType.RESET_CLICKED }),
                disabled: !state.isDirty,
              }}
              save={
                questionaryStep.isCompleted
                  ? undefined
                  : {
                      callback: saveHandler,
                      disabled: !state.isDirty,
                    }
              }
              saveAndNext={{
                callback: () => {
                  submitFormAsync(submitForm, validateForm).then(
                    (isValid: boolean) => {
                      if (isValid) {
                        dispatch({
                          type: EventType.SAVE_AND_CONTINUE_CLICKED,
                          payload: { answers: activeFields, topicId: topicId },
                        });
                      }
                    }
                  );
                },
              }}
              isLoading={isSubmitting}
            />
            <ErrorFocus />
          </form>
        );
      }}
    </Formik>
  );
}
