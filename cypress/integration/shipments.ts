import faker from 'faker';

faker.seed(1);

const scientistName = 'Carlsson';

const instrumentName = faker.lorem.word();

const proposalTitle = faker.lorem.words(2);

const sampleTemplateName = faker.lorem.words(2);
const sampleTemplateDescription = faker.lorem.words(3);
const sampleQuestion = faker.lorem.words(2);
const sampleTitle = faker.lorem.words(2);

const shipmentTitle = faker.lorem.words(2);
const shipmentTemplateName = faker.lorem.words(2);
const shipmentTemplateDescription = faker.lorem.words(3);

context('Shipments tests', () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.resetDB();
    cy.resetSchedulerDB();
    // Setup instrument
    cy.login('officer');
    cy.contains('People').click();
    cy.addScientistRoleToUser(scientistName);
    cy.createInstrument(
      {
        name: instrumentName,
        shortCode: instrumentName,
        description: instrumentName,
      },
      scientistName
    );
    cy.visit('/CallPage');
    cy.assignInstrumentToCall('call 1', instrumentName);
    // create template for samples
    cy.createTemplate('sample', sampleTemplateName, sampleTemplateDescription);
    // add sample question to default proposal template
    cy.visit('/');
    cy.navigateToTemplatesSubmenu('Proposal templates');
    cy.contains('default template')
      .parent()
      .get("[title='Edit']")
      .first()
      .click();
    cy.createTopic(faker.lorem.word());
    cy.createSampleQuestion(sampleQuestion, sampleTemplateName);
    cy.logout();
    // create proposal containing sample
    cy.login('user');
    cy.createProposal(proposalTitle);
    cy.get('[data-cy=add-button]').click();
    cy.get('[data-cy=title-input]').type(sampleTitle);
    cy.get(
      '[data-cy=sample-declaration-modal] [data-cy=save-and-continue-button]'
    ).click();
    cy.get('[data-cy=save-and-continue-button]').click();
    cy.contains('Submit').click();
    cy.contains('OK').click();
    cy.logout();
    // assign proposal to the instrument
    cy.login('officer');
    cy.assignInstrumentToProposal(proposalTitle, instrumentName);
    // allocate time for the proposal
    cy.allocateProposalTime({
      proposalTitle: proposalTitle,
      timeToAllocate: 2,
      submitManagementDecision: true,
    });
    // mark proposal to be scheduled
    cy.changeProposalStatus('SCHEDULING', proposalTitle);
    // create and activate booking
    const eventDate = faker.date.future().toISOString().split('T')[0];
    cy.createScheduledEvent(1, {
      startsAt: `${eventDate} 10:00`,
      endsAt: `${eventDate} 11:00`,
    });
    cy.activateBooking(1);
    cy.logout();
    // Create team
    cy.login('user');
    cy.defineExperimentTeam({
      proposalTitle: proposalTitle,
      users: ['Carlsson'],
      teamLead: 'Carlsson',
    });
    cy.logout();
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('Should be able to create shipments template', () => {
    cy.login('officer');

    cy.navigateToTemplatesSubmenu('Shipment declaration templates');

    cy.get('[data-cy=create-new-button]').click();

    cy.get('[data-cy=name] input')
      .type(shipmentTemplateName)
      .should('have.value', shipmentTemplateName);

    cy.get('[data-cy=description]').type(shipmentTemplateDescription);

    cy.get('[data-cy=submit]').click();

    cy.contains('New shipment');
  });

  it('Should be able to declare shipment', () => {
    cy.login('user');

    cy.testActionButton('Declare shipment(s)', 'neutral');

    cy.contains(proposalTitle)
      .parent()
      .find('[title="Declare shipment(s)"]')
      .click();

    cy.get('[data-cy=title-input] input')
      .click()
      .clear()
      .type(shipmentTitle)
      .should('have.value', shipmentTitle);

    cy.get('[data-cy=select-proposal-dropdown]').click();

    cy.get('[role="listbox"]').contains(proposalTitle).click();

    cy.get('[data-cy=samples-dropdown]').click();

    cy.get('[role="listbox"]').contains(sampleTitle).click();

    cy.get('body').type('{esc}');

    cy.get('[data-cy=save-and-continue-button]').click();

    cy.contains('Submit').click();

    cy.contains('OK').click();

    cy.contains(shipmentTitle);

    cy.contains('SUBMITTED', { matchCase: false });

    cy.get('[data-cy=download-shipment-label]').click();

    cy.get('[data-cy="preparing-download-dialog"]').should('exist');

    cy.get('body').type('{esc}');

    cy.testActionButton('Declare shipment(s)', 'completed');
  });
});
