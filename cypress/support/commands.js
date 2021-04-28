// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import faker from 'faker';
import { GraphQLClient } from 'graphql-request';
import 'cypress-file-upload';

const KEY_CODES = {
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

const resetDB = () => {
  const query = `mutation {
    prepareDB {
      log
      error
    }
  }`;
  const authHeader = `Bearer ${Cypress.env('SVC_ACC_TOKEN')}`;
  const request = new GraphQLClient('/graphql', {
    headers: { authorization: authHeader },
  }).rawRequest(query, null);

  cy.wrap(request);
};

const resetSchedulerDB = (includeSeeds = false) => {
  const query = `mutation($includeSeeds: Boolean) {
    resetSchedulerDb(includeSeeds: $includeSeeds)
  }`;
  const authHeader = `Bearer ${Cypress.env('SVC_ACC_TOKEN')}`;
  const request = new GraphQLClient('/graphql', {
    headers: { authorization: authHeader },
  }).rawRequest(query, { includeSeeds });

  cy.wrap(request);
};

const navigateToTemplatesSubmenu = (submenuName) => {
  cy.contains('Templates').click();
  cy.get(`[title='${submenuName}']`).first().click();
};

const login = (roleOrCredentials) => {
  const testCredentialStore = {
    user: {
      email: 'Javon4@hotmail.com',
      password: 'Test1234!',
    },
    officer: {
      email: 'Aaron_Harris49@gmail.com',
      password: 'Test1234!',
    },
  };

  const credentials =
    typeof roleOrCredentials === 'string'
      ? testCredentialStore[roleOrCredentials]
      : roleOrCredentials;

  cy.visit('/');

  cy.get('[data-cy=input-email] input')
    .type(credentials.email)
    .should('have.value', credentials.email);

  cy.get('[data-cy=input-password] input')
    .type(credentials.password)
    .should('have.value', credentials.password);

  cy.get('[data-cy=submit]').click();
};

const logout = () => {
  cy.get('[data-cy=profile-page-btn]').click();

  cy.get('[data-cy=logout]').click();
};

const notification = ({ variant, text }) => {
  let notificationQuerySelector = '';
  let bgColor = '';

  switch (variant) {
    case 'error':
      notificationQuerySelector = '.snackbar-error [role="alert"]';
      bgColor = 'rgb(211, 47, 47)';
      break;

    default:
      notificationQuerySelector = '.snackbar-success [role="alert"]';
      bgColor = 'rgb(67, 160, 71)';
      break;
  }
  let notification = cy
    .get(notificationQuerySelector)
    .should('exist')
    .and('have.css', 'background-color', bgColor);

  if (text) {
    if (text instanceof RegExp) {
      notification.and(($el) => expect($el.text()).to.match(text));
    } else {
      notification.and('contains.text', text);
    }
  }
};

const closeNotification = () => {
  cy.get('body').then((body) => {
    if (body.has('[aria-describedby="client-snackbar"]')) {
      cy.get('.MuiSnackbarContent-action button').click();
    }
  });
};

const closeModal = () => {
  cy.get('[role="dialog"] [data-cy="close-modal"]').click();
  // NOTE: Need to wait for modal to close with animation.
  cy.wait(100);

  cy.get('[role="dialog"]').should('not.exist');
};

const finishedLoading = () => {
  cy.get('[role="progressbar"]').should('not.exist');
};

const createProposal = (
  proposalTitle = '',
  proposalAbstract = '',
  call = '',
  proposer = ''
) => {
  const title = proposalTitle || faker.random.words(3);
  const abstract = proposalAbstract || faker.random.words(8);

  cy.contains('New Proposal').click();

  if (call) {
    cy.contains(call).click();
  }

  cy.get('[data-cy=title] input').type(title).should('have.value', title);

  cy.get('[data-cy=abstract] textarea')
    .first()
    .type(abstract)
    .should('have.value', abstract);

  if (proposer) {
    cy.get('[data-cy=edit-proposer-button]').click();
    cy.contains(proposer).parent().find("[title='Select user']").click();
  }

  cy.contains('Save and continue').click();

  cy.notification({ variant: 'success', text: 'Saved' });
};

const createTopic = (title) => {
  cy.get('[data-cy=show-more-button]').click();

  cy.get('[data-cy=add-topic-menu-item]').click();

  cy.wait(500);

  cy.get('[data-cy=topic-title]').last().click();

  cy.get('[data-cy=topic-title-input]').last().clear().type(`${title}{enter}`);
};

function createTemplate(type, title, description) {
  const templateTitle = title || faker.random.words(2);
  const templateDescription = description || faker.random.words(3);

  const typeToMenuTitle = new Map();
  typeToMenuTitle.set('proposal', 'Proposal templates');
  typeToMenuTitle.set('sample', 'Sample declaration templates');
  typeToMenuTitle.set('shipment', 'Shipment declaration templates');

  const menuTitle = typeToMenuTitle.get(type);
  if (!menuTitle) {
    throw new Error(`Type ${type} not supported`);
  }

  cy.navigateToTemplatesSubmenu(menuTitle);

  cy.get('[data-cy=create-new-button]').click();

  cy.get('[data-cy=name] input')
    .type(templateTitle)
    .should('have.value', templateTitle);

  cy.get('[data-cy=description]').type(templateDescription);

  cy.get('[data-cy=submit]').click();
}

const dragElement = (element, moveArgs) => {
  const focusedElement = cy.get(element);

  focusedElement.trigger('keydown', { keyCode: KEY_CODES.space });

  moveArgs.forEach(({ direction, length }) => {
    for (let i = 1; i <= length; i++) {
      focusedElement.trigger('keydown', {
        keyCode: KEY_CODES[direction],
        force: true,
      });
    }
  });

  focusedElement.trigger('keydown', { keyCode: KEY_CODES.space, force: true });

  return element;
};

const createSampleQuestion = (
  question,
  templateName,
  minEntries,
  maxEntries
) => {
  cy.get('[data-cy=show-more-button]').last().click();

  cy.get('[data-cy=add-question-menu-item]').last().click();

  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').click();

  cy.contains('Add Sample Declaration').click();

  cy.get('[data-cy=question]')
    .clear()
    .type(question)
    .should('have.value', question);

  cy.get('[data-cy=template-id]').click();

  cy.contains(templateName).click();

  if (minEntries) {
    cy.get('[data-cy=min-entries] input').clear().type(minEntries);
  }

  if (maxEntries) {
    cy.get('[data-cy=max-entries] input').clear().type(maxEntries);
  }

  cy.contains('Save').click();
};

const createProposalWorkflow = (workflowName, workflowDescription) => {
  cy.contains('Proposal workflows').click();
  cy.contains('Create').click();

  cy.get('#name').type(workflowName);
  cy.get('#description').type(workflowDescription);
  cy.get('[data-cy="submit"]').click();

  cy.notification({ variant: 'success', text: 'created successfully' });
};

const addProposalStatusChangingEventToStatus = (
  statusCode,
  statusChangingEvents
) => {
  cy.get(`[data-cy^="connection_${statusCode}"]`).click();

  cy.get('[data-cy="status-changing-events-modal"]').should('exist');

  statusChangingEvents.forEach((statusChangingEvent) => {
    cy.contains(statusChangingEvent).click();
  });

  cy.get('[data-cy="submit"]').click();

  cy.notification({
    variant: 'success',
    text: 'Status changing events added successfully!',
  });

  statusChangingEvents.forEach((statusChangingEvent) => {
    cy.contains(statusChangingEvent);
  });
};

const createCall = ({
  shortCode,
  startDate,
  endDate,
  template,
  workflow,
  surveyComment,
  cycleComment,
}) => {
  const callShortCode = shortCode || faker.random.word().split(' ')[0]; // faker random word is buggy, it ofter returns phrases
  const callStartDate =
    startDate || faker.date.past().toISOString().slice(0, 10);
  const callEndDate = endDate || faker.date.future().toISOString().slice(0, 10);
  const callSurveyComment = surveyComment || faker.random.word().split(' ')[0];
  const callCycleComment = cycleComment || faker.random.word().split(' ')[0];

  cy.contains('Calls').click();

  cy.contains('Create').click();

  cy.get('[data-cy=short-code] input')
    .type(callShortCode)
    .should('have.value', callShortCode);

  cy.get('[data-cy=start-date] input')
    .clear()
    .type(callStartDate)
    .should('have.value', callStartDate);

  cy.get('[data-cy=end-date] input')
    .clear()
    .type(callEndDate)
    .should('have.value', callEndDate);

  if (template) {
    cy.get('[data-cy="call-template"]').click();
    cy.contains(template).click();
  }

  if (workflow) {
    cy.get('#mui-component-select-proposalWorkflowId').click();

    cy.contains('Loading...').should('not.exist');

    cy.contains(workflow).click();
  }

  cy.get('[data-cy="next-step"]').click();

  cy.get('[data-cy=survey-comment] input').clear().type(callSurveyComment);

  cy.get('[data-cy="next-step"]').click();

  cy.get('[data-cy=cycle-comment] input').clear().type(callCycleComment);

  cy.get('[data-cy="submit"]').click();

  cy.notification({ variant: 'success', text: 'successfully' });

  cy.contains(callShortCode);
};

function changeActiveRole(role) {
  cy.get('[data-cy="profile-page-btn"]').click();
  cy.get('[role="presentation"]').contains('Roles').click();

  cy.finishedLoading();

  cy.get("[data-cy='role-selection-table'] table tbody")
    .contains(role)
    .parent()
    .contains('Use')
    .click();

  cy.notification({ variant: 'success', text: 'User role changed' });
}

function createBooleanQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Boolean').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createTextQuestion(
  title,
  isRequired,
  isMultipleLines,
  minimumCharacters
) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Text Input').click();

  cy.get('[data-cy=question]').clear().type(title);

  if (isRequired) {
    cy.contains('Is required').click();
  }

  if (isMultipleLines) {
    cy.contains('Multiple lines').click();
  }

  if (minimumCharacters !== undefined) {
    cy.get('[data-cy=max]').type(minimumCharacters.toString());
  }

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }])
    .wait(500);

  cy.finishedLoading();
}

function createDateQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Date').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Is required').click();

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createMultipleChoiceQuestion(title, option1, option2, option3) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Multiple choice').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Radio').click();

  cy.contains('Dropdown').click();

  cy.contains('Is multiple select').click();

  cy.contains('Items').click();

  cy.get('[data-cy=add-answer-button]').closest('button').click();
  cy.get('[placeholder=Answer]').type(option1);
  cy.get('[title="Save"]').click();

  cy.get('[data-cy=add-answer-button]').closest('button').click();
  cy.get('[placeholder=Answer]').type(option2);
  cy.get('[title="Save"]').click();

  cy.get('[data-cy=add-answer-button]').closest('button').click();
  cy.get('[placeholder=Answer]').type(option3);
  cy.get('[title="Save"]').click();

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createFileUploadQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add File Upload').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createNumberInputQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Number').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function createIntervalQuestion(title) {
  cy.get('[data-cy=questionPicker] [data-cy=show-more-button]').last().click();

  cy.contains('Add Interval').click();

  cy.get('[data-cy=question]').clear().type(title);

  cy.contains('Save').click();

  cy.contains(title)
    .parent()
    .dragElement([{ direction: 'left', length: 1 }]);

  cy.finishedLoading();
}

function presentationMode() {
  const COMMAND_DELAY = 300;

  for (const command of [
    'visit',
    'click',
    'trigger',
    'type',
    'clear',
    'reload',
    'contains',
  ]) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      const origVal = originalFn(...args);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(origVal);
        }, COMMAND_DELAY);
      });
    });
  }
}

const assignInstrumentToCall = (call, instrument) => {
  cy.contains(call).parent().find('[title="Assign Instrument"]').click();

  cy.contains(instrument).parent().find('[type="checkbox"]').check();

  cy.contains('Assign instrument').click();

  cy.notification({
    variant: 'success',
    text: 'Instrument/s assigned successfully',
  });
};

const assignInstrumentToProposal = (proposal, instrument) => {
  cy.contains(proposal).parent().find('[type="checkbox"]').as('checkbox');

  cy.get('@checkbox').check();

  cy.get("[title='Assign proposals to instrument']").click();

  cy.get("[id='mui-component-select-selectedInstrumentId']").should(
    'not.have.class',
    'Mui-disabled'
  );

  cy.get("[id='mui-component-select-selectedInstrumentId']").first().click();

  cy.get("[id='menu-selectedInstrumentId'] li").contains(instrument).click();

  cy.contains('Assign to Instrument').click();

  cy.notification({
    variant: 'success',
    text: 'Proposal/s assigned to the selected instrument',
  });

  cy.get('@checkbox').uncheck();

  cy.contains(proposal)
    .parent()
    .find('[title="Remove assigned instrument"]')
    .should('exist');
};

function addScientistRoleToUser(name) {
  cy.get('[aria-label="Search"]').type(name);

  cy.finishedLoading();

  cy.contains(name).parent().find('button[title="Edit user"]').click();

  cy.get('main').contains('Settings').click();

  cy.get('[data-cy="add-role-button"]').should('not.be.disabled').click();

  cy.finishedLoading();

  cy.get('[data-cy="role-modal"] [aria-label="Search"]').type(
    'Instrument Scientist'
  );

  cy.get('[data-cy="role-modal"]')
    .contains('Instrument Scientist')
    .parent()
    .find('input[type="checkbox"]')
    .click();

  cy.get('[data-cy="role-modal"]').contains('Update').click();

  cy.notification({ variant: 'success', text: 'successfully' });
}

function assignScientistsToInstrument(instrument) {
  cy.contains(instrument).parent().find('[title="Assign scientist"]').click();

  cy.get('[data-cy="co-proposers"] input[type="checkbox"]').first().click();

  cy.get('.MuiDialog-root').contains('Update').click();

  cy.notification({
    variant: 'success',
    text: 'Scientist assigned to instrument',
  });
}

function createInstrument({ name, shortCode, description }) {
  cy.contains('Create').click();
  cy.get('#name').type(name);
  cy.get('#shortCode').type(shortCode);
  cy.get('#description').type(description);
  cy.get('[data-cy="submit"]').click();

  cy.contains(name);
  cy.contains(shortCode);
  cy.contains(description);

  cy.notification({ variant: 'success', text: 'created successfully' });
}

const setTinyMceContent = (tinyMceId, content) => {
  cy.get(`#${tinyMceId}`).should('exist');

  cy.window().then((win) => {
    const editor = win.tinyMCE.editors[tinyMceId];
    editor.setContent(content);
  });
};

const getTinyMceContent = (tinyMceId) => {
  cy.get(`#${tinyMceId}`).should('exist');

  cy.window().then((win) => {
    const editor = win.tinymce.editors[tinyMceId];

    return editor.getContent();
  });
};

Cypress.Commands.add('resetDB', resetDB);

Cypress.Commands.add('resetSchedulerDB', resetSchedulerDB);

Cypress.Commands.add('navigateToTemplatesSubmenu', navigateToTemplatesSubmenu);

Cypress.Commands.add('login', login);

Cypress.Commands.add('logout', logout);

Cypress.Commands.add('notification', notification);
Cypress.Commands.add('closeNotification', closeNotification);

Cypress.Commands.add('closeModal', closeModal);

Cypress.Commands.add('finishedLoading', finishedLoading);

Cypress.Commands.add('createTemplate', createTemplate);

Cypress.Commands.add('createProposal', createProposal);

Cypress.Commands.add('createCall', createCall);

Cypress.Commands.add('createProposalWorkflow', createProposalWorkflow);

Cypress.Commands.add(
  'addProposalStatusChangingEventToStatus',
  addProposalStatusChangingEventToStatus
);

Cypress.Commands.add(
  'dragElement',
  { prevSubject: 'element' },
  (element, args) => {
    dragElement(element, args);
  }
);

Cypress.Commands.add('createTopic', createTopic);

Cypress.Commands.add('changeActiveRole', changeActiveRole);

Cypress.Commands.add('presentationMode', presentationMode);

Cypress.Commands.add('createBooleanQuestion', createBooleanQuestion);

Cypress.Commands.add('createSampleQuestion', createSampleQuestion);

Cypress.Commands.add('createTextQuestion', createTextQuestion);

Cypress.Commands.add('createDateQuestion', createDateQuestion);

Cypress.Commands.add(
  'createMultipleChoiceQuestion',
  createMultipleChoiceQuestion
);

Cypress.Commands.add('createFileUploadQuestion', createFileUploadQuestion);

Cypress.Commands.add('createNumberInputQuestion', createNumberInputQuestion);

Cypress.Commands.add('createIntervalQuestion', createIntervalQuestion);

Cypress.Commands.add('assignInstrumentToCall', assignInstrumentToCall);

Cypress.Commands.add('assignInstrumentToProposal', assignInstrumentToProposal);

Cypress.Commands.add('addScientistRoleToUser', addScientistRoleToUser);

Cypress.Commands.add(
  'assignScientistsToInstrument',
  assignScientistsToInstrument
);

Cypress.Commands.add('createInstrument', createInstrument);

Cypress.Commands.add('setTinyMceContent', setTinyMceContent);
Cypress.Commands.add('getTinyMceContent', getTinyMceContent);
