import faker from 'faker';

context('Samples tests', () => {
  before(() => {
    cy.resetDB(true);
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  const proposalTemplateName = faker.lorem.words(2);
  const sampleTemplateName = faker.lorem.words(2);
  const sampleTemplateDescription = faker.lorem.words(4);
  const sampleQuestion = faker.lorem.words(4);
  const proposalTitle = faker.lorem.words(2);
  const safetyComment = faker.lorem.words(5);
  const sampleTitle = faker.lorem.words(2);
  const proposalTitleUpdated = faker.lorem.words(2);
  const sampleQuestionaryQuestion = faker.lorem.words(2);
  const proposalWorkflow = {
    name: faker.random.words(2),
    description: faker.random.words(5),
  };

  it('Should be able to create proposal template with sample', () => {
    cy.login('officer');

    cy.createTemplate('sample', sampleTemplateName, sampleTemplateDescription);

    cy.contains('New sample');

    cy.createTopic(faker.lorem.word());

    cy.createTextQuestion(sampleQuestionaryQuestion);

    cy.visit('/');

    cy.createTemplate('proposal', proposalTemplateName);

    cy.createTopic('New topic');

    cy.createSampleQuestion(sampleQuestion, sampleTemplateName, {
      minEntries: 1,
      maxEntries: 2,
    });

    cy.contains(sampleQuestion); // checking if question in the topic column
  });

  it('Should be possible to change template in a call', () => {
    cy.login('officer');

    cy.createProposalWorkflow(
      proposalWorkflow.name,
      proposalWorkflow.description
    );

    cy.contains('Calls').click();

    cy.get('[title="Edit"]').click();

    cy.get('[data-cy=call-template]').click();

    cy.contains(proposalTemplateName).click();

    cy.get('[data-cy="call-workflow"]').click();
    cy.get('[role="presentation"]').contains(proposalWorkflow.name).click();

    cy.get('[data-cy="next-step"]').click();

    cy.get('[data-cy="next-step"]').click();

    cy.get('[data-cy="submit"]').click();
  });

  it('Should be able to create proposal with sample', () => {
    cy.login('user');

    cy.createProposal(proposalTitle);

    cy.get('[data-cy=add-button]').click();

    cy.get('[data-cy=title-input] input').clear();

    cy.get(
      '[data-cy=sample-declaration-modal] [data-cy=save-and-continue-button]'
    ).click();

    cy.contains('This is a required field');

    cy.get('[data-cy=title-input] input')
      .clear()
      .type(sampleTitle)
      .should('have.value', sampleTitle);

    cy.get(
      '[data-cy=sample-declaration-modal] [data-cy=save-and-continue-button]'
    ).click();

    cy.finishedLoading();

    cy.get(
      '[data-cy=sample-declaration-modal] [data-cy=save-and-continue-button]'
    ).click();

    cy.finishedLoading();

    cy.get('[data-cy="questionnaires-list-item"]').should('have.length', 1);

    cy.get('[data-cy="clone"]').click();

    cy.contains('OK').click();

    cy.get('[data-cy="questionnaires-list-item"]').should('have.length', 2);

    cy.get('[data-cy="questionnaires-list-item-completed:true"]').should(
      'have.length',
      2
    );

    cy.get('[data-cy=add-button]').should('be.disabled'); // Add button should be disabled because of max entry limit

    cy.get('[data-cy="delete"]').eq(1).click();

    cy.contains('OK').click();

    cy.get('[data-cy="questionnaires-list-item"]').should('have.length', 1);

    cy.get('[data-cy=add-button]').should('not.be.disabled');

    cy.contains('Save and continue').click();

    cy.contains('Submit').click();

    cy.contains('OK').click();
  });

  it('Should be able to clone proposal with samples', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.contains(proposalTitle).parent().find('input[type="checkbox"]').click();

    cy.get('[title="Clone proposals to call"]').click();

    cy.get('#selectedCallId-input').click();
    cy.get('[role="presentation"]').contains('call 1').click();

    cy.get('[data-cy="submit"]').click();

    cy.notification({
      variant: 'success',
      text: 'Proposal/s cloned successfully',
    });

    cy.contains(`Copy of ${proposalTitle}`)
      .parent()
      .find('[title="View proposal"]')
      .click();

    cy.contains('Edit proposal').click();

    cy.contains('New topic').click();

    cy.get('[data-cy=questionnaires-list-item]').contains(sampleTitle).click();

    cy.get('[data-cy="sample-declaration-modal"]').should('exist');
    cy.get(
      '[data-cy="sample-declaration-modal"] [data-cy=questionary-title]'
    ).contains(sampleTitle);
  });

  it('User should not be able to submit proposal with unfinished sample', () => {
    cy.login('user');

    cy.createProposal();

    cy.get('[data-cy=add-button]').click();

    cy.get('[data-cy=title-input] input')
      .clear()
      .type(sampleTitle)
      .should('have.value', sampleTitle);

    cy.get(
      '[data-cy="sample-declaration-modal"] [data-cy="save-and-continue-button"]'
    ).click();

    cy.finishedLoading();

    cy.get('body').type('{esc}');

    cy.finishedLoading();

    cy.get('[data-cy="questionnaires-list-item"]').should('have.length', 1);

    cy.get('[data-cy="save-and-continue-button"]').click();

    cy.contains('All samples must be completed');

    cy.contains(sampleTitle).click();

    cy.get(
      '[data-cy="sample-declaration-modal"] [data-cy="save-and-continue-button"]'
    ).click();

    cy.finishedLoading();

    cy.get('.Mui-error').should('not.exist');

    cy.contains('Save and continue').click();

    cy.contains('Submit').click();

    cy.contains('OK').click();
  });

  it('Officer should be able to edit proposal', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.contains(proposalTitle).parent().find('[title="View proposal"]').click();

    cy.contains('Edit proposal').click();

    cy.contains('New proposal').click();

    cy.get('[data-cy=title] input')
      .clear()
      .type(proposalTitleUpdated)
      .should('have.value', proposalTitleUpdated);

    cy.get('[data-cy=save-and-continue-button]').click();

    cy.contains('Close').click();

    cy.contains(proposalTitleUpdated);
  });

  it('Officer should be able to evaluate sample', () => {
    cy.login('officer');

    cy.contains('Sample safety').click();

    cy.get('[data-cy=samples-table]').contains('701367');

    cy.get('[data-cy=samples-table]').contains('567122');

    cy.get('[placeholder=Search]').click().clear().type('567122');

    cy.get('[data-cy=samples-table]').contains('567122');

    cy.get('[data-cy=samples-table]').should('not.contain', '701367');

    cy.get('[placeholder=Search]').click().clear();

    cy.get('[data-cy=samples-table]').contains('701367');

    cy.get('[title="Review sample"]').last().click();

    cy.get('[data-cy="safety-status"]').click();

    cy.get('[role=presentation]').contains('Low risk').click();

    cy.get('[data-cy="safety-comment"]').type(safetyComment);

    cy.get('[data-cy="submit"]').click();

    cy.wait(500);

    cy.reload();

    cy.get('[title="Review sample"]').last().click();

    cy.contains(safetyComment); // test if comment entered is present after reload

    cy.get('[data-cy="safety-status"]').click();

    cy.contains('High risk').click();

    cy.get('[data-cy="submit"]').click();

    cy.contains('HIGH_RISK'); // test if status has changed
  });

  it('Download samples is working with dialog window showing up', () => {
    cy.login('officer');

    cy.contains('Sample safety').click();

    cy.get('[data-cy=samples-table]')
      .contains(sampleTitle)
      .first()
      .closest('tr')
      .find('[data-cy="download-sample"]')
      .click();

    cy.get('[data-cy="preparing-download-dialog"]').should('exist');
    cy.get('[data-cy="preparing-download-dialog-item"]').contains(sampleTitle);
  });

  it('Should be able to download sample pdf', () => {
    cy.login('officer');

    cy.contains('Sample safety').click();

    cy.request('GET', '/download/pdf/sample/1').then((response) => {
      expect(response.headers['content-type']).to.be.equal('application/pdf');
      expect(response.status).to.be.equal(200);
    });
  });

  it('Officer should able to delete proposal with sample', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.get("input[type='checkbox']").first().click();

    cy.get("[title='Delete proposals']").first().click();

    cy.get('[data-cy="confirm-ok"]').click();

    cy.contains(proposalTitle).should('not.exist');
  });
});
