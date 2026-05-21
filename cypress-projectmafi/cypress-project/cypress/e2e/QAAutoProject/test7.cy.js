describe('Multiple Checkbox Selection Test', () => {
  it('Selects multiple checkboxes by their value attributes', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    // Locate at least two different checkboxes by their value attributes and select them
    cy.get('input[type="checkbox"]').check(['option2', 'option3'])
    
    // Verify that each chosen checkbox is marked as selected
    cy.get('input[value="option2"]').should('be.checked')
    cy.get('input[value="option3"]').should('be.checked')
  })
})