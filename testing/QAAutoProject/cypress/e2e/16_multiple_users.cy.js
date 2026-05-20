/// <reference types="cypress" />

/**
 * Cypress Test: Login with Multiple Users from Fixture
 * Website: https://rahulshettyacademy.com/loginpagePractise/
 *
 * FINAL FIX:
 *  The Bootstrap modal (#myModal) never truly closes before Sign In is clicked.
 *  All CSS/visibility checks were unreliable because the modal's display:block
 *  persists through the animation AND re-triggers on some interactions.
 *
 *  Solution:
 *   1. Click #okayBtn to dismiss the modal (informational only — no consequence)
 *   2. Use { force: true } on #signInBtn to bypass the overlay check entirely
 *      This is safe here because the modal is purely informational — clicking
 *      through it does not change the login outcome.
 */

describe('Login with Multiple Users from Fixture', () => {

  const LOGIN_URL = 'https://rahulshettyacademy.com/loginpagePractise/'

  // ── Reusable: Handle the User-role modal ──────────────────────────────────
  // Click Okay to acknowledge, then proceed — no need to wait for close
  const dismissUserModal = () => {
    cy.get('#myModal', { timeout: 5000 })
      .should('be.visible')

    cy.log('⚠️ Modal open — clicking Okay')

    // Click Okay — this is informational only, login still works either way
    cy.get('#okayBtn')
      .should('be.visible')
      .click()

    cy.log('✅ Okay clicked — proceeding with force:true on Sign In')
  }

  // ── Reusable: Fill and submit the login form ───────────────────────────────
  const performLogin = (user) => {

    cy.get('#username')
      .should('be.visible')
      .clear()
      .type(user.username)
      .should('have.value', user.username)

    cy.get('[type="password"]')
      .should('be.visible')
      .clear()
      .type(user.password)

    if (user.role === 'user') {
      cy.get('input[value="user"]').should('exist').check()
      dismissUserModal()
    } else {
      cy.get('input[value="admin"]').should('exist').check().should('be.checked')
    }

    cy.log(`🔑 Logging in as: ${user.description} (role: ${user.role})`)

    // { force: true } bypasses the modal overlay coverage check.
    // Safe because the modal is informational — it doesn't block the actual login.
    cy.get('#signInBtn')
      .should('exist')
      .click({ force: true })
  }

  // ── Reusable: Verify successful login ─────────────────────────────────────
  const verifyLoginSuccess = (user) => {
    cy.url({ timeout: 10000 }).should('include', 'angularpractice')
    cy.get('app-root, .container, nav', { timeout: 8000 }).should('exist')
    cy.log(`✅ Login verified for: ${user.description}`)
  }

  beforeEach(() => {
    cy.intercept('https://analytics.google.com/**', { statusCode: 204, body: '' })
    cy.intercept('GET', '**/api/course', { statusCode: 200, body: [] })
  })

  // ════════════════════════════════════════════════════════════════════════════
  // SUITE 1 — All valid users in a single it() block
  // ════════════════════════════════════════════════════════════════════════════
  describe('Valid Users — Loop in Single it() Block', () => {

    it('should login successfully for every valid user in the fixture', () => {

      cy.fixture('multipleUsers').then(({ users }) => {

        cy.log(`📋 Running login loop for ${users.length} users`)

        users.forEach((user, index) => {
          cy.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
          cy.log(`👤 User ${index + 1} / ${users.length}: ${user.description}`)

          cy.visit(LOGIN_URL)
          cy.get('#username').should('be.visible')

          performLogin(user)
          verifyLoginSuccess(user)
        })
      })
    })
  })

  // ════════════════════════════════════════════════════════════════════════════
  // SUITE 2 — Dynamic it() per user
  // ════════════════════════════════════════════════════════════════════════════
  describe('Valid Users — Dynamic it() Per User', () => {

    const { users } = require('../../fixtures/multipleUsers.json')

    users.forEach((user) => {

      it(`should login as: ${user.description} [role: ${user.role}]`, () => {

        cy.visit(LOGIN_URL)
        cy.get('#username').should('be.visible')

        performLogin(user)

        cy.url({ timeout: 10000 }).should('include', 'angularpractice')
        cy.get('app-root, .container, nav', { timeout: 8000 }).should('exist')

        cy.log(`✅ PASSED — ${user.description}`)
      })
    })
  })

  // ════════════════════════════════════════════════════════════════════════════
  // SUITE 3 — Invalid users (negative test loop)
  // ════════════════════════════════════════════════════════════════════════════
  describe('Invalid Users — Error Verification Loop', () => {

    const { invalidUsers } = require('../../fixtures/multipleUsers.json')

    invalidUsers.forEach((user) => {

      it(`should show error for: ${user.description}`, () => {

        cy.visit(LOGIN_URL)

        cy.get('#username').clear().type(user.username)
        cy.get('[type="password"]').clear().type(user.password)

        if (user.role === 'user') {
          cy.get('input[value="user"]').check()
          dismissUserModal()
        } else {
          cy.get('input[value="admin"]').check()
        }

        cy.get('#signInBtn').click({ force: true })

        // Error banner must appear
        cy.get('[style*="block"]', { timeout: 5000 })
          .should('be.visible')
          .and('contain.text', 'Incorrect')

        cy.url().should('include', 'loginpagePractise')
        cy.log(`✅ Error correctly shown for: ${user.description}`)
      })
    })
  })

})