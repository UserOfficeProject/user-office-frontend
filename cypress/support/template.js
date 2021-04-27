import faker from 'faker';

const navigateToTemplatesSubmenu = (submenuName) => {
  cy.contains('Templates').click();
  cy.get(`[title='${submenuName}']`).first().click();
};

const createTopic = (title) => {
  cy.get('[data-cy=show-more-button]').click();

  cy.get('[data-cy=add-topic-menu-item]').click();

  cy.wait(500);

  cy.get('[data-cy=topic-title]').last().click();

  cy.get('[data-cy=topic-title-input]').last().clear().type(`${title}{enter}`);
};

function createTemplate(type, title, description) {
  const templateTitle = title || faker.random.words(2);
  const templateDescription = description || faker.random.words(3);

  const typeToMenuTitle = new Map();
  typeToMenuTitle.set('proposal', 'Proposal templates');
  typeToMenuTitle.set('sample', 'Sample declaration templates');
  typeToMenuTitle.set('shipment', 'Shipment declaration templates');

  const menuTitle = typeToMenuTitle.get(type);
  if (!menuTitle) {
    throw new Error(`Type ${type} not supported`);
  }

  cy.navigateToTemplatesSubmenu(menuTitle);

  cy.get('[data-cy=create-new-button]').click();

  cy.get('[data-cy=name] input')
    .type(templateTitle)
    .should('have.value', templateTitle);

  cy.get('[data-cy=description]').type(templateDescription);

  cy.get('[data-cy=submit]').click();
}

function createBooleanQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Boolean').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createTextQuestion(
  title,
  isRequired,
  isMultipleLines,
  minimumCharacters
) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Text Input').click();

  cy.get('[data-cy=question]').clear().type(title);

  if (isRequired) {
    cy.contains('Is required').click();
  }

  if (isMultipleLines) {
    cy.contains('Multiple lines').click();
  }

  if (minimumCharacters !== undefined) {
    cy.get('[data-cy=max]').type(minimumCharacters.toString());
  }

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }])
    .wait(500);

  cy.finishedLoading();
}

function createDateQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Date').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Is required').click();

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createMultipleChoiceQuestion(title, option1, option2, option3) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Multiple choice').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Radio').click();

  cy.contains('Dropdown').click();

  cy.contains('Is multiple select').click();

  cy.contains('Items').click();

  cy.get('[data-cy=add-answer-button]').closest('button').click();
  cy.get('[placeholder=Answer]').type(option1);
  cy.get('[title="Save"]').click();

  cy.get('[data-cy=add-answer-button]').closest('button').click();
  cy.get('[placeholder=Answer]').type(option2);
  cy.get('[title="Save"]').click();

  cy.get('[data-cy=add-answer-button]').closest('button').click();
  cy.get('[placeholder=Answer]').type(option3);
  cy.get('[title="Save"]').click();

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createFileUploadQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add File Upload').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createNumberInputQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Number').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createIntervalQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Interval').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

const createSampleQuestion = (
  question,
  templateName,
  minEntries,
  maxEntries
) => {
  cy.get('[data-cy=show-more-button]').last().click();

  cy.get('[data-cy=add-question-menu-item]').last().click();

  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').click();

  cy.contains('Add Sample Declaration').click();

  cy.get('[data-cy=question]')
    .clear()
    .type(question)
    .should('have.value', question);

  cy.get('[data-cy=template-id]').click();

  cy.contains(templateName).click();

  if (minEntries) {
    cy.get('[data-cy=min-entries] input').clear().type(minEntries);
  }

  if (maxEntries) {
    cy.get('[data-cy=max-entries] input').clear().type(maxEntries);
  }

  cy.contains('Save').click();
};

Cypress.Commands.add('createTemplate', createTemplate);

Cypress.Commands.add('navigateToTemplatesSubmenu', navigateToTemplatesSubmenu);

Cypress.Commands.add('createTopic', createTopic);

Cypress.Commands.add('createBooleanQuestion', createBooleanQuestion);

Cypress.Commands.add('createSampleQuestion', createSampleQuestion);

Cypress.Commands.add('createTextQuestion', createTextQuestion);

Cypress.Commands.add('createDateQuestion', createDateQuestion);

Cypress.Commands.add(
  'createMultipleChoiceQuestion',
  createMultipleChoiceQuestion
);

Cypress.Commands.add('createFileUploadQuestion', createFileUploadQuestion);

Cypress.Commands.add('createNumberInputQuestion', createNumberInputQuestion);

Cypress.Commands.add('createIntervalQuestion', createIntervalQuestion);
