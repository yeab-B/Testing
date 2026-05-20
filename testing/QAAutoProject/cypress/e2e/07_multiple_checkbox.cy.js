describe('Multiple checkbox check',()=>{
    it('check more than one checkboxes', ()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('input[type="checkbox"]').check(['option1', 'option3'])
        cy.get('#checkBoxOption1').should('be.checked')
        cy.get('#checkBoxOption3').should('be.checked')

    })
})

// describe('Multiple checkbox check', () => {

//     it('check more than one checkboxes', () => {

//         cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

//         cy.get('input[type="checkbox"]')
//             .check(['option1', 'option2'])

//         cy.get('#checkBoxOption1').should('be.checked')
//         cy.get('#checkBoxOption2').should('be.checked')

//     })

// })