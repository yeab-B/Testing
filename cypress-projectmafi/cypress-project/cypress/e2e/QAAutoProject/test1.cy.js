describe('Sample Cypress Test', () => {
  it('Visits a website, verifies title, and interacts with elements', () => {
    // Navigate to a website
    cy.visit('https://example.cypress.io')

    // Verify page title
    cy.title().should('include', 'Cypress')

    // Verify an element and interact (click)
    cy.contains('type').click()

    // Verify the new URL
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
