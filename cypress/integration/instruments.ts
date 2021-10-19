context('Instrument tests', () => {
  const faker = require('faker');

  const questionText = faker.lorem.words(3);

  const instrument1 = {
    name: faker.random.words(2),
    shortCode: faker.random.alphaNumeric(15),
    description: faker.random.words(5),
  };

  const instrument2 = {
    name: faker.random.words(2),
    shortCode: faker.random.alphaNumeric(15),
    description: faker.random.words(5),
  };

  const proposal1 = {
    title: faker.random.words(2),
    abstract: faker.random.words(5),
  };

  const proposal2 = {
    title: faker.random.words(2),
    abstract: faker.random.words(5),
  };

  const proposalWorkflow = {
    name: faker.random.words(2),
    description: faker.random.words(5),
  };

  const call2 = {
    shortCode: faker.random.alphaNumeric(10),
    startDate: faker.date.past().toISOString().slice(0, 10),
    endDate: faker.date.future().toISOString().slice(0, 10),
    template: 'default template',
    esiTemplate: 'default esi template',
    workflow: proposalWorkflow.name,
  };

  const scientist1 = 'Carlsson';
  const scientist2 = 'Beckley';

  before(() => {
    cy.resetDB();
    cy.viewport(1920, 1080);
    cy.login('officer');
    cy.createTemplate('proposalEsi', 'default esi template');
    cy.logout();
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('User should not be able to see Instruments page', () => {
    cy.login('user');

    cy.get('[data-cy="profile-page-btn"]').should('exist');

    let userMenuItems = cy.get('[data-cy="user-menu-items"]');

    userMenuItems.should('not.contain', 'Instruments');
  });

  it('User Officer should be able to create Instrument', () => {
    cy.login('officer');

    cy.contains('People').click();
    cy.addScientistRoleToUser(scientist1);

    cy.contains('People').click();
    cy.addScientistRoleToUser(scientist2);

    cy.createInstrument(instrument1, scientist1);
    cy.wait(100);
    cy.createInstrument(instrument2, scientist2);
  });

  it('User Officer should be able to update Instrument', () => {
    const originalName = instrument1.name;
    instrument1.name = faker.random.words(2);
    instrument1.shortCode = faker.random.alphaNumeric(15);
    instrument1.description = faker.random.words(5);

    cy.login('officer');

    cy.contains('Instruments').click();
    cy.contains(originalName).parent().find('[title="Edit"]').click();
    cy.get('#name').clear();
    cy.get('#name').type(instrument1.name);
    cy.get('#shortCode').clear();
    cy.get('#shortCode').type(instrument1.shortCode);
    cy.get('#description').type(instrument1.description);
    cy.get('[data-cy="submit"]').click();

    cy.notification({ variant: 'success', text: 'updated successfully' });

    const instrumentsTable = cy.get('[data-cy="instruments-table"]');

    instrumentsTable.should('contain', instrument1.name);
    instrumentsTable.should('contain', instrument1.shortCode);
    instrumentsTable.should('contain', instrument1.description);
  });

  it('User Officer should be able to assign proposal to existing instrument', () => {
    cy.login('officer');

    cy.createProposalWorkflow(
      proposalWorkflow.name,
      proposalWorkflow.description
    );

    cy.createCall(call2);

    cy.navigateToTemplatesSubmenu('Proposal');

    cy.contains('default template').parent().get("[title='Edit']").click();

    cy.createTopic('Topic for questions');

    cy.createBooleanQuestion(questionText);

    cy.logout();

    cy.login('user');

    cy.createProposal(proposal1.title, proposal1.abstract, 'call 1');
    cy.contains(questionText).click();
    cy.contains('Save and continue').click();
    cy.contains('Submit').click();
    cy.contains('OK').click();

    cy.createProposal(proposal2.title, proposal2.abstract, call2.shortCode);
    cy.contains('Save and continue').click();
    cy.contains('Submit').click();
    cy.contains('OK').click();

    cy.logout();

    cy.login('officer');

    cy.contains('Calls').click();

    cy.assignInstrumentToCall('call 1', instrument1.shortCode);

    cy.wait(100);

    cy.assignInstrumentToCall(call2.shortCode, instrument2.shortCode);

    cy.contains('Proposals').click();

    cy.assignInstrumentToProposal(proposal1.title, instrument1.name);
    cy.wait(100);
    cy.assignInstrumentToProposal(proposal2.title, instrument2.name);
  });

  it('User Officer should be able to assign and unassign instrument to proposal without page refresh', () => {
    cy.login('officer');

    cy.contains('Proposals').click();

    cy.finishedLoading();

    cy.contains(proposal1.title).parent().find('[type="checkbox"]').check();

    cy.get('[data-cy="assign-remove-instrument"]').click();

    cy.contains('Loading...').should('not.exist');

    cy.get('[data-cy="clear-selection"]').click();

    cy.get('[data-cy="remove-instrument-alert"]').should('exist');

    cy.get('[data-cy="submit-assign-remove-instrument"]').click();

    cy.get('[data-cy="proposals-instrument-assignment"]').should('not.exist');

    cy.notification({
      variant: 'success',
      text: 'Proposal/s removed from the instrument successfully!',
    });

    cy.assignInstrumentToProposal(proposal1.title, instrument1.name);

    cy.contains(proposal1.title).parent().find('[type="checkbox"]').check();

    cy.get('[data-cy="assign-remove-instrument"]').click();

    cy.contains('Loading...').should('not.exist');

    cy.get('[data-cy="clear-selection"]').click();

    cy.get('[data-cy="remove-instrument-alert"]').should('exist');

    cy.get('[data-cy="submit-assign-remove-instrument"]').click();

    cy.notification({
      variant: 'success',
      text: 'Proposal/s removed from the instrument successfully!',
    });

    cy.assignInstrumentToProposal(proposal1.title, instrument1.name);
  });

  it('User Officer should be able to assign scientist to instrument and instrument scientist should be able to see instruments he is assigned to', () => {
    cy.login('officer');

    cy.contains('Instruments').click();

    cy.assignScientistsToInstrument(instrument1.shortCode);
    cy.wait(100);
    cy.assignScientistsToInstrument(instrument2.shortCode);

    cy.logout();

    cy.login('user');
    cy.changeActiveRole('Instrument Scientist');

    cy.contains('Instruments').click();

    cy.get('[title="Show Scientists"]').should('exist');
  });

  it('Instrument scientist should be able to see proposals assigned to instrument where he is instrument scientist', () => {
    cy.login('user');
    cy.changeActiveRole('Instrument Scientist');

    cy.contains('Proposals');

    cy.get('[data-cy="status-filter"]').click();
    cy.get('[role="listbox"] [data-value="0"]').click();

    cy.contains(proposal1.title);
    cy.contains(proposal2.title);
  });

  it('Instrument scientist should have a call and instrument filter', () => {
    cy.login('officer');

    cy.contains('Instruments').click();

    cy.logout();

    cy.login('user');
    cy.changeActiveRole('Instrument Scientist');

    cy.contains('Proposals');

    cy.get('[data-cy="status-filter"]').click();
    cy.get('[role="listbox"] [data-value="0"]').click();

    cy.contains(proposal1.title);
    cy.contains(proposal2.title);

    cy.finishedLoading();

    cy.get('[data-cy="call-filter"]').click();
    cy.get('[role="listbox"]').contains('call 1').click();
    cy.finishedLoading();

    cy.contains(proposal1.title);
    cy.contains(proposal2.title).should('not.exist');

    cy.get('[data-cy="instrument-filter"]').click();
    cy.get('[role="listbox"]').contains(instrument2.name).click();
    cy.finishedLoading();

    cy.contains('No records to display');
    cy.contains(proposal1.title).should('not.exist');
    cy.contains(proposal2.title).should('not.exist');

    cy.get('[data-cy="instrument-filter"]').click();
    cy.get('[role="listbox"]').contains('All').click();
    cy.finishedLoading();

    cy.get('[data-cy=question-search-toggle]').click();

    cy.get('[data-cy=question-list]').click();
    cy.contains(questionText).click();
    cy.get('[data-cy=is-checked]').click();
    cy.get('[role=listbox]').contains('Yes').click();
    cy.contains('Search').click();
    cy.contains(proposal1.title).should('exist');
  });

  it('Instrument scientist should be able to download multiple proposals as PDF', () => {
    cy.login('user');
    cy.changeActiveRole('Instrument Scientist');

    cy.contains('Proposals');

    cy.get('[data-cy="status-filter"]').click();
    cy.get('[role="listbox"] [data-value="0"]').click();

    cy.contains(proposal1.title);
    cy.contains(proposal2.title);

    cy.finishedLoading();

    cy.contains(proposal1.title)
      .parent()
      .find('input[type="checkbox"]')
      .check();
    cy.contains(proposal2.title)
      .parent()
      .find('input[type="checkbox"]')
      .check();

    cy.get('[title="Download proposals in PDF"]').click();

    cy.get('[data-cy="preparing-download-dialog"]').should('exist');
    cy.get('[data-cy="preparing-download-dialog-item"]').contains(
      '2 selected items'
    );

    cy.contains(proposal1.title)
      .parent()
      .find('[data-cy="download-proposal"]')
      .click();

    cy.get('[data-cy="preparing-download-dialog"]').should('exist');
    cy.get('[data-cy="preparing-download-dialog-item"]').contains(
      proposal1.title
    );
  });

  it('Instrument scientist should be able to save technical review on proposal where he is instrument scientist', () => {
    cy.login('user');
    cy.changeActiveRole('Instrument Scientist');
    cy.assignReviewer(proposal1.title, scientist2);
    cy.get('[data-cy="save-technical-review"]').should('not.exist'); // the form should not be visible
    cy.closeModal();
    cy.logout();

    cy.login('officer');
    cy.assignReviewer(proposal1.title, scientist1);
    cy.closeModal();
    cy.logout();

    cy.login('user');
    cy.changeActiveRole('Instrument Scientist');

    cy.contains('Proposals');

    cy.get('[data-cy="status-filter"]').click();
    cy.get('[role="listbox"] [data-value="0"]').click();

    cy.contains(proposal1.title)
      .parent()
      .find('[data-cy="view-proposal"]')
      .click();
    cy.get('[role="dialog"]').as('dialog');
    cy.finishedLoading();
    cy.get('@dialog').contains('Technical review').click();

    cy.get('@dialog').find('[data-cy="timeAllocation"] input').should('exist');

    cy.get('@dialog').contains('Proposal information').click();

    cy.finishedLoading();

    cy.get('@dialog').contains(proposal1.title);

    cy.get('@dialog').contains('Technical review').click();

    cy.get('[data-cy="timeAllocation"] input').type('-123').blur();
    cy.contains('Must be greater than or equal to');

    cy.get('[data-cy="timeAllocation"] input').clear().type('987654321').blur();
    cy.contains('Must be less than or equal to');

    cy.get('[data-cy="timeAllocation"] input').clear().type('20');

    cy.get('[data-cy="technical-review-status"]').click();
    cy.contains('Feasible').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal(
        'Changes you recently made in this tab will be lost! Are you sure?'
      );

      return false;
    });

    cy.contains('Proposal information').click();

    cy.get('[data-cy="save-technical-review"]').click();

    cy.notification({
      variant: 'success',
      text: 'Technical review updated successfully',
    });

    cy.closeModal();

    cy.contains('Proposals').click();

    cy.get('[data-cy="status-filter"]').click();
    cy.get('[role="listbox"] [data-value="0"]').click();

    cy.contains('20');
  });

  it('Instrument scientist should be able to submit technical review on proposal where he is instrument scientist', () => {
    const internalComment = faker.random.words(2);
    const publicComment = faker.random.words(2);
    cy.login('user');
    cy.changeActiveRole('Instrument Scientist');

    cy.contains('Proposals');

    cy.get('[data-cy="status-filter"]').click();
    cy.get('[role="listbox"] [data-value="0"]').click();

    cy.contains(proposal1.title)
      .parent()
      .find('[data-cy="view-proposal"]')
      .click();
    cy.get('[role="dialog"]').as('dialog');
    cy.finishedLoading();
    cy.get('@dialog').contains('Technical review').click();

    cy.setTinyMceContent('comment', internalComment);
    cy.setTinyMceContent('publicComment', publicComment);

    cy.getTinyMceContent('comment').then((content) =>
      expect(content).to.have.string(internalComment)
    );

    cy.getTinyMceContent('publicComment').then((content) =>
      expect(content).to.have.string(publicComment)
    );

    cy.get('[data-cy="submit-technical-review"]').click();
    cy.get('[data-cy="confirm-ok"]').click();

    cy.notification({ text: 'successfully', variant: 'success' });

    cy.get('[data-cy="save-technical-review"]').should('be.disabled');
    cy.get('[data-cy="submit-technical-review"]').should('be.disabled');
    cy.get('[data-cy="timeAllocation"] input').should('be.disabled');
  });

  it('User Officer should be able to see who submitted the technical review', () => {
    cy.login('officer');

    cy.contains('Proposals');

    cy.contains(proposal1.title)
      .parent()
      .find('[data-cy="view-proposal"]')
      .click();
    cy.get('[role="dialog"]').as('dialog');
    cy.finishedLoading();
    cy.get('@dialog').contains('Technical review').click();

    cy.get('[data-cy="reviewed-by-info"]').should('exist');
    cy.get('[data-cy="reviewed-by-info"]')
      .invoke('attr', 'title')
      .should('eq', 'Reviewed by Carl Carlsson');
  });

  it('User Officer should be able to re-open submitted technical review', () => {
    cy.login('officer');

    cy.contains('Proposals');

    cy.contains(proposal1.title)
      .parent()
      .find('[data-cy="view-proposal"]')
      .click();
    cy.get('[role="dialog"]').as('dialog');
    cy.finishedLoading();
    cy.get('@dialog').contains('Technical review').click();

    cy.get('[data-cy="is-review-submitted"] input')
      .should('have.value', 'true')
      .click()
      .should('have.value', 'false');

    cy.get('[data-cy="save-technical-review"]').click();

    cy.notification({
      variant: 'success',
      text: 'Technical review updated successfully',
    });

    cy.closeModal();

    cy.logout();

    cy.login('user');
    cy.changeActiveRole('Instrument Scientist');

    cy.contains('Proposals');

    cy.get('[data-cy="status-filter"]').click();
    cy.get('[role="listbox"] [data-value="0"]').click();

    cy.contains(proposal1.title)
      .parent()
      .find('[data-cy="view-proposal"]')
      .click();
    cy.get('[role="dialog"]').contains('Technical review').click();

    cy.get('[data-cy="save-technical-review"]').should('not.be.disabled');
    cy.get('[data-cy="submit-technical-review"]').should('not.be.disabled');
    cy.get('[data-cy="timeAllocation"] input').should('not.be.disabled');
  });

  it('User Officer should be able to remove assigned proposal from instrument', () => {
    cy.login('officer');

    cy.contains(proposal1.title)
      .parent()
      .find('input[type="checkbox"]')
      .click();

    cy.get('[data-cy="assign-remove-instrument"]').click();

    cy.contains('Loading...').should('not.exist');

    cy.get('[data-cy="clear-selection"]').click();

    cy.get('[data-cy="remove-instrument-alert"]').should('exist');

    cy.get('[data-cy="submit-assign-remove-instrument"]').click();

    cy.notification({
      variant: 'success',
      text: 'Proposal/s removed from the instrument successfully!',
    });
  });

  it('User Officer should be able to remove assigned scientist from instrument', () => {
    cy.login('officer');

    cy.contains('Instruments').click();

    cy.contains(instrument1.name)
      .parent()
      .find('[title="Show Scientists"]')
      .click();

    cy.contains(scientist1);
    cy.contains(scientist2);

    cy.contains(scientist1).parent().find('[title="Delete"]').click();

    cy.get('[title="Save"]').click();

    cy.notification({
      variant: 'success',
      text: 'Scientist removed from instrument',
    });

    cy.contains(scientist1).should('not.exist');
    cy.contains(scientist2);

    cy.contains(instrument1.name)
      .parent()
      .find('td')
      .last()
      .then((element) => {
        expect(element.text()).to.be.equal('1');
      });

    cy.contains(scientist2).parent().find('[title="Delete"]').click();

    cy.get('[title="Save"]').click();

    cy.notification({
      variant: 'success',
      text: 'Scientist removed from instrument',
    });

    cy.finishedLoading();

    cy.contains(scientist1).should('not.exist');
    cy.contains(scientist2).should('not.exist');

    cy.contains(instrument1.name)
      .parent()
      .find('td')
      .last()
      .then((element) => {
        expect(element.text()).to.be.equal('0');
      });
  });

  it('User Officer should be able to update beamline manager', () => {
    cy.login('officer');

    cy.contains('Instruments').click();

    cy.contains(instrument1.name).parent().find('[title="Edit"]').click();

    cy.get('[data-cy=beamline-manager]').click();

    cy.get('[role=presentation]').contains(scientist2).click();

    cy.get('[role=presentation] [data-cy=submit]').click();

    cy.finishedLoading();

    cy.contains('Instrument updated successfully!');
  });

  it('User Officer should be able to delete Instrument', () => {
    cy.login('officer');

    cy.contains('Calls').click();

    cy.contains('call 1').parent().find('[title="Show Instruments"]').click();

    cy.get('[data-cy="call-instrument-assignments-table"] [title="Delete"]')
      .first()
      .click();

    cy.get('[title="Save"]').click();

    cy.notification({
      variant: 'success',
      text: 'Assigned instrument removed successfully',
    });

    cy.contains('Instruments').click();

    cy.contains(instrument1.name).parent().find('[title="Delete"]').click();

    cy.get('[title="Save"]').click();

    cy.notification({ variant: 'success', text: 'Instrument removed' });

    cy.contains(instrument1.name).should('not.exist');
    cy.contains(instrument2.name);
  });
});
