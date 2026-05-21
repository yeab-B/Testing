describe('Modal Window Visibility Test', () => {
  it('Verifies modal window behavior', () => {
    cy.visit('https://demoqa.com/modal-dialogs')

    // Check that the modal window is not visible by default
    cy.get('.modal-content').should('not.exist')

    // Click the button that opens the modal window
    cy.get('#showSmallModal').click()

    // Verify that the modal window becomes visible after clicking the button
    cy.get('.modal-content').should('be.visible')
    cy.get('.modal-body').should('contain.text', 'This is a small modal')
  })
})