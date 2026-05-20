describe('Login Using Fixture Data', () => {

  before(function () {
    cy.fixture('login').then(function (data) {
      this.login = data
    })
  })

  it('should login successfully using fixture credentials', function () {

    // 1. Visit the login page
    cy.visit('https://rahulshettyacademy.com/loginpagePractise/')

    // 2. Enter username from fixture
    cy.get('#username')
      .should('be.visible')
      .clear()
      .type(this.login.username)

    // 3. Enter password from fixture
    cy.get('[type="password"]')
      .should('be.visible')
      .clear()
      .type(this.login.password)

    // 4. Click the Sign In button
    cy.get('#signInBtn').click()

    // ✅ FIX: Use the actual redirected URL
    cy.url().should('include', 'angularpractice/shop')

    // ✅ FIX: Verify a product card is visible on the shop page
    cy.get('.card-title').first().should('be.visible')
  })

})