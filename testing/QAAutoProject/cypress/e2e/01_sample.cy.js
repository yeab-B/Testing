describe('Test suite one', () => {
    it('Test Case one', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.title().should('include', 'Automation Testing Practice')
    cy.get('#name')
        .type('Joe Doe')
        .should('have.value', 'Joe Doe')

    cy.get('#sunday').check().should('be.checked')
    cy.get('#country').select('Japan')
})
})