describe('Verify Link with Correct href Attribute', () => {
  it('Validates that the navigation link points to the correct location', () => {
    cy.visit('https://rahulshettyacademy.com/angularpractice/')

    // Locate the link that should redirect to the Shop page
    // Verify that the href attribute of this link contains "/shop"
    cy.contains('a', 'Shop').should('have.attr', 'href').and('include', '/shop')
  })
})