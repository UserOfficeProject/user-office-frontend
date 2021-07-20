declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Defines experiment team
       *
       * @returns {typeof defineExperimentTeam}
       * @memberof Chainable
       * @example
       *    cy.defineExperimentTeam('')
       */
      defineExperimentTeam: (params: {
        proposalTitle: string;
        users: string[];
        teamLead: string;
      }) => void;
    }
  }
}

export {};
