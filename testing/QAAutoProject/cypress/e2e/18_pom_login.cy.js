import LoginPage from '../pages/LoginPage'

describe('Login Automation using Page Object Model (POM)', () => {

  let data

  before(() => {
    cy.fixture('loginData').then((d) => { data = d })
  })

  beforeEach(() => {
    LoginPage.navigate()
  })

  // ── TC1: Valid Login ────────────────────────
  it('TC1 - should login successfully with valid credentials', () => {
    LoginPage.login(data.validUser.username, data.validUser.password)

    LoginPage.verifyRedirectedToSecurePage()
    LoginPage.verifyFlashMessage(data.messages.loginSuccess)

    // Confirm dashboard element (Logout button)
    cy.get('a.button.secondary[href="/logout"]').should('be.visible')
  })

  // ── TC2: Invalid Username ───────────────────
  it('TC2 - should show error for invalid username', () => {
    LoginPage.login(data.invalidUser.username, data.invalidUser.password)

    LoginPage.verifyFlashMessage(data.messages.invalidUsername)
    LoginPage.verifyRemainsOnLoginPage()
  })

  // ── TC3: Invalid Password ───────────────────
  it('TC3 - should show error for invalid password', () => {
    LoginPage.login(data.invalidPassword.username, data.invalidPassword.password)

    LoginPage.verifyFlashMessage(data.messages.invalidPassword)
    LoginPage.verifyRemainsOnLoginPage()
  })

})