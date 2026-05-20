describe('Drop Down selection',()=>{
    it('select',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('[name="dropdown-class-example"]').select('option1')
        cy.get('[name="dropdown-class-example"]').should('have.value', 'option1')
    })
})