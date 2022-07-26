import initialDBData from '../support/initialDBData';

context('User tests', () => {
  // Login details
  const { email, password } = initialDBData.users.user1;

  beforeEach(() => {
    cy.resetDB();

    cy.visit('/SignUp?code=WRMVXa');
  });

  it('A user should be able to login and out', () => {
    cy.get('[data-cy=input-email] input')
      .type(email)
      .should('have.value', email);

    cy.get('[data-cy=input-password] input')
      .type(password)
      .should('have.value', password);

    cy.get('[data-cy=submit]').click();

    cy.get('[data-cy=continue]').click();

    cy.contains('My proposals');

    cy.logout();
  });
});
