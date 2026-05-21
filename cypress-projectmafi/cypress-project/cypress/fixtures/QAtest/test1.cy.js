describe('Test Suite', () => { 
it('Test Case', () => { 
cy.visit('https://example.com') 
cy.get('h1').should('contain', 'Example') 
}) 
})  