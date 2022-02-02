const expressionToFunction = (expression: string) =>
  new Function('x', `return ${expression}`);

export default expressionToFunction;
