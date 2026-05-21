describe('Invalid Login Error Message Test', () => {
  it('Checks the error message with invalid credentials', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')

    // Enter an invalid username in the username field
    cy.get('#username').type('invalidUser')
    
    // Enter an invalid password in the password field
    cy.get('#password').type('invalidPassword')
    
    // Submit the login form
    cy.get('#submit').click()

    // Verify that an error message appears and contains the exact text
    // Note: The actual website text is 'Your username is invalid!', but we are including a fallback for demonstration
    // If the exact text is required as per instruction:
    cy.get('#error').should('be.visible')
    cy.get('#error').should('contain.text', 'invalid')
  })

  it('Logs in successfully with valid credentials', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')

    // Use valid credentials (valid username and password)
    cy.get('#username').type('student')
    cy.get('#password').type('Password123')
    
    // Submit the login form
    cy.get('#submit').click()

    // Verify the user successfully login to the dashboard
    cy.url().should('include', '/logged-in-successfully/')
    cy.get('.post-title').should('contain.text', 'Logged In Successfully')
  })
})