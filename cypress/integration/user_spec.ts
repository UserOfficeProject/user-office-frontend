import faker from 'faker';
import { DateTime } from 'luxon';

context('User tests', () => {
  // Login details
  const password = 'aslaksjdajsl9#ASdADSlk!';

  // Personal details
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const birthDate = DateTime.fromJSDate(faker.date.past(80, '2002-01-01'));

  //Organization detail
  const department = faker.commerce.department();
  const position = faker.name.jobTitle();

  //Contact details
  const email = faker.internet.email();
  const telephone = faker.phone.phoneNumber('0##########');

  beforeEach(() => {
    cy.resetDB();

    cy.visit('/SignUp?code=WRMVXa');
  });

  it('A user should be able to login and out', () => {
    cy.createUser({
      user_title: faker.name.prefix(),
      firstname: firstName,
      lastname: lastName,
      password: password,
      orcidHash: 'WRMVXa',
      gender: '-',
      nationality: 1,
      birthdate: birthDate,
      organisation: 1,
      department: department,
      position: position,
      email: email,
      telephone: telephone,
    });
    cy.contains('Have an account? Sign In').click();

    cy.get('[data-cy=input-email] input')
      .type(email)
      .should('have.value', email);

    cy.get('[data-cy=input-password] input')
      .type(password)
      .should('have.value', password);

    cy.get('[data-cy=submit]').click();

    cy.contains('My proposals');

    cy.logout();

    cy.contains('Sign in');
  });
});
