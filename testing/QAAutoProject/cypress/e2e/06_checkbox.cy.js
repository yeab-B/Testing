describe('Checkbox Select', ()=>{
    it('Should check or uncheck', ()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('[name="checkBoxOption3"]').check().should('be.checked')
        cy.get('[name="checkBoxOption3"]').uncheck().should('not.be.checked')
    })
})

