import faker from 'faker';

context('Settings tests', () => {
  describe('Proposal statuses tests', () => {
    before(() => {
      cy.resetDB();
    });

    beforeEach(() => {
      cy.visit('/');
      cy.viewport(1100, 1000);
    });

    it('User should not be able to see Settings page', () => {
      cy.login('user');

      cy.get('[data-cy="profile-page-btn"]').should('exist');

      let userMenuItems = cy.get('[data-cy="user-menu-items"]');

      userMenuItems.should('not.contain', 'Settings');
    });

    it('User Officer should be able to create Proposal status', () => {
      const name = faker.lorem.words(2);
      const description = faker.lorem.words(5);
      const shortCode = name.toUpperCase().replace(/\s/g, '_');

      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal statuses').click();
      cy.contains('Create').click();
      cy.get('#shortCode').type(shortCode);
      cy.get('#name').type(name);
      cy.get('#description').type(description);
      cy.get('[data-cy="submit"]').click();

      cy.notification({ variant: 'success', text: 'created successfully' });

      let proposalStatusesTable = cy.get('[data-cy="proposal-statuses-table"]');

      const lastPageButtonElement = proposalStatusesTable.find(
        'span[title="Last Page"] > button'
      );

      lastPageButtonElement.click({ force: true });

      proposalStatusesTable = cy.get('[data-cy="proposal-statuses-table"]');
      const proposalStatusesTableLastRow = proposalStatusesTable
        .find('tr[level="0"]')
        .last();

      const lastRowText = proposalStatusesTableLastRow.invoke('text');

      lastRowText.should('contain', shortCode);
      lastRowText.should('contain', name);
      lastRowText.should('contain', description);
    });

    it('User Officer should be able to update Proposal status', () => {
      const newName = faker.lorem.words(2);
      const newDescription = faker.lorem.words(5);

      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal statuses').click();

      let proposalStatusesTable = cy.get('[data-cy="proposal-statuses-table"]');

      const lastPageButtonElement = proposalStatusesTable.find(
        'span[title="Last Page"] > button'
      );

      lastPageButtonElement.click({ force: true });

      cy.get('[title="Edit"]')
        .last()
        .click();

      cy.get('#shortCode').should('be.disabled');

      cy.get('#name').clear();
      cy.get('#name').type(newName);
      cy.get('#description').type(newDescription);
      cy.get('[data-cy="submit"]').click();

      cy.notification({ variant: 'success', text: 'updated successfully' });

      proposalStatusesTable = cy.get('[data-cy="proposal-statuses-table"]');
      const proposalStatusesTableLastRow = proposalStatusesTable
        .find('tr[level="0"]')
        .last();

      const lastRowText = proposalStatusesTableLastRow.invoke('text');

      lastRowText.should('contain', newName);
      lastRowText.should('contain', newDescription);
    });

    it('User Officer should be able to delete Proposal status', () => {
      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal statuses').click();

      let proposalStatusesTable = cy.get('[data-cy="proposal-statuses-table"]');

      const lastPageButtonElement = proposalStatusesTable.find(
        'span[title="Last Page"] > button'
      );

      lastPageButtonElement.click({ force: true });

      cy.get('[title="Delete"]')
        .last()
        .click();

      cy.get('[data-cy="confirm-ok"]').click();

      cy.notification({ variant: 'success', text: 'deleted successfully' });
    });
  });

  describe('Proposal workflows tests', () => {
    before(() => {
      cy.resetDB();
    });

    beforeEach(() => {
      cy.visit('/');
      cy.viewport(1100, 1000);
    });

    it('User Officer should be able to create proposal workflow and it should contain default DRAFT status', () => {
      const name = faker.lorem.words(2);
      const description = faker.lorem.words(5);

      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal workflows').click();

      cy.contains('Create').click();
      cy.get('#name').type(name);
      cy.get('#description').type(description);
      cy.get('[data-cy="submit"]').click();

      cy.notification({ variant: 'success', text: 'created successfully' });

      cy.get('[data-cy="connection_DRAFT_1"]').should('contain.text', 'DRAFT');
      cy.get('[data-cy="status_DRAFT_1"]').should('not.exist');

      cy.get('[data-cy="remove-workflow-status-button"]').should('not.exist');
    });

    it('User Officer should be able to update proposal workflow', () => {
      const name = faker.lorem.words(2);
      const description = faker.lorem.words(5);

      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal workflows').click();

      cy.get('[title="Edit"]')
        .last()
        .click();

      cy.contains('Edit').click();

      cy.get('#name')
        .clear()
        .type(name);
      cy.get('#description')
        .clear()
        .type(description);
      cy.get('[data-cy="submit"]').click();

      cy.notification({ variant: 'success', text: 'updated successfully' });

      cy.get('[data-cy="proposal-workflow-metadata-container"]')
        .should('contain.text', name)
        .should('contain.text', description);
    });

    it('User Officer should be able to add more statuses in proposal workflow', () => {
      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal workflows').click();

      cy.get('[title="Edit"]')
        .last()
        .click();

      cy.get('[data-cy="status_FEASIBILITY_REVIEW_2"]').dragElement([
        { direction: 'left', length: 1 },
        { direction: 'down', length: 1 },
      ]);

      cy.get('[data-cy="connection_FEASIBILITY_REVIEW_2"]').should(
        'contain.text',
        'FEASIBILITY_REVIEW'
      );

      cy.notification({
        variant: 'success',
        text: 'Workflow status added successfully',
      });

      cy.get('[data-cy="status_FEASIBILITY_REVIEW_2"]').should('not.exist');
    });

    it('User Officer should be able to select events that are triggering next workflow status', () => {
      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal workflows').click();

      cy.get('[title="Edit"]')
        .last()
        .click();

      cy.get('[data-cy="connection_DRAFT_1"]').click();

      cy.get('[data-cy="next-status-events-modal"]').should('exist');

      cy.contains('PROPOSAL_SUBMITTED').click();

      cy.get('[data-cy="submit"]').click();

      cy.notification({
        variant: 'success',
        text: 'Next status events added successfully!',
      });

      cy.contains('PROPOSAL_SUBMITTED');

      cy.get('[data-cy="connection_DRAFT_1"]').click();

      cy.get('[data-cy="next-status-events-modal"]').should('exist');

      cy.contains('PROPOSAL_FEASIBLE').click();

      cy.get('[data-cy="submit"]').click();

      cy.contains('PROPOSAL_SUBMITTED & PROPOSAL_FEASIBLE');
    });

    it('Proposal should follow the selected workflow', () => {
      const name = 'Fast track';
      const description = 'Faster than the fastest workflow';

      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal workflows').click();

      cy.contains('Create').click();
      cy.get('#name').type(name);
      cy.get('#description').type(description);
      cy.get('[data-cy="submit"]').click();

      cy.notification({ variant: 'success', text: 'created successfully' });

      cy.get('[data-cy="status_FEASIBILITY_REVIEW_2"]').dragElement([
        { direction: 'left', length: 1 },
        { direction: 'down', length: 1 },
      ]);

      cy.notification({
        variant: 'success',
        text: 'Workflow status added successfully',
      });

      cy.get('[data-cy="connection_DRAFT_1"]').click();

      cy.get('[data-cy="next-status-events-modal"]').should('exist');

      cy.contains('PROPOSAL_SUBMITTED').click();

      cy.get('[data-cy="submit"]').click();

      cy.notification({
        variant: 'success',
        text: 'Next status events added successfully!',
      });

      cy.contains('Calls').click();

      cy.get('[title="Edit"]')
        .first()
        .click();

      cy.get('#mui-component-select-proposalWorkflowId').click();

      cy.contains('Loading...').should('not.exist');

      cy.get('[role="presentation"] [role="listbox"] li')
        .last()
        .click();

      cy.get('[data-cy="next-step"]').click();

      cy.get('[data-cy="next-step"]').click();

      cy.get('[data-cy="submit"]').click();

      cy.notification({
        variant: 'success',
        text: 'Call updated successfully!',
      });

      cy.logout();

      cy.login('user');

      cy.createProposal();

      cy.contains('Dashboard').click();

      cy.finishedLoading();

      cy.get('.MuiTable-root tbody tr')
        .first()
        .then(element => expect(element.text()).to.contain('draft'));

      cy.get('.MuiTable-root tbody tr')
        .first()
        .find('[title="Edit proposal"]')
        .click();

      cy.contains('Submit').click();

      cy.contains('OK').click();

      cy.contains('Dashboard').click();

      cy.finishedLoading();

      cy.get('.MuiTable-root tbody tr')
        .first()
        .then(element => expect(element.text()).to.contain('submitted'));

      cy.logout();
      cy.login('officer');

      cy.finishedLoading();

      cy.get('.MuiTable-root tbody tr')
        .first()
        .then(element =>
          expect(element.text()).to.contain('FEASIBILITY_REVIEW')
        );
    });

    it('User Officer should be able to filter proposals based on statuses', () => {
      cy.login('user');

      cy.createProposal();

      cy.logout();

      cy.login('officer');

      cy.finishedLoading();

      cy.get('.MuiTable-root tbody')
        .first()
        .then(element => expect(element.text()).to.contain('DRAFT'));

      cy.get('.MuiTable-root tbody')
        .first()
        .then(element =>
          expect(element.text()).to.contain('FEASIBILITY_REVIEW')
        );

      cy.get('[data-cy="status-filter"]').click();
      cy.get('[role="listbox"] [data-value="2"]').click();

      cy.finishedLoading();

      cy.get('.MuiTable-root tbody tr')
        .first()
        .then(element =>
          expect(element.text()).to.contain('FEASIBILITY_REVIEW')
        );

      cy.get('[data-cy="status-filter"]').click();
      cy.get('[role="listbox"] [data-value="1"]').click();

      cy.finishedLoading();

      cy.get('.MuiTable-root tbody tr')
        .first()
        .then(element => expect(element.text()).to.contain('DRAFT'));
    });

    it('User Officer should be able to split workflow into two or more paths', () => {
      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal workflows').click();

      cy.get('[title="Edit"]')
        .last()
        .click();

      cy.contains('Add multicolumn row').click();

      cy.get('#mui-component-select-selectedParentDroppableId').click();
      cy.get(
        '[role="presentation"] [data-value="proposalWorkflowConnections_0"]'
      ).click();

      cy.get('#mui-component-select-numberOfColumns').click();
      cy.get('[role="presentation"] [data-value="2"]').click();

      cy.contains('Add row').click();

      cy.get('[data-cy="droppable-group"]').should('have.length', 3);

      cy.get('[data-cy="status_SEP_SELECTION_4"]').dragElement([
        { direction: 'left', length: 2 },
      ]);

      cy.get('[data-cy="connection_SEP_SELECTION_4"]').should(
        'contain.text',
        'SEP_SELECTION'
      );

      cy.get('[data-cy="status_NOT_FEASIBLE_3"]').dragElement([
        { direction: 'left', length: 1 },
      ]);

      cy.get('[data-cy="connection_NOT_FEASIBLE_3"]').should(
        'contain.text',
        'NOT_FEASIBLE'
      );

      cy.reload();

      cy.get('[data-cy="droppable-group"]').should('have.length', 3);

      cy.get(
        '[data-cy="proposal-workflow-connections"] .MuiGrid-container .MuiGrid-grid-xs-6'
      ).should('have.length', 2);
    });

    it('User Officer should be able to remove statuses from proposal workflow using trash icon', () => {
      cy.login('officer');

      cy.contains('Settings').click();
      cy.contains('Proposal workflows').click();

      cy.get('[title="Edit"]')
        .last()
        .click();

      cy.get('[data-cy="remove-workflow-status-button"]')
        .first()
        .click();

      cy.get('[data-cy="status_FEASIBILITY_REVIEW_2"]').should(
        'contain.text',
        'FEASIBILITY_REVIEW'
      );

      cy.notification({
        variant: 'success',
        text: 'Workflow status removed successfully',
      });

      cy.get('[data-cy="connection_FEASIBILITY_REVIEW_2"]').should('not.exist');
    });
  });
});
