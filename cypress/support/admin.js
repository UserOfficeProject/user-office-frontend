import { GraphQLClient } from 'graphql-request';

const resetDB = (includeSeeds = false) => {
  const query = `mutation($includeSeeds: Boolean) {
      prepareDB(includeSeeds: $includeSeeds) {
        log
        rejection {
          reason
        }
      }
    }`;
  const authHeader = `Bearer ${Cypress.env('SVC_ACC_TOKEN')}`;
  const request = new GraphQLClient('/graphql', {
    headers: { authorization: authHeader },
  }).rawRequest(query, { includeSeeds });

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

Cypress.Commands.add('resetDB', resetDB);
Cypress.Commands.add('resetSchedulerDB', resetSchedulerDB);
