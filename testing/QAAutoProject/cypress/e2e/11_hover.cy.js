
describe('Hover DropDown and submenu Test', () => {
    it('should display and validate on Hover', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        
        // Trigger hover with force option and wait
        cy.get('#mousehover').trigger('mouseover', { force: true })
        
    
        
        // Verify the links
        cy.get('.mouse-hover-content a')
            .should('have.length', 2)
        
        cy.get('.mouse-hover-content')
            .should('contain', 'Top')
            .and('contain', 'Reload')
    })
})