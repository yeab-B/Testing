describe('Dropdown Option Selection Test', () => {
  it('Selects an option from the dropdown', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    // Locate the dropdown element and select an option
    cy.get('#dropdown-class-example').select('option2')
    
    // Verify that the selected option is displayed correctly in the dropdown
    cy.get('#dropdown-class-example').should('have.value', 'option2')
    cy.get('#dropdown-class-example option:selected').should('have.text', 'Option2')
  })
})