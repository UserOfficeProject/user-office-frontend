context('Mobile views tests', () => {
  before(() => {
    cy.resetDB();
  });

  beforeEach(() => {
    cy.viewport('iphone-x');
  });

  it('A user officer should not see sidebar menu by default on mobile if not opened but be able to open it', () => {
    cy.login('officer');

    cy.finishedLoading();

    cy.get('[data-cy="officer-proposals-table"]').should('exist');

    cy.get('[data-cy="officer-menu-items"]').should('not.exist');

    cy.get('[data-cy="open-drawer"]').click();

    cy.get('[data-cy="officer-menu-items"]').should('exist');
  });
});
