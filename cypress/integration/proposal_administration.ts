import faker from 'faker';

context('Proposal administration tests', () => {
  before(() => {
    cy.resetDB();
  });

  beforeEach(() => {
    cy.viewport(1100, 900);
    cy.visit('/');
  });

  const proposalName1 = faker.random.words(3);
  const proposalName2 = faker.random.words(3);
  const proposalFixedName = 'Aaaaaaaaa test proposal title';

  const textUser = faker.random.words(5);
  const textManager = faker.random.words(5);

  const answerDate = '2030-01-01';
  const answerMultipleChoice = 'One';
  const answerText = faker.random.words(3);

  const textQuestion = faker.random.words(3);
  const dateQuestion = faker.random.words(3);
  const boolQuestion = faker.random.words(3);
  const multipleChoiceQuestion = faker.random.words(3);
  const fileUploadQuestion = faker.random.words(3);

  let textQuestionId: string;
  let dateQuestionId: string;
  let boolQuestionId: string;
  let multipleChoiceQuestionId: string;

  it('Should be able to set comment for user/manager and final status', () => {
    cy.login('user');
    cy.createProposal(proposalName1);
    cy.contains('Submit').click();
    cy.contains('OK').click();
    cy.logout();

    cy.login('officer');

    cy.contains('Proposals').click();

    cy.get('[data-cy=view-proposal]').click();
    cy.get('[role="dialog"]').as('dialog');
    cy.finishedLoading();
    cy.contains('Admin').click();

    cy.get('#mui-component-select-finalStatus').click();

    cy.contains('Accepted').click();

    cy.get('#mui-component-select-proposalStatus').click();

    cy.contains('Loading...').should('not.exist');

    cy.get('[id="menu-proposalStatus"] [role="option"]').first().click();

    cy.get('[data-cy=commentForUser]').type(textUser);

    cy.get('[data-cy=commentForManagement]').type(textManager);

    cy.contains('Update').click();

    cy.notification({ variant: 'success', text: 'Updated' });

    cy.reload();

    cy.contains('Admin').click();

    cy.contains(textUser);

    cy.contains(textManager);

    cy.closeModal();

    cy.contains('Accepted');

    cy.contains('DRAFT');

    cy.contains('Proposals').click();

    cy.contains('DRAFT');
  });

  it('If you select a tab in tabular view and reload the page it should stay on specific selected tab', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.get('[data-cy=view-proposal]').click();

    cy.get('[role="dialog"]').as('dialog');
    cy.finishedLoading();

    cy.contains('Admin').click();

    cy.reload();

    cy.get('[data-cy="commentForUser"]').should('exist');

    cy.get('[role="dialog"]').contains('Technical review').click();

    cy.reload();

    cy.get('[data-cy="timeAllocation"]').should('exist');
  });

  it('Download proposal is working with dialog window showing up', () => {
    cy.login('officer');

    cy.get('[data-cy="download-proposal"]').first().click();

    cy.get('[data-cy="preparing-download-dialog"]').should('exist');
    cy.get('[data-cy="preparing-download-dialog-item"]').contains(
      proposalName1
    );
  });

  it('Should be able to download proposal pdf', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.request('GET', '/download/pdf/proposal/1').then((response) => {
      expect(response.headers['content-type']).to.be.equal('application/pdf');
      expect(response.status).to.be.equal(200);
    });
  });

  it('Should be able to save table selection state in url', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.finishedLoading();

    cy.get('[type="checkbox"]').eq(1).click();

    cy.url().should('contain', 'selection=');

    cy.reload();

    cy.contains('1 row(s) selected');
  });

  it('Should be able to save table search state in url', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.get('[placeholder="Search"]').type('test');

    cy.url().should('contain', 'search=test');

    cy.reload();

    cy.get('[placeholder="Search"]').should('have.value', 'test');
  });

  it('Should be able to save table sort state in url', () => {
    let officerProposalsTableAsTextBeforeSort = '';
    let officerProposalsTableAsTextAfterSort = '';

    cy.login('user');
    // Create a proposal with title that will be always last if sort order by title is 'desc'
    cy.createProposal(proposalFixedName);
    cy.contains('Submit').click();
    cy.contains('OK').click();
    cy.logout();

    cy.login('officer');

    cy.contains('Proposals').click();

    cy.finishedLoading();

    cy.get('[data-cy="officer-proposals-table"] table').then((element) => {
      officerProposalsTableAsTextBeforeSort = element.text();
    });

    cy.contains('Title').dblclick();

    cy.get('[data-cy="officer-proposals-table"] table').then((element) => {
      officerProposalsTableAsTextAfterSort = element.text();
    });

    cy.reload();

    cy.finishedLoading();

    cy.get('[data-cy="officer-proposals-table"] table').then((element) => {
      expect(element.text()).to.be.equal(officerProposalsTableAsTextAfterSort);
      expect(element.text()).not.equal(officerProposalsTableAsTextBeforeSort);
    });

    cy.get(
      '.MuiTableSortLabel-active .MuiTableSortLabel-iconDirectionDesc'
    ).should('exist');

    cy.contains('Calls').click();

    cy.finishedLoading();

    cy.contains('Short Code').click();

    cy.reload();

    cy.finishedLoading();

    cy.get(
      '.MuiTableSortLabel-active .MuiTableSortLabel-iconDirectionAsc'
    ).should('exist');
  });

  it('Should be able to prepare proposal template', () => {
    cy.login('officer');

    cy.navigateToTemplatesSubmenu('Proposal templates');

    cy.contains('default template')
      .parent()
      .get("[title='Edit']")
      .first()
      .click();

    cy.createTopic('Topic for questions');

    cy.get('[data-cy=show-more-button]').last().click();

    cy.get('[data-cy=add-question-menu-item]').last().click();

    cy.createBooleanQuestion(boolQuestion);
    cy.contains(boolQuestion)
      .closest('[data-cy=question-container]')
      .find("[data-cy='proposal-question-id']")
      .invoke('html')
      .then((fieldId) => {
        boolQuestionId = fieldId;
      });

    cy.createDateQuestion(dateQuestion);
    cy.contains(dateQuestion)
      .closest('[data-cy=question-container]')
      .find("[data-cy='proposal-question-id']")
      .invoke('html')
      .then((fieldId) => {
        dateQuestionId = fieldId;
      });

    cy.createMultipleChoiceQuestion(
      multipleChoiceQuestion,
      'One',
      'Two',
      'Three'
    );

    cy.createFileUploadQuestion(fileUploadQuestion);
    cy.contains(multipleChoiceQuestion)
      .closest('[data-cy=question-container]')
      .find("[data-cy='proposal-question-id']")
      .invoke('html')
      .then((fieldId) => {
        multipleChoiceQuestionId = fieldId;
      });

    cy.createTextQuestion(textQuestion, false, false);
    cy.contains(textQuestion)
      .closest('[data-cy=question-container]')
      .find("[data-cy='proposal-question-id']")
      .invoke('html')
      .then((fieldId) => {
        textQuestionId = fieldId;
      });
  });

  it('Should be able to search by question', () => {
    cy.login('user');

    //Create test  proposal
    cy.createProposal(proposalName2);
    cy.contains('Save and continue').click();

    cy.get(`#${boolQuestionId}`).click();

    cy.get(`[data-cy='${dateQuestionId}_field'] input`)
      .clear()
      .type(answerDate);

    cy.get(`#${multipleChoiceQuestionId}`).click();

    cy.contains(answerMultipleChoice).click();

    cy.get('body').type('{esc}');

    cy.get(`#${textQuestionId}`).clear().type(answerText);

    cy.contains('Save and continue').click();

    cy.logout();

    // search proposals
    cy.login('officer');

    cy.get('[data-cy=call-filter]').click();

    cy.get('[role=listbox]').contains('call 1').first().click();

    // Boolean questions
    cy.get('[data-cy=question-search-toggle]').click();

    cy.get('[data-cy=question-list]').click();

    cy.contains(boolQuestion).click();

    cy.get('[data-cy=is-checked]').click();

    cy.get('[role=listbox]').contains('No').click();

    cy.contains('Search').click();

    cy.contains(proposalName2).should('not.exist');

    cy.get('[data-cy=is-checked]').click();

    cy.get('[role=listbox]').contains('Yes').click();

    cy.contains('Search').click();

    cy.contains(proposalName2);

    // Date questions
    cy.get('[data-cy=question-list]').click();

    cy.contains(dateQuestion).click();

    cy.get('[data-cy=value] input').clear().type('2020-01-01');

    cy.contains('Search').click();

    cy.contains(proposalName2).should('not.exist');

    cy.get('[data-cy=comparator]').click();

    cy.get('[role=listbox]').contains('After').click();

    cy.contains('Search').click();

    cy.contains(proposalName2);

    // Multiple choice questions
    cy.get('[data-cy=question-list]').click();

    cy.contains(multipleChoiceQuestion).click();

    cy.get('[data-cy=value]').click();

    cy.get('[role=listbox]').contains('Two').click();

    cy.contains('Search').click();

    cy.contains(proposalName2).should('not.exist');

    cy.get('[data-cy=value]').click();

    cy.get('[role=listbox]').contains('One').click();

    cy.contains('Search').click();

    cy.contains(proposalName2);

    // Text questions
    cy.get('[data-cy=question-list]').click();

    cy.contains(textQuestion).click();

    cy.get('[name=value]').clear().type(faker.random.words(3));

    cy.contains('Search').click();

    cy.contains(proposalName2).should('not.exist');

    cy.get('[name=value]').clear().type(answerText);

    cy.contains('Search').click();

    cy.contains(proposalName2);

    // File upload questions
    cy.get('[data-cy=question-list]').click();

    cy.contains(fileUploadQuestion).click();

    cy.get('[data-cy=has-attachments]').click();

    cy.get('[role=listbox]').contains('Yes').click();

    cy.contains('Search').click();

    cy.contains(proposalName2).should('not.exist');

    cy.get('[data-cy=has-attachments]').click();

    cy.get('[role=listbox]').contains('No').click();

    cy.contains('Search').click();

    cy.contains(proposalName2);
  });

  it('Should preserve the ordering when row is selected', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.finishedLoading();

    cy.get('table tbody tr').eq(0).contains(proposalFixedName);
    cy.contains('Title').dblclick();
    cy.get('table tbody tr').eq(2).contains(proposalFixedName);

    cy.get('table tbody tr input[type="checkbox"]').first().click();

    cy.get('table tbody tr').eq(2).contains(proposalFixedName);
  });

  it('User officer should see Reviews tab before doing the Admin(management decision)', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.finishedLoading();

    cy.get('[data-cy=view-proposal]').first().click();
    cy.finishedLoading();
    cy.get('[role="dialog"]').contains('Reviews').click();

    cy.get('[role="dialog"]').contains('External reviews');
    cy.get('[role="dialog"]').contains('SEP Meeting decision');
  });
});
