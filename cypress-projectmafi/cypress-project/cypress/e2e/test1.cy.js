describe('Test Suite', () => { 
it('Test Case', () => { 
cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
cy.get('#checkBoxOption1').check().should('be.checked')
cy.get('#checkBoxOption1').uncheck().should('not.be.checked') 
cy.get('[name="dropdown-class-example"]').select('Option2')
cy.get('[name="dropdown-class-example"]').should('have.value', 'option2')
cy.get('#autocomplete').type('Eth') 
.should('have.value', 'ET') 
}) 
})  