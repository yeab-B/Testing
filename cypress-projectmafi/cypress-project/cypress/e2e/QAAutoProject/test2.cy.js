describe('Locating Elements with Different Selectors', () => {
  it('Demonstrates ID, Class, and Attribute selectors', () => {
    cy.visit('https://rahulshettyacademy.com/angularpractice/')

    // 1. Attribute selector: Locate element by its name attribute and type text
    cy.get('input[name="name"]').first().type('John Doe')
    
    // 2. ID selector: Locate an element by its unique ID and type text
    cy.get('#exampleInputPassword1').type('Password123')

    // 3. Class selector: Locate a submit button by its class name and click
    cy.get('.btn-success').click()
  })
})