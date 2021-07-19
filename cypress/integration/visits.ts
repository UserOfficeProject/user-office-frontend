import faker from 'faker';
import { GraphQLClient } from 'graphql-request';

faker.seed(1);

context('visits tests', () => {
  before(() => {
    // reset data and add seeds with test proposal
    cy.resetDB(true);
    cy.resetSchedulerDB(true);
    // Add co-proposer
    cy.login('officer');
    cy.contains('999999').parent().find('[title="View proposal"]').click();
    cy.get('[data-cy=toggle-edit-proposal]').click();
    cy.get('[data-cy=questionary-stepper]').contains('New proposal').click();
    cy.get('[data-cy=add-participant-button]').click();
    cy.contains('Benjamin').parent().find('[type=checkbox]').click();
    cy.get('[data-cy=assign-selected-users]').click();
    cy.get('[data-cy=co-proposers]').contains('Benjamin'); // make sure Benjamin was added
    cy.get('[data-cy=save-button]').click();
    // allocate time for the test proposal
    cy.get('[role="dialog"]').contains('Admin').click();
    cy.get('#mui-component-select-finalStatus').click();
    cy.get('[role="listbox"]').contains('Accepted').click();
    cy.get('[data-cy="is-management-decision-submitted"]').click();
    cy.get('[data-cy="save-admin-decision"]').click();
    cy.closeModal();
    cy.logout();
    const eventDate = faker.date.future().toISOString().split('T')[0];
    cy.createScheduledEvent(1, {
      startsAt: `${eventDate} 10:00`,
      endsAt: `${eventDate} 11:00`,
    });
    cy.activateBooking(1);
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  const proposalTitle = faker.lorem.words(2);

  const visitTemplateName = faker.lorem.words(2);
  const visitTemplateDescription = faker.lorem.words(3);

  const startDateQuestionTitle = 'Visit start';
  const endDateQuestionTitle = 'Visit end';

  const formTeamTtl = 'Define who is coming';
  const registerVisitTtl = 'Define your own visit';
  const individualTrainingTtl = 'Finish individual training';
  const declareShipmentTtl = 'Finish risk assessment';

  it('Should be able to create visits template', () => {
    cy.login('officer');

    cy.navigateToTemplatesSubmenu('Visit templates');

    cy.get('[data-cy=create-new-button]').click();

    cy.get('[data-cy=name] input')
      .type(visitTemplateName)
      .should('have.value', visitTemplateName);

    cy.get('[data-cy=description]').type(visitTemplateDescription);

    cy.get('[data-cy=submit]').click();

    cy.contains('New visit');

    cy.createDateQuestion(startDateQuestionTitle);
    cy.createDateQuestion(endDateQuestionTitle);
  });

  it('PI should see that he is able to form team', () => {
    cy.login({ email: 'Javon4@hotmail.com', password: 'Test1234!' });

    cy.contains(/Upcoming experiments/i).should('exist');

    cy.testActionButton(formTeamTtl, 'active');
    cy.testActionButton(registerVisitTtl, 'inactive');
    cy.testActionButton(individualTrainingTtl, 'inactive');
    cy.testActionButton(declareShipmentTtl, 'inactive');
  });

  it('Non-visitor should not see upcoming events', () => {
    cy.login({ email: 'david@teleworm.us', password: 'Test1234!' });

    cy.contains(/Upcoming experiments/i).should('not.exist');
  });

  it('Co-proposer should be able to form team', () => {
    cy.login({ email: 'ben@inbox.com', password: 'Test1234!' });

    cy.contains(/Upcoming experiments/i).should('exist');

    // test that that actions has correct state
    cy.testActionButton(formTeamTtl, 'active');
    cy.testActionButton(registerVisitTtl, 'inactive');
    cy.testActionButton(individualTrainingTtl, 'inactive');
    cy.testActionButton(declareShipmentTtl, 'inactive');

    // create visit
    cy.get(`[title="${formTeamTtl}"]`).click();

    // test error messages
    cy.get('[type="submit"]').click();
    cy.contains(/Please add visitors/i);
    cy.contains(/Please select the team lead/i);

    // add visitors
    cy.get('[data-cy=add-participant-button]').click();
    cy.contains('Beckley').parent().find('[type=checkbox]').click();
    cy.contains('Carlsson').parent().find('[type=checkbox]').click();
    cy.contains('Dawson').parent().find('[type=checkbox]').click();
    cy.get('[data-cy=assign-selected-users]').click();

    // specify team lead
    cy.get('[data-cy=team-lead-user-dropdown]').click();
    cy.get('[role="listbox"]')
      .contains(/Beckley/i)
      .click();

    cy.get('[data-cy=create-visit-button]').click();

    cy.reload();

    // test again that that actions has correct state
    cy.testActionButton(formTeamTtl, 'completed');
    cy.testActionButton(registerVisitTtl, 'active');
    cy.testActionButton(individualTrainingTtl, 'active');
    cy.testActionButton(declareShipmentTtl, 'active');
  });

  it('Visitor should only see permitted actions', () => {
    cy.login({ email: 'david@teleworm.us', password: 'Test1234!' });

    cy.contains(/Upcoming experiments/i).should('exist');

    cy.testActionButton(formTeamTtl, 'invisible');
    cy.testActionButton(registerVisitTtl, 'active');
    cy.testActionButton(individualTrainingTtl, 'active');
    cy.testActionButton(declareShipmentTtl, 'invisible');
  });

  it('PI should be able to register for a visit', () => {
    cy.login({ email: 'Javon4@hotmail.com', password: 'Test1234!' });

    // test if the actions are available after co-proposer defined the team
    cy.testActionButton(formTeamTtl, 'completed');
    cy.testActionButton(registerVisitTtl, 'active');
    cy.testActionButton(individualTrainingTtl, 'active');
    cy.testActionButton(declareShipmentTtl, 'active');

    cy.get(`[title="${registerVisitTtl}"]`).click();

    cy.contains(startDateQuestionTitle).parent().click().type('2021-07-20');
    cy.contains(endDateQuestionTitle).parent().click().type('2021-07-21');

    cy.get('[data-cy=save-and-continue-button]').click();

    cy.get('[data-cy=submit-visit-registration-button]').click();

    cy.get('[data-cy="confirm-ok"]').click();

    cy.reload();

    cy.testActionButton(registerVisitTtl, 'completed');
  });

  // it('should see scheduled proposal', () => {
  //   // check dashboard again
  //   cy.contains(/Upcoming events/i).should('exist');
  // });

  // it('Should be able to create visit', () => {
  //   cy.login('user');

  //   cy.createProposal(proposalTitle);

  //   cy.contains('Submit').click();

  //   cy.contains('OK').click();

  //   cy.contains('Dashboard').click();

  //   cy.get(`[title="${formTeamActionTitle}"]`).should('not.be.disabled');

  //   cy.get('[title="Define your own visit"] button').should('be.disabled');
  //   cy.get('[title="Finish individual training"] button').should('be.disabled');
  //   cy.get('[title="Finish risk assessment"] button').should('be.disabled');

  //   cy.get(`[title="${formTeamActionTitle}"]`).click();

  //   cy.get('[type="submit"]').click();
  //   cy.contains(/Please add visitors/i);
  //   cy.contains(/Please select the team lead/i);

  //   cy.get('[title="Add Visitors"]').click();

  //   cy.contains(/Beckley/i)
  //     .parent()
  //     .find('[type="checkbox"]')
  //     .click();

  //   cy.contains(/Carlsson/i)
  //     .parent()
  //     .find('[type="checkbox"]')
  //     .click();

  //   cy.get('[data-cy="assign-selected-users"]').click();

  //   cy.contains(/Beckley/i);
  //   cy.contains(/Carlsson/i);

  //   cy.contains(/Please add visitors/i).should('not.exist');

  //   cy.get('#mui-component-select-teamLeadUserId').click();

  //   cy.get('[role="listbox"]')
  //     .contains(/Beckley/i)
  //     .click();

  //   cy.contains('Create').click();
  // });

  // it('Visitor should be able to see proposal', () => {
  //   cy.login({ email: 'ben@inbox.com', password: 'Test1234!' });

  //   cy.contains(proposalTitle);
  // });

  // it('Should be able to delete visit', () => {
  //   cy.login('user');

  //   cy.contains('Visits').click();

  //   cy.contains(proposalTitle).parent().get("[title='Delete visit']").click();

  //   cy.contains('OK').click();

  //   cy.notification({ variant: 'success', text: 'Visit deleted' });

  //   cy.should('not.contain', proposalTitle);
  // });
});
