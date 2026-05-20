// describe('Enable a checkbox',()=>{
//     it('verify if element is disabled then enable it',()=>{
//         cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

//     })
// })

describe('Disabled/Enabled Element Test', () => {

    it('Verify element is disabled and then enabled', () => {

        // 🔹 Visit the page
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        // 🔹 Locate the input field (initially enabled, so we disable it first)
        cy.get('[name="show-hide"]')
            .should('be.visible')

        // 🔹 Click Disable button
        cy.get('#hide-textbox').click()

        // 🔹 Verify input is disabled
        cy.get('[name="show-hide"]')
            .should('not.be.visible')

        // 🔹 Click Enable button
        cy.get('#show-textbox').click()

        // 🔹 Verify input is enabled again
        cy.get('[name="show-hide"]')
            .should('be.visible')

        // 🔹 Interact with it (prove it's usable)
        cy.get('[name="show-hide"]')
            .type('Now it works!')
            .should('have.value', 'Now it works!')

    })

})