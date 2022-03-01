import initialDBData from '../support/initialDBData';

context('Event log tests', () => {
  before(() => {
    cy.resetDB(true);
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.resetDB(true);
    cy.updateProposalManagementDecision({
      proposalPk: initialDBData.proposal.id,
      statusId: 1,
      managementTimeAllocation: 5,
      managementDecisionSubmitted: true,
    });
    cy.createEsi({
      scheduledEventId: initialDBData.scheduledEvents.upcoming.id,
    });
    cy.createVisit({
      scheduledEventId: initialDBData.scheduledEvents.upcoming.id,
      team: [initialDBData.users.user1.id],
      teamLeadUserId: initialDBData.users.user1.id,
    });
  });

  describe('Experiments tests', () => {
    it('Can filter by call and instrument', () => {
      cy.login('officer');
      cy.visit('/');
      cy.get('[data-cy=officer-menu-items]').contains('Experiments').click();

      cy.get('[data-cy=call-filter]').click();
      cy.get('[role=presentation]').contains('call 1').click();
      cy.contains('1-4 of 4');

      cy.get('[data-cy=instrument-filter]').click();
      cy.get('[role=presentation]').contains('Instrument 3').click();
      cy.contains('0-0 of 0');

      cy.get('[data-cy=instrument-filter]').click();
      cy.get('[role=presentation]').contains('Instrument 2').click();
      cy.contains('0-0 of 0');

      cy.get('[data-cy=instrument-filter]').click();
      cy.get('[role=presentation]').contains('Instrument 1').click();
      cy.contains('1-4 of 4');
    });

    it('Can filter by date', () => {
      cy.login('officer');
      cy.visit('/');
      cy.get('[data-cy=officer-menu-items]').contains('Experiments').click();

      cy.get('[value=TODAY]').click();
      cy.contains('0-0 of 0');

      cy.get('[data-cy=from-date-picker] input').clear().type('2023-01-01');
      cy.get('[data-cy=to-date-picker] input').clear().type('2023-02-01');
      cy.contains('1-2 of 2');
    });

    it('Can view ESI', () => {
      cy.login('officer');
      cy.visit('/');
      cy.get('[data-cy=officer-menu-items]').contains('Experiments').click();

      cy.get('[data-cy=officer-scheduled-events-table]')
        .contains('View ESI')
        .click();
      cy.get('[role=dialog]').contains(initialDBData.proposal.title);
    });

    it('Can view visits', () => {
      cy.login('officer');
      cy.visit('/');
      cy.get('[data-cy=officer-menu-items]').contains('Experiments').click();

      cy.get('[title="Show details"]').first().click();
      cy.get('[data-cy=officer-scheduled-events-table]').contains(
        initialDBData.users.user1.lastName
      );
    });
  });
});
