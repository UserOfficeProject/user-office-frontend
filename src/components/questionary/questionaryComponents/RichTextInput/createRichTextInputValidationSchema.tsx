import * as Yup from 'yup';

import { QuestionaryComponentDefinition } from 'components/questionary/QuestionaryComponentRegistry';
import { RichTextInputConfig } from 'generated/sdk';

const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;

  return txt.value;
};

const stripHtmlTags = (htmlString: string) => {
  const decoded = decodeHtml(htmlString);

  const decodedStripped = decoded
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_')
    .trim();

  return decodedStripped;
};

export const createRichTextInputValidationSchema: QuestionaryComponentDefinition['createYupValidationSchema'] = answer => {
  let schema = Yup.string().transform(function(value: string) {
    return stripHtmlTags(value);
  });

  const config = answer.config as RichTextInputConfig;

  if (config.required) {
    schema = schema.required(`This is a required field`);
  }

  config.max &&
    (schema = schema.max(
      config.max,
      `Value must be at most ${config.max} characters`
    ));

  return schema;
};
