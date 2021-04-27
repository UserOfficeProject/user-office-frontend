declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Creates boolean question. You have to be in edit template view to call this method
       *
       * @returns {typeof createBooleanQuestion}
       * @memberof Chainable
       * @example
       *    cy.createBooleanQuestion('Is dangerous')
       */
      createBooleanQuestion: (title: string) => void;

      /**
       * Creates Text question. You have to be in edit template view to call this method
       *
       * @returns {typeof createTextQuestion}
       * @memberof Chainable
       * @example
       *    cy.createTextQuestion()
       */
      createTextQuestion: (
        title: string,
        isRequired: boolean,
        isMultipleLines: boolean,
        minimumCharacters?: number
      ) => void;

      /**
       * Creates date question. You have to be in edit template view to call this method
       *
       * @returns {typeof createDateQuestion}
       * @memberof Chainable
       * @example
       *    cy.createDateQuestion('Is dangerous')
       */
      createDateQuestion: (title: string) => void;

      /**
       * Creates multiple choice question. You have to be in edit template view to call this method
       *
       * @returns {typeof createMultipleChoiceQuestion}
       * @memberof Chainable
       * @example
       *    cy.createMultipleChoiceQuestion('Is dangerous')
       */
      createMultipleChoiceQuestion: (
        title: string,
        option1: string,
        option2: string,
        option3: string
      ) => void;

      /**
       * Creates FileUpload question.
       * You have to be in edit template view to call this method
       *
       * @returns {typeof createFileUploadQuestion}
       * @memberof Chainable
       * @example
       *    cy.createFileUploadQuestion('Provide a file')
       */
      createFileUploadQuestion: (title: string) => void;

      /**
       * Creates NumberImput question.
       * You have to be in edit template view to call this method
       *
       * @returns {typeof createNumberInputQuestion}
       * @memberof Chainable
       * @example
       *    cy.createNumberInputQuestion('Specify temperature')
       */
      createNumberInputQuestion: (title: string) => void;

      /**
       * Creates interval question.
       * You have to be in edit template view to call this method
       *
       * @returns {typeof createIntervalQuestion}
       * @memberof Chainable
       * @example
       *    cy.createIntervalQuestion('Specify temperature interval')
       */
      createIntervalQuestion: (title: string) => void;

      /**
       * Creates sample question
       *
       * @returns {typeof createSampleQuestion}
       * @memberof Chainable
       * @example
       *    cy.createSampleQuestion('Provide sample', 'default sample template', '1', '5')
       */
      createSampleQuestion: (
        question: string,
        template: string,
        minEntries?: string,
        maxEntries?: string
      ) => void;

      /**
       * Expands templates submenu
       *
       * @returns {typeof expandTemplatesSubmenu}
       * @memberof Chainable
       * @example
       *    cy.expandTemplatesSubmenu()
       */
      navigateToTemplatesSubmenu: (submenuName: string) => void;

      /**
       * Creates template
       *
       * @returns {typeof createTemplate}
       * @memberof Chainable
       * @example
       *    cy.createTemplate('proposal')
       */
      createTemplate: (
        type: string,
        title?: string,
        description?: string
      ) => void;

      /**
       * Creates topic in template
       *
       * @returns {typeof createTopic}
       * @memberof Chainable
       * @example
       *    cy.createTopic('New topic')
       */
      createTopic: (topic: string) => void;
    }
  }
}

export {};
