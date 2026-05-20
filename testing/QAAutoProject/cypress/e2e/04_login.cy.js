describe('Login functionality', ()=>{
    it('Invalid Login Test', ()=>{
        cy.visit('https://practicetestautomation.com/practice-test-login/')
        cy.get('[name="username"]').type('student1')
        cy.get('[name="password"]').type('password')
        cy.get('#submit').click()
        cy.get('#error').should('be.visible').and('contain.text', 'invalid')
    })
    it('Valid Login Test', ()=>{
        cy.visit('https://practicetestautomation.com/practice-test-login/')
        cy.get('[name="username"]').type('student')
        cy.get('[name="password"]').type('Password123')
        cy.get('#submit').click()
        cy.url().should('include', '/logged-in-successfully/')
        cy.contains('Congratulations').should('be.visible')
    })
})