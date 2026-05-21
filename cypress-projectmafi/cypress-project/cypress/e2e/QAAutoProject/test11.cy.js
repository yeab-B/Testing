describe('Handling Dropdown with Hover and Submenu', () => {
  it('Hovers over menu to display submenu', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    // Hover over the element that triggers the submenu ('Mouse Hover' button)
    // Cypress uses invoke('show') to reveal hidden elements that appear on hover
    cy.get('.mouse-hover-content').invoke('show')
    
    // Verify that the submenu is displayed
    cy.get('.mouse-hover-content').should('be.visible')
    
    // Validate the content of the submenu (e.g., correct items are visible)
    cy.contains('.mouse-hover-content a', 'Top').should('be.visible')
    cy.contains('.mouse-hover-content a', 'Reload').should('be.visible')
    
    // Optionally click an item
    cy.contains('.mouse-hover-content a', 'Top').click()
    cy.url().should('include', 'top')
  })
})