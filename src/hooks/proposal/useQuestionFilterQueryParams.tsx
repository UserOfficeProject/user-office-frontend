import { BooleanParam, StringParam, useQueryParams } from 'use-query-params';

export const useQuestionFilterQueryParams = () => {
  const [query, setQuery] = useQueryParams({
    questionId: StringParam,
    compareOperator: StringParam,
    value: StringParam,
    dataType: StringParam,
    isNot: BooleanParam,
  });
  const setQuestionFilterQuery = (filter?: {
    questionId: string;
    compareOperator: string;
    value: string;
    dataType: string;
    isNot: boolean;
  }) => {
    setQuery({
      questionId: filter?.questionId,
      compareOperator: filter?.compareOperator,
      value: filter?.value,
      dataType: filter?.dataType,
      isNot: filter?.isNot,
    });
  };

  return { questionFilterQuery: query, setQuestionFilterQuery };
};
