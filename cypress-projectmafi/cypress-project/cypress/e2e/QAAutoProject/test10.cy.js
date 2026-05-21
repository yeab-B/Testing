describe('Testing Different Types of Alerts', () => {
  it('Handles alert, confirmation, and prompt', () => {
    cy.visit('https://vinothqaacademy.com/alert-and-popup/')

    // 1. Alert Box
    cy.get('button[name="alertbox"]').click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('I am an alert box!')
    })

    // 2. Confirmation Box (Accept)
    cy.get('button[name="confirmalertbox"]').click()
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Confirm') 
      return true // Accept the alert
    })
    cy.get('#demo').should('contain.text', 'You clicked on OK!')

    // 3. Prompt Box
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Cypress Test Input')
    })
    cy.get('button[name="promptbox"]').click()
    // Validate the result displayed on the page
    cy.get('#demo').should('contain.text', 'Cypress Test Input')
  })
})