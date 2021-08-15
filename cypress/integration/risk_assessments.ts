import faker from 'faker';

faker.seed(1);

const coProposerName = 'Benjamin';
const coProposerEmail = 'ben@inbox.com';
const visitorName = 'Dawson';
const visitorEmail = 'david@teleworm.us';

const questionTitle = faker.lorem.words(3);
const answer = faker.lorem.words(3);

const samplesTemplateName = faker.lorem.words(3);
const samplesTopicName = faker.lorem.words(3);
const samplesTitle = faker.lorem.words(3);

const proposalTitle = 'Test proposal';
const riskAssessmentButtonTitle = 'Finish risk assessment';

context('visits tests', () => {
  before(() => {
    cy.viewport(1920, 1080);
    // reset data and add seeds with test proposal
    cy.resetDB(true);
    cy.resetSchedulerDB(true);
    // Add co-proposer
    cy.login('officer');
    /*
    cy.createTemplate('sample', samplesTemplateName, '');

    cy.navigateToTemplatesSubmenu('Proposal templates');
    cy.contains('default template').parent().get("[title='Edit']").click();
    cy.createTopic(samplesTopicName);
    cy.createSampleQuestion('Samples question', samplesTemplateName);

    cy.visit('/');
*/
    cy.contains('999999').parent().find('[title="View proposal"]').click();
    cy.get('[data-cy=toggle-edit-proposal]').click();
    /*
    cy.contains(samplesTopicName).click();
    cy.get('[data-cy=add-button]').click();
    cy.get('[data-cy=title-input] input').type(samplesTitle);
    cy.get(
      '[data-cy=sample-declaration-modal] [data-cy=save-and-continue-button]'
    ).click();
    cy.finishedLoading();
*/
    cy.get('[data-cy=questionary-stepper]').contains('New proposal').click();
    cy.get('[data-cy=add-participant-button]').click();
    cy.contains(coProposerName).parent().find('[type=checkbox]').click();
    cy.get('[data-cy=assign-selected-users]').click();
    cy.get('[data-cy=co-proposers]').contains(coProposerName); // make sure co proposer was added
    cy.get('[data-cy=save-and-continue-button]').click();
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

    cy.login('user');
    cy.defineExperimentTeam({
      proposalTitle,
      usersEmails: [coProposerEmail, visitorEmail],
      teamLead: coProposerName,
    });
    cy.logout();
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  it('Should be able to create risk assessments template', () => {
    cy.login('officer');

    cy.createTemplate('riskAssessment');

    cy.createTextQuestion(questionTitle);
  });

  it('PI should see risk assessment button ', () => {
    cy.login({ email: 'Javon4@hotmail.com', password: 'Test1234!' });

    cy.testActionButton(riskAssessmentButtonTitle, 'active');
  });

  it('Co-proposer should see risk assessment button ', () => {
    cy.login({ email: 'ben@inbox.com', password: 'Test1234!' });

    cy.testActionButton(riskAssessmentButtonTitle, 'active');
  });

  it('Visitor should not see risk assessment button', () => {
    cy.login({ email: 'david@teleworm.us', password: 'Test1234!' });

    cy.testActionButton(riskAssessmentButtonTitle, 'invisible');
  });

  it('Should be able to do risk assessment', () => {
    cy.login('user');
    cy.get(`[title='${riskAssessmentButtonTitle}']`).click();
    cy.get('[data-cy=samples-dropdown]').click();
    cy.get('[role=listbox]')
      .contains(/My sample title/i)
      .click();

    cy.get('body').type('{esc}');
    cy.contains(questionTitle).then(($elem: any) => {
      cy.get(`#${$elem.attr('for')}`).type(answer);
    });

    cy.get('[data-cy=save-and-continue-button]').click();

    cy.notification({ variant: 'success', text: 'Saved' });
    cy.contains(questionTitle).should('exist');
    cy.contains(answer).should('exist');

    cy.get('[data-cy=submit-riskAssessment-button]').click();

    cy.get('[data-cy="confirm-ok"]').click();
  });

  it('Co-proposer should see that risk assessment is completed', () => {
    cy.login({ email: 'ben@inbox.com', password: 'Test1234!' });

    cy.testActionButton(riskAssessmentButtonTitle, 'completed');
  });
});
