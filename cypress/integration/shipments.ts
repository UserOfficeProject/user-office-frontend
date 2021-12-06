import faker from 'faker';

import initialDBData from '../support/initialDBData';

faker.seed(1);

const declareShipmentTitle = 'Declare shipment(s)';

const existingProposal = initialDBData.proposal;

const sampleTitle = /My sample title/i;
const visitor = initialDBData.users.user3;
const PI = initialDBData.users.user1;
const coProposer = initialDBData.users.user2;
const existingScheduledEventId = initialDBData.scheduledEvents.upcoming.id;

const shipmentTitle = faker.lorem.words(2);
const shipmentTemplateName = faker.lorem.words(2);
const shipmentTemplateDescription = faker.lorem.words(3);

context('Shipments tests', () => {
  beforeEach(() => {
    cy.resetDB(true);

    cy.updateProposalManagementDecision({
      proposalPk: existingProposal.id,
      managementDecisionSubmitted: true,
      managementTimeAllocation: 2,
    });
    cy.createVisit({
      team: [coProposer.id, visitor.id],
      teamLeadUserId: PI.id,
      scheduledEventId: existingScheduledEventId,
    });
    cy.viewport(1920, 1080);
  });

  it('Co-proposer should see that he can declare shipment', () => {
    cy.login('user');
    cy.visit('/');

    cy.testActionButton(declareShipmentTitle, 'neutral');
  });

  it('Visitor should see that he can declare shipment', () => {
    cy.login({ email: 'david@teleworm.us', password: 'Test1234!' });
    cy.testActionButton(declareShipmentTitle, 'neutral');
  });

  it('Should be able to create and use shipments template', () => {
    const WIDTH_ID = 'parcel_width';
    const HEIGHT_ID = 'parcel_height';
    const LENGTH_ID = 'parcel_length';
    const WEIGHT_ID = 'parcel_weight';

    cy.login('officer');
    cy.visit('/');

    cy.navigateToTemplatesSubmenu('Shipment declaration templates');

    cy.get('[data-cy=create-new-button]').click();

    cy.get('[data-cy=name] input')
      .type(shipmentTemplateName)
      .should('have.value', shipmentTemplateName);

    cy.get('[data-cy=description]').type(shipmentTemplateDescription);

    cy.get('[data-cy=submit]').click();

    cy.createNumberInputQuestion('width', { id: WIDTH_ID, isRequired: true });
    cy.createNumberInputQuestion('height', { id: HEIGHT_ID, isRequired: true });
    cy.createNumberInputQuestion('length', { id: LENGTH_ID, isRequired: true });
    cy.createNumberInputQuestion('weight', { id: WEIGHT_ID, isRequired: true });

    cy.contains('New shipment');

    cy.logout();
    cy.login('user');
    cy.visit('/');

    cy.testActionButton(declareShipmentTitle, 'neutral');

    cy.contains(existingProposal.title)
      .parent()
      .find(`[title="${declareShipmentTitle}"]`)
      .click();

    cy.get('[data-cy=title-input] input')
      .click()
      .clear()
      .type(shipmentTitle)
      .should('have.value', shipmentTitle);

    cy.get('[data-cy=select-proposal-dropdown]').click();

    cy.get('[role="listbox"]').contains(existingProposal.title).click();

    cy.get('[data-cy=samples-dropdown]').click();

    cy.get('[role="listbox"]').contains(sampleTitle).click();

    cy.get('body').type('{esc}');

    cy.get(`[data-cy=${WIDTH_ID}]`).clear().type('1').click();
    cy.get(`[data-cy=${HEIGHT_ID}]`).clear().type('1').click();
    cy.get(`[data-cy=${LENGTH_ID}]`).clear().type('1').click();
    cy.get(`[data-cy=${WEIGHT_ID}]`).clear().type('1').click();

    cy.get('[data-cy=save-and-continue-button]').click();

    cy.contains('Submit').click();

    cy.contains('OK').click();

    cy.contains(existingProposal.title);

    cy.contains('SUBMITTED', { matchCase: false });

    cy.get('[data-cy=download-shipment-label]').click();

    cy.get('[data-cy="preparing-download-dialog"]').should('exist');

    cy.get('body').type('{esc}');

    cy.visit('/');

    cy.testActionButton(declareShipmentTitle, 'completed');
  });
});
