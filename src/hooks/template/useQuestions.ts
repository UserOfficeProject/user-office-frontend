import { useEffect, useState } from 'react';

import { Question, QuestionsFilter } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useQuestions(filter?: QuestionsFilter) {
  const [questionsFilter, setQuestionsFilter] = useState(filter);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const api = useDataApi();

  useEffect(() => {
    setLoadingQuestions(true);
    api()
      .getQuestions({ filter: questionsFilter })
      .then((data) => {
        if (data.questions) {
          setQuestions(data.questions);
        }
        setLoadingQuestions(false);
      });
  }, [api, questionsFilter]);

  return {
    loadingQuestions,
    questions,
    setQuestions,
    setQuestionsFilter,
  };
}
