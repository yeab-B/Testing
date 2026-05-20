describe('Navigating correctly', ()=>{
    it('Testing Correct Navigation',()=>{
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get(':nth-child(2) > .nav-link').should('have.attr', 'href', '/angularpractice/shop')
    })
})