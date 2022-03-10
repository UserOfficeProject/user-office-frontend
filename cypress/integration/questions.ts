import faker from 'faker';

import { DataType } from '../../src/generated/sdk';
import initialDBData from '../support/initialDBData';

context('Questions tests', () => {
  beforeEach(() => {
    cy.resetDB(true);
  });

  const textQuestion = faker.lorem.words(2);
  const samplesQuestion = initialDBData.questions.addSamples.text;

  it('User officer search questions', () => {
    cy.login('officer');
    cy.visit('/');

    cy.navigateToTemplatesSubmenu('Proposal');

    cy.contains(initialDBData.template.name)
      .parent()
      .get("[aria-label='Edit']")
      .click();

    cy.createTextQuestion(textQuestion, {
      isRequired: true,
      isMultipleLines: true,
    });

    cy.get('[data-cy=officer-menu-items]').contains('Questions').click();

    cy.get('[data-cy=category-dropdown]').click();
    cy.get('[role=presentation] ').contains('Sample declaration').click();

    cy.contains(textQuestion).should('not.exist');

    cy.get('[data-cy=category-dropdown]').click();
    cy.get('[role=presentation]').contains('Proposal').click();

    cy.get('[data-cy=type-dropdown]').click();
    cy.get('[role=presentation] ').contains('Boolean').click();

    cy.contains(textQuestion).should('not.exist');

    cy.get('[data-cy=type-dropdown]').click();
    cy.get('[role=presentation]')
      .find(`[data-value="${DataType.TEXT_INPUT}"]`)
      .click();

    cy.contains(textQuestion);

    const modifiedQuestion = textQuestion.split('').reverse().join();
    cy.get('[data-cy=search-input] input')
      .clear()
      .type(`${modifiedQuestion}{enter}`);

    cy.contains(textQuestion).should('not.exist');

    cy.get('[data-cy=search-input] input')
      .clear()
      .type(`${textQuestion}{enter}`);

    cy.contains(textQuestion);
  });

  it('Search text should be trimmed', () => {
    cy.login('officer');
    cy.visit('/');

    cy.get('[data-cy=officer-menu-items]').contains('Questions').click();

    const samplesQuestionWithSpaces = '   ' + samplesQuestion + '   ';

    cy.get('[data-cy=search-input] input')
      .clear()
      .type(`${samplesQuestionWithSpaces}{enter}`);

    cy.get('[data-cy=questions-table]')
      .contains(samplesQuestion)
      .should('exist');
  });
});
