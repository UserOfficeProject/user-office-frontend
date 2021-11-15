import {
  CreateQuestionMutationVariables,
  CreateTemplateMutationVariables,
  CreateTopicMutationVariables,
} from '../../src/generated/sdk';
import { getE2EApi } from './utils';

const navigateToTemplatesSubmenu = (submenuName: string) => {
  cy.contains('Templates').click();
  cy.get(`[title='${submenuName}']`).first().click();
};

const createTopic = (createTopicInput: CreateTopicMutationVariables) => {
  const api = getE2EApi();
  const request = api.createTopic(createTopicInput);

  cy.wrap(request);
  // cy.get('[data-cy=show-more-button]').last().click();

  // cy.get('[data-cy=add-topic-menu-item]').last().click();

  // cy.wait(500);

  // cy.get('[data-cy="topic-title-edit"]').last().click();

  // cy.get('[data-cy=topic-title-input] input')
  //   .last()
  //   .clear()
  //   .type(`${title}{enter}`);
};

const typeToMenuTitle = new Map();
typeToMenuTitle.set('proposal', 'Proposal');
typeToMenuTitle.set('sample', 'Sample declaration');
typeToMenuTitle.set('genericTemplate', 'Sub Template');
typeToMenuTitle.set('shipment', 'Shipment declaration templates');
typeToMenuTitle.set('visit', 'Visit registration');
typeToMenuTitle.set('proposalEsi', 'Experiment Safety Input (Proposal)');
typeToMenuTitle.set('sampleEsi', 'Experiment Safety Input (Sample)');

function createTemplate(createTemplateInput: CreateTemplateMutationVariables) {
  const api = getE2EApi();
  const request = api.createTemplate(createTemplateInput);

  cy.wrap(request);
}

function openQuestionsMenu() {
  cy.get('[data-cy=show-more-button]').last().click();

  cy.get('[data-cy=add-question-menu-item]').last().click();

  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').click();
}

function closeQuestionsMenu() {
  cy.get('[data-cy=questionPicker] [data-cy=close-button]').click();
}

function createQuestion(createQuestionInput: CreateQuestionMutationVariables) {
  const api = getE2EApi();
  const request = api.createQuestion(createQuestionInput);

  cy.wrap(request);
}

function createBooleanQuestion(question: string) {
  openQuestionsMenu();

  cy.contains('Add Boolean').click();

  cy.get('[data-cy=question]').clear().type(question);

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
}

function createTextQuestion(
  question: string,
  options: {
    isRequired?: boolean;
    isMultipleLines?: boolean;
    minimumCharacters?: number;
  }
) {
  openQuestionsMenu();

  cy.contains('Add Text Input').click();

  cy.get('[data-cy=question]').clear().type(question);

  if (options?.isRequired) {
    cy.contains('Is required').click();
  }

  if (options?.isMultipleLines) {
    cy.contains('Multiple lines').click();
  }

  if (options?.minimumCharacters !== undefined) {
    cy.get('[data-cy=max]').type(options.minimumCharacters.toString());
  }

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
}

function createDateQuestion(
  question: string,
  options: {
    includeTime?: boolean;
    isRequired?: boolean;
  }
) {
  openQuestionsMenu();

  cy.contains('Add Date').click();

  cy.get('[data-cy=question]').clear().type(question);

  if (options?.isRequired) {
    cy.contains('Is required').click();
  }

  if (options?.includeTime) {
    cy.contains('Include time').click();
  }

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
}

function createMultipleChoiceQuestion(
  question: string,
  options: {
    option1?: string;
    option2?: string;
    option3?: string;
    isMultipleSelect?: boolean;
    type?: 'radio' | 'dropdown';
  }
) {
  openQuestionsMenu();

  cy.contains('Add Multiple choice').click();

  cy.get('[data-cy=question]').clear().type(question);

  if (options.type === undefined || options.type === 'dropdown') {
    cy.contains('Radio').click();

    cy.contains('Dropdown').click();
  }

  if (options.isMultipleSelect === true) {
    cy.contains('Is multiple select').click();
  }

  cy.contains('Items').click();

  if (options.option1) {
    cy.get('[data-cy=add-answer-button]').closest('button').click();
    cy.get('[placeholder=Answer]').type(options.option1);
    cy.get('[title="Save"]').click();
  }

  if (options.option2) {
    cy.get('[data-cy=add-answer-button]').closest('button').click();
    cy.get('[placeholder=Answer]').type(options.option2);
    cy.get('[title="Save"]').click();
  }

  if (options.option3) {
    cy.get('[data-cy=add-answer-button]').closest('button').click();
    cy.get('[placeholder=Answer]').type(options.option3);
    cy.get('[title="Save"]').click();
  }

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
}

function createFileUploadQuestion(question: string) {
  openQuestionsMenu();

  cy.contains('Add File Upload').click();

  cy.get('[data-cy=question]').clear().type(question);

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
}

function createNumberInputQuestion(
  question: string,
  options?: { units?: string[] }
) {
  openQuestionsMenu();

  cy.contains('Add Number').click();

  cy.get('[data-cy=question]').clear().type(question);

  if (options?.units && options.units.length > 0) {
    cy.get('[data-cy=units]>[role=button]').click({ force: true });
    for (const unit of options.units) {
      cy.contains(unit).click();
    }
    cy.get('body').type('{esc}');
  }

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
}

function createIntervalQuestion(
  question: string,
  options?: { units?: string[] }
) {
  openQuestionsMenu();

  cy.contains('Add Interval').click();

  cy.get('[data-cy=question]').clear().type(question);

  if (options?.units && options.units.length > 0) {
    cy.get('[data-cy=units]>[role=button]').click({ force: true });
    for (const unit of options.units) {
      cy.contains(unit).click();
    }
    cy.get('body').type('{esc}');
  }

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
}

const createSampleQuestion = (
  question: string,
  templateName: string,
  options?: { minEntries?: number; maxEntries?: number }
) => {
  openQuestionsMenu();

  cy.contains('Add Sample Declaration').click();

  cy.get('[data-cy=question]')
    .clear()
    .type(question)
    .should('have.value', question);

  cy.get('[data-cy=template-id]').click();

  cy.contains(templateName).click();

  if (options?.minEntries) {
    cy.get('[data-cy=min-entries] input')
      .clear()
      .type(options.minEntries.toString());
  }

  if (options?.maxEntries) {
    cy.get('[data-cy=max-entries] input')
      .clear()
      .type(options.maxEntries.toString());
  }

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
};

const createGenericTemplateQuestion = (
  question: string,
  templateName: string,
  addButtonLabel: string,
  options?: { minEntries?: number; maxEntries?: number }
) => {
  openQuestionsMenu();

  cy.contains('Add Sub Template').click();

  cy.get('[data-cy=question]')
    .clear()
    .type(question)
    .should('have.value', question);

  cy.get('[data-cy=template-id]').click();

  cy.contains(templateName).click();

  if (addButtonLabel) {
    cy.get('[data-cy="addEntryButtonLabel"]').type(addButtonLabel);
  }

  if (options?.minEntries) {
    cy.get('[data-cy=min-entries] input')
      .clear()
      .type(options.minEntries.toString());
  }

  if (options?.maxEntries) {
    cy.get('[data-cy=max-entries] input')
      .clear()
      .type(options.maxEntries.toString());
  }

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
};

const createRichTextInput = (
  question: string,
  options?: { maxChars?: number }
) => {
  openQuestionsMenu();

  cy.contains('Add Rich Text Input').click();

  cy.get('[data-cy=question]')
    .clear()
    .type(question)
    .should('have.value', question);

  if (options?.maxChars) {
    cy.get('[data-cy="max"] input').clear().type(`${options.maxChars}`);
  }

  cy.contains('Save').click();

  cy.contains(question)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();

  closeQuestionsMenu();
};

Cypress.Commands.add('createTemplate', createTemplate);

Cypress.Commands.add('navigateToTemplatesSubmenu', navigateToTemplatesSubmenu);

Cypress.Commands.add('createTopic', createTopic);

Cypress.Commands.add('createQuestion', createQuestion);

Cypress.Commands.add('createBooleanQuestion', createBooleanQuestion);

Cypress.Commands.add('createTextQuestion', createTextQuestion);

Cypress.Commands.add('createDateQuestion', createDateQuestion);

Cypress.Commands.add(
  'createMultipleChoiceQuestion',
  createMultipleChoiceQuestion
);

Cypress.Commands.add('createFileUploadQuestion', createFileUploadQuestion);

Cypress.Commands.add('createNumberInputQuestion', createNumberInputQuestion);

Cypress.Commands.add('createIntervalQuestion', createIntervalQuestion);

Cypress.Commands.add('createSampleQuestion', createSampleQuestion);

Cypress.Commands.add('createRichTextInput', createRichTextInput);

Cypress.Commands.add(
  'createGenericTemplateQuestion',
  createGenericTemplateQuestion
);
