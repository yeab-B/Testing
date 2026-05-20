describe('Dynamic Web Table with Pagination', () => {

    it('Search and validate Rice row details', () => {

        // 🔹 Visit page
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')

        // 🔹 Search for Rice
        cy.get('#search-field')
            .type('Rice')

        //  make sure only one row appears
        cy.get('tbody tr')
            .should('have.length', 1)

         //  check item name
        cy.get('tbody tr td:nth-child(1)')
            .should('contain', 'Rice')

        // check for price exists
        cy.get('tbody tr td:nth-child(2)')
            .invoke('text')
            .should('not.be.empty')

        // check if discount exists
        cy.get('tbody tr td:nth-child(3)')
            .invoke('text')
            .should('not.be.empty')
    })

})