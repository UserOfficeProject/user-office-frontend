declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Creates new event in scheduler.
       *
       * @returns {typeof createScheduledEvent}
       * @memberof Chainable
       * @example
       *    cy.createEvent(1)
       */
      createScheduledEvent: (
        proposalBookingId: number,
        date: { startsAt: string; endsAt: string }
      ) => Promise<void>;

      /**
       * Activates booking in scheduler
       *
       * @returns {typeof activateBooking}
       * @memberof Chainable
       * @example
       *    cy.activateBooking(1)
       */
      activateBooking: (proposalBookingId: number) => Promise<void>;
    }
  }
}

export {};
