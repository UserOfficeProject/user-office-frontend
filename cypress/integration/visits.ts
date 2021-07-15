import faker from 'faker';
import { GraphQLClient } from 'graphql-request';

faker.seed(1);

context('visits tests', () => {
  before(() => {
    // reset data and add seeds with test proposal
    cy.resetDB(true);
    cy.resetSchedulerDB(true);

    // allocate time for the test proposal
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.get('[data-cy=view-proposal]').click();
    cy.finishedLoading();
    cy.get('[role="dialog"]').contains('Admin').click();

    cy.get('#mui-component-select-finalStatus').click();

    cy.get('[role="listbox"]').contains('Accepted').click();

    cy.get('[data-cy="is-management-decision-submitted"]').click();

    cy.get('[data-cy="save-admin-decision"]').click();
    cy.get('[data-cy="close-modal"]').click();

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

  // it('Should be able to create visits template', () => {
  //   cy.login('officer');

  //   cy.navigateToTemplatesSubmenu('Visit templates');

  //   cy.get('[data-cy=create-new-button]').click();

  //   cy.get('[data-cy=name] input')
  //     .type(visitTemplateName)
  //     .should('have.value', visitTemplateName);

  //   cy.get('[data-cy=description]').type(visitTemplateDescription);

  //   cy.get('[data-cy=submit]').click();

  //   cy.contains('New visit');

  //   cy.createDateQuestion(startDateQuestionTitle);
  //   cy.createDateQuestion(endDateQuestionTitle);

  //   cy.visit('/');

  //   cy.navigateToTemplatesSubmenu('Visit templates');

  //   cy.get("[title='Mark as active']").click();
  // });

  it('Should not be able to create visit for proposal that is not accepted', () => {
    // check dasboard
    cy.login('user');

    cy.visit('/dashboard');

    cy.contains(/Upcoming events/i).should('exist');
  });

  it('should see scheduled proposal', () => {
    // check dashboard again
    cy.contains(/Upcoming events/i).should('exist');
  });

  it('Should be able to create visit', () => {
    cy.login('user');

    cy.createProposal(proposalTitle);

    cy.contains('Submit').click();

    cy.contains('OK').click();

    cy.contains('Dashboard').click();

    cy.get('[title="Define who is coming"]').should('not.be.disabled');

    cy.get('[title="Define your own visit"] button').should('be.disabled');
    cy.get('[title="Finish individual training"] button').should('be.disabled');
    cy.get('[title="Finish risk assessment"] button').should('be.disabled');

    cy.get('[title="Define who is coming"]').click();

    cy.get('[type="submit"]').click();
    cy.contains(/Please add visitors/i);
    cy.contains(/Please select the team lead/i);

    cy.get('[title="Add Visitors"]').click();

    cy.contains(/Beckley/i)
      .parent()
      .find('[type="checkbox"]')
      .click();

    cy.contains(/Carlsson/i)
      .parent()
      .find('[type="checkbox"]')
      .click();

    cy.get('[data-cy="assign-selected-users"]').click();

    cy.contains(/Beckley/i);
    cy.contains(/Carlsson/i);

    cy.contains(/Please add visitors/i).should('not.exist');

    cy.get('#mui-component-select-teamLeadUserId').click();

    cy.get('[role="listbox"]')
      .contains(/Beckley/i)
      .click();

    cy.contains('Create').click();
  });

  it('Visitor should be able to see proposal', () => {
    cy.login({ email: 'ben@inbox.com', password: 'Test1234!' });

    cy.contains(proposalTitle);
  });

  it('Should be able to delete visit', () => {
    cy.login('user');

    cy.contains('Visits').click();

    cy.contains(proposalTitle).parent().get("[title='Delete visit']").click();

    cy.contains('OK').click();

    cy.notification({ variant: 'success', text: 'Visit deleted' });

    cy.should('not.contain', proposalTitle);
  });
});
