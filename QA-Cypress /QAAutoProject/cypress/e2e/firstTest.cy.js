describe('My First Test', () => {

  it('Visit website and check title', () => {

    cy.visit('https://example.cypress.io')

    cy.title().should('include', 'Cypress')

  })

})