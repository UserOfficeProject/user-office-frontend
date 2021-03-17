import { Question } from 'generated/sdk';

export type BasicQuestion = Pick<
  Question,
  'id' | 'categoryId' | 'naturalKey' | 'dataType' | 'question' | 'config'
>;
