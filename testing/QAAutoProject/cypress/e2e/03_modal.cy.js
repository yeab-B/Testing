describe('Modal Test suite',() => {
    it('Test case', ()=>{
        cy.visit('https://demoqa.com/modal-dialogs')
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-4').should('not.exist')
        cy.get('#showSmallModal').click()
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-4').should('be.visible')
        cy.contains('This is a small modal').should('be.visible')
    })
})