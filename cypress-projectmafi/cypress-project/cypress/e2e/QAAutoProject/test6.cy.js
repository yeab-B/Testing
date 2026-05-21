describe('Checkbox Select and Unselect Test', () => {
  it('Selects and unselects a checkbox and verifies state', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    // Locate a checkbox element
    const checkbox = cy.get('#checkBoxOption1')

    // Select (check) the checkbox
    checkbox.check()
    
    // Verify that the checkbox is marked as selected
    checkbox.should('be.checked')
    
    // Unselect (uncheck) the checkbox
    checkbox.uncheck()
    
    // Verify that the checkbox is no longer selected
    checkbox.should('not.be.checked')
  })
})