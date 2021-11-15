import 'cypress-file-upload';
import { GraphQLClient } from 'graphql-request';

import { getSdk } from '../../src/generated/sdk';

const KEY_CODES = {
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

export const getE2EApi = () => {
  const authHeader = `Bearer ${Cypress.env('SVC_ACC_TOKEN')}`;

  return getSdk(
    new GraphQLClient('/graphql', {
      headers: { authorization: authHeader },
    })
  );
};

const notification = ({
  variant,
  text,
}: {
  variant: 'success' | 'error' | 'info';
  text: string | RegExp;
}) => {
  let notificationQuerySelector = '';

  switch (variant) {
    case 'error':
      notificationQuerySelector = '.snackbar-error #notistack-snackbar';
      break;

    default:
      notificationQuerySelector = '.snackbar-success #notistack-snackbar';
      break;
  }
  cy.get(notificationQuerySelector).should('exist');

  if (text) {
    if (text instanceof RegExp) {
      cy.get(notificationQuerySelector).should(($el) =>
        expect($el.text()).to.match(text)
      );
    } else {
      cy.get(notificationQuerySelector).should('contains.text', text);
    }
  }
};

const closeNotification = () => {
  cy.get('body').then((body) => {
    if (body.has('[aria-describedby="notistack-snackbar"]')) {
      cy.get(
        '[aria-describedby="notistack-snackbar"] button.MuiIconButton-root'
      ).click();
    }
  });
};

const closeModal = () => {
  cy.get('[role="dialog"] [data-cy="close-modal"]').click();
  // NOTE: Need to wait for modal to close with animation.
  // cy.wait(100);

  cy.get('[role="dialog"]').should('not.exist');
};

const finishedLoading = () => {
  cy.get('[role="progressbar"]')
    .should('not.exist')
    .get('[data-cy="loading"]')
    .should('not.exist')
    .get('[data-cy="UO-loader"]')
    .should('not.exist')
    .get('.MuiPaper-root [role="progressbar"]')
    .should('not.exist');
};

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

const dragElement = (
  element: JQuery<HTMLElement>,
  moveArgs: {
    direction: 'left' | 'up' | 'right' | 'down';
    length: number;
  }[]
) => {
  const focusedElement = element;
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

const setTinyMceContent = (tinyMceId: string, content: string) => {
  cy.get(`#${tinyMceId}`).should('exist');

  cy.window().then((win) => {
    const editor = win.tinyMCE.editors[tinyMceId];
    editor.setContent(content);
  });
};

const getTinyMceContent = (tinyMceId: string) => {
  cy.get(`#${tinyMceId}`).should('exist');

  cy.window().then((win) => {
    const editor = win.tinyMCE.editors[tinyMceId];

    return editor.getContent();
  });
};

const testActionButton = (
  title: string,
  state: 'completed' | 'active' | 'inactive' | 'neutral' | 'invisible'
) => {
  switch (state) {
    case 'completed':
      cy.get(`[title="${title}"]`).should('not.be.disabled');

      cy.get(`[title="${title}"]`).find('.MuiBadge-badge').contains('✔');
      break;
    case 'active':
      cy.get(`[title="${title}"]`).should('not.be.disabled');

      cy.get(`[title="${title}"]`)
        .find('.MuiBadge-badge')
        .should('have.css', 'background-color', 'rgb(235, 26, 108)');
      break;

    case 'neutral':
      cy.get(`[title="${title}"]`).should('not.be.disabled');

      cy.get(`[title="${title}"]`)
        .find('.MuiBadge-badge')
        .should('not.have.css', 'background-color', 'rgb(235, 26, 108)');
      break;

    case 'inactive':
      cy.get(`[title="${title}"]`).find('button').should('be.disabled');
      break;
    case 'invisible':
      cy.get(`[title="${title}"]`).should('not.exist');
      break;
  }
};

Cypress.Commands.add('notification', notification);

Cypress.Commands.add('closeNotification', closeNotification);

Cypress.Commands.add('closeModal', closeModal);

Cypress.Commands.add('finishedLoading', finishedLoading);

Cypress.Commands.add(
  'dragElement',
  { prevSubject: 'element' },
  (element, args) => {
    dragElement(element, args);
  }
);

Cypress.Commands.add('presentationMode', presentationMode);

Cypress.Commands.add('setTinyMceContent', setTinyMceContent);
Cypress.Commands.add('getTinyMceContent', getTinyMceContent);
Cypress.Commands.add('testActionButton', testActionButton);
