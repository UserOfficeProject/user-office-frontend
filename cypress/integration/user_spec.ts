import faker from 'faker';

context('User tests', () => {
  before(() => {
    cy.resetDB();
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/SignUp?code=WRMVXa');
  });

  // Login details
  const password = 'aslaksjdajsl9#ASdADSlk!';

  // Personal details
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const birthDate = faker.date
    .past(80, '2002-01-01')
    .toISOString()
    .slice(0, 10);

  //Organization detail
  const department = faker.commerce.department();
  const position = faker.name.jobTitle();

  //Contact details
  const email = faker.internet.email();
  const telephone = faker.phone.phoneNumber('0##########');

  it('A user should be able to create a new account with mandatory fields only', () => {
    cy.get('[data-cy=email] input').type(email).should('have.value', email);

    cy.get('[data-cy=password] input')
      .type(password)
      .should('have.value', password);

    cy.get('[data-cy=confirmPassword] input')
      .type(password)
      .should('have.value', password);

    // Personal details
    cy.get('#user_title-input').click();
    cy.contains('Prof.').click();
    cy.get('[data-cy=firstname] input')
      .clear()
      .type(firstName)
      .should('have.value', firstName);

    cy.get('[data-cy=lastname] input')
      .clear()
      .type(lastName)
      .should('have.value', lastName);

    cy.get('#gender-input').click();

    cy.contains('Male').click();

    cy.get('#nationality-input').click();

    cy.contains('Swedish').click();

    cy.get('[data-cy=birthdate] input')
      .type(birthDate)
      .should('have.value', birthDate);

    //Organization details
    cy.get('#organisation-input').click();

    cy.contains('Lund University').click();

    cy.get('[data-cy=department] input')
      .type(department)
      .should('have.value', department);

    cy.get('[data-cy=position] input')
      .type(position)
      .should('have.value', position);

    //Contact details
    cy.get('[data-cy=telephone] input')
      .type(telephone)
      .blur()
      .should('have.value', telephone);

    cy.get('[data-cy=privacy-agreement] input').click();

    cy.get('[data-cy=cookie-policy] input').click();

    //Submit
    cy.get('[data-cy=submit]').click();

    cy.contains('Click here for sign in').click();
    //Check redirect to Sign in page
    cy.contains('Sign in');
  });

  it('A user should be able to login and out', () => {
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

  it('A user should be able to create a new account by filling in optional fields also', () => {
    // Login details
    const password = 'aslaksjdajsl9#ASdADSlk!';

    // Personal details
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const middleName = faker.name.firstName();
    const preferredName = faker.name.firstName();
    const birthDate = faker.date
      .past(80, '2002-01-01')
      .toISOString()
      .slice(0, 10);

    //Organization detail
    const department = faker.commerce.department();
    const position = faker.name.jobTitle();

    //Contact details
    const email = faker.internet.email();
    const telephone = faker.phone.phoneNumber('0##########');
    const telephoneAlt = faker.phone.phoneNumber('0##########');

    cy.get('[data-cy=email] input').type(email).should('have.value', email);

    cy.get('[data-cy=password] input')
      .type(password)
      .should('have.value', password);

    cy.get('[data-cy=confirmPassword] input')
      .type(password)
      .should('have.value', password);

    // Personal details
    cy.get('#user_title-input').click();
    cy.contains('Prof.').click();
    cy.get('[data-cy=firstname] input')
      .clear()
      .type(firstName)
      .should('have.value', firstName);

    cy.get('[data-cy=middlename] input')
      .type(middleName)
      .should('have.value', middleName);
    cy.get('[data-cy=lastname] input')
      .clear()
      .type(lastName)
      .should('have.value', lastName);

    cy.get('[data-cy=preferredname] input')
      .type(preferredName)
      .should('have.value', preferredName);

    cy.get('#gender-input').click();

    cy.contains('Male').click();

    cy.get('#nationality-input').click();

    cy.contains('Swedish').click();

    cy.get('[data-cy=birthdate] input')
      .type(birthDate)
      .should('have.value', birthDate);

    //Organization details
    cy.get('#organisation-input').click();

    cy.contains('Lund University').click();

    cy.get('[data-cy=department] input')
      .type(department)
      .should('have.value', department);

    cy.get('[data-cy=position] input')
      .type(position)
      .should('have.value', position);

    //Contact details
    cy.get('[data-cy=telephone] input')
      .type(telephone)
      .should('have.value', telephone);

    cy.get('[data-cy=telephone-alt] input')
      .type(telephoneAlt)
      .should('have.value', telephoneAlt);

    cy.get('[data-cy=privacy-agreement] input').click();

    cy.get('[data-cy=cookie-policy] input').click();

    //Submit
    cy.get('[data-cy=submit]').click();

    cy.contains('Click here for sign in').click();
    //Check redirect to Sign in page
    cy.contains('Sign in');
  });
});
