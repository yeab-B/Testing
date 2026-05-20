describe('Selector Practice Test', () => {
  it('Uses ID, Class, and Attribute selectors', () => {

    cy.visit('https://rahulshettyacademy.com/angularpractice/')

    cy.get(':nth-child(1) > [name="name"]')
    .type('Alem')
    .should('have.value', 'Alem')

    cy.get('[name="email"]').type('test1@email.com')

    cy.get('#exampleInputPassword1').type('123456')

    cy.get('#exampleCheck1').check().should('be.checked')

    cy.get('#exampleFormControlSelect1').select('Female')
    
    cy.get('[name="bday"]').type('2002-09-02').should('have.value', '2002-09-02')
    cy.get('input[type="submit"]').click()

    cy.get('.alert-success').should('contain', 'Success')

  })
})