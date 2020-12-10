import { BasicComponentProps } from 'components/proposal/IBasicComponentProps';
import { Answer } from 'generated/sdk';
import { SubmitActionDependencyContainer } from 'hooks/questionary/useSubmitActions';

function QuestionaryComponentShipmentBasis(props: BasicComponentProps) {
  // TODO implement this
  // const {
  //   answer: {
  //     question: { proposalQuestionId, question },
  //   },
  // } = props;

  // const sampleContext = useContext(SampleContext);

  // const [title, setTitle] = useState(sampleContext.state?.sample.title);

  // if (!sampleContext.state) {
  //   return null;
  // }

  // const { dispatch, state } = sampleContext;

  // return (
  //   <>
  //     <Typography>{question}</Typography>
  //     <Field
  //       name={proposalQuestionId}
  //       label={(props.answer.config as SampleBasisConfig).titlePlaceholder}
  //       inputProps={{
  //         onChange: (event: ChangeEvent<HTMLInputElement>) => {
  //           setTitle(event.currentTarget.value);
  //         },
  //         onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
  //           if (event.key === 'Enter') {
  //             event.preventDefault();

  //             return false;
  //           }
  //         },
  //         onBlur: () => {
  //           dispatch({
  //             type: EventType.SAMPLE_MODIFIED,
  //             payload: { ...state.sample, title: title },
  //           });
  //         },
  //       }}
  //       required
  //       fullWidth
  //       component={TextField}
  //       data-cy="title-input"
  //     />
  //   </>
  // );
  return null;
}

const shipmentBasisPresubmit = (answer: Answer) => async ({
  api,
  dispatch,
  state,
}: SubmitActionDependencyContainer) => {
  // TODO implement this
  // const sample = (state as SampleSubmissionState).sample;
  // const title = sample.title;
  // if (sample.id > 0) {
  //   const result = await api.updateSample({
  //     title: title,
  //     sampleId: sample.id,
  //   });
  //   if (result.updateSample.sample) {
  //     dispatch({
  //       type: EventType.SAMPLE_UPDATED,
  //       payload: {
  //         sample: result.updateSample.sample,
  //       },
  //     });
  //   }
  // } else {
  //   const result = await api.createSample({
  //     title: title,
  //     templateId: state.templateId,
  //     proposalId: sample.proposalId,
  //     questionId: sample.questionId,
  //   });
  //   if (result.createSample.sample) {
  //     dispatch({
  //       type: EventType.SAMPLE_CREATED,
  //       payload: {
  //         sample: result.createSample.sample,
  //       },
  //     });
  //   }
  // }
};

export { QuestionaryComponentShipmentBasis, shipmentBasisPresubmit };
