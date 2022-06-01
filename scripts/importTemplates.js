const grapqlExportUrl = process.env.GRAPHQL_EXPORT_URL;
const grapqlImportUrl = process.env.GRAPHQL_IMPORT_URL;

const exportToken = process.env.EXPORT_TOKEN;
const importToken = process.env.IMPORT_TOKEN;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axiosDev = require('axios').create({
  headers: {
    Authorization: importToken,
  },
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axiosProd = require('axios').create({
  headers: {
    Authorization: exportToken,
  },
});

const getTemplates = `
query {
    templates(filter: {
      group: PROPOSAL,
      isArchived: false,
    }) {
        templateId
    }
}
`;

const exportTemplate = (n) =>
  `
  query {
    template(templateId: ${n}) {
        json
    }
  }
  
`;

const validateTemplate = (json) =>
  `
  mutation {
    validateTemplateImport(templateAsJson: ${json}) {
      validationResult {
        json
        version
        exportDate
        validationData {
          isValid
          errors
          questionComparisons {
            newQuestion {
              id
            }
            status
            conflictResolutionStrategy
          
          }
          subTemplateValidationData {
            errors
            
          }
      }
    }
  }
  }
  
`;

const importTemplate = `
  mutation importTemplate(
    $templateAsJson: String!
    $conflictResolutions: [ConflictResolution!]!
    $subTemplatesConflictResolutions: [[ConflictResolution!]!]!
  ) {
    importTemplate(
      templateAsJson: $templateAsJson
      conflictResolutions: $conflictResolutions
      subTemplatesConflictResolutions: $subTemplatesConflictResolutions
    ) {
      template {
        templateId
      }
      rejection {
        reason
        context
        exception
      }
    }
  }
  


`;

async function main() {
  console.log(axiosDev.headers);

  const result = await axiosProd.post(grapqlExportUrl, {
    query: getTemplates,
  });

  console.log('Templates to import: ');
  console.log(result.data.data.templates);

  const templates = result.data.data.templates;

    console.log('Getting template as json...');
    const result = await axiosProd
      .post(grapqlExportUrl, {
        query: exportTemplate(template.templateId),
      })
      .catch((e) => console.log(e));
    let json;
    try {
      json = result.data.data.template.json;
    } catch (Exception) {
      console.log(`Problem getting template: ${template.templateId}`);
      console.log(JSON.stringify(result.data.errors[0]));
      console.log('Skipping template...');

      continue;
    }

    console.log('Processing template...');
    console.log('------------------------------------------------------------');
    console.log(JSON.parse(json));

    console.log('Validating template...');
    const query = validateTemplate(JSON.stringify(json));
    console.log(query);
    const validateTemplateResult = await axiosDev
      .post(grapqlImportUrl, {
        query: query,
      })
      .catch((e) => console.log(e));

    const validationResult =
      validateTemplateResult.data.data.validateTemplateImport.validationResult;
    console.log(
      `validation result: ${JSON.stringify(validationResult, null, 2)}`
    );

    const templateConflictResolution =
      validationResult.validationData.questionComparisons.map((comparison) => {
        const question = comparison.newQuestion;

        return {
          itemId: question.id,
          strategy: 'USE_NEW',
        };
      });

    let subTemplatesConflictResolutions;
    if (
      validationResult.validationData.subTemplateValidationData !== undefined &&
      validationResult.validationData.subTemplateValidationData !== null
    ) {
      subTemplatesConflictResolutions =
        validationResult.validationData.subTemplateValidationData.map(
          (template) => {
            template.questionComparisons = template.questionComparisons ?? [];

            return template.questionComparisons.map((comparison) => {
              const question = comparison.newQuestion;

              return {
                itemId: question.id,
                strategy: 'USE_NEW',
              };
            });
          }
        );
    }

    console.log('Importing template...');
    const importTemplateResult = await axiosDev
      .post(grapqlImportUrl, {
        query: importTemplate,
        variables: {
          conflictResolutions: templateConflictResolution,
          subTemplatesConflictResolutions: subTemplatesConflictResolutions,
          templateAsJson: json,
        },
      })
      .catch((e) => console.log('Failed to import template, \n' + e));

    console.log('Template import result:');
    console.log(importTemplateResult.data.data);
    console.log('------------------------------------------------------------');
}

main();
