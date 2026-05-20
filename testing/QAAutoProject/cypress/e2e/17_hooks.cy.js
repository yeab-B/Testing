/// <reference types="cypress" />

/**
 * Cypress Test: Authentication Flow Using Before and After Hooks
 * Website: https://practicetestautomation.com/practice-test-login/
 *
 * Credentials: username = student | password = Password123
 *
 * Root Cause of Previous Error:
 *  Cypress resets the active page to about:blank between it() blocks.
 *  Without a cy.visit() in beforeEach, the URL becomes about:blank and
 *  all assertions fail. Fix: cy.visit() the dashboard URL in beforeEach
 *  so every test starts on the correct authenticated page.
 *
 * Hook Strategy:
 *  before()     → Login ONCE — establishes the authenticated session
 *  beforeEach() → cy.visit() the dashboard to restore page context
 *  after()      → Click "Log out" — verifies session is terminated
 */

describe('Authentication Flow Using Before and After Hooks', () => {

  const LOGIN_URL    = 'https://practicetestautomation.com/practice-test-login/'
  const DASHBOARD_URL = 'https://practicetestautomation.com/logged-in-successfully/'

  // ── before() — runs ONCE before all tests ─────────────────────────────────
  // Logs in one time. The browser session/cookies are preserved for all
  // subsequent it() blocks as long as Cypress doesn't clear them.
  before(() => {
    cy.log('🔐 BEFORE: Logging in once for the entire suite')

    cy.visit(LOGIN_URL)

    cy.get('#username')
      .should('be.visible')
      .clear()
      .type('student')

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type('Password123')

    cy.get('#submit')
      .should('be.visible')
      .click()

    // Confirm we landed on the authenticated dashboard
    cy.url({ timeout: 10000 })
      .should('include', 'logged-in-successfully')

    cy.log('✅ BEFORE: Session established — on dashboard')
  })

  // ── beforeEach() — runs before every individual test ──────────────────────
  // WHY cy.visit() here:
  //   Cypress resets the browser page to about:blank between it() blocks.
  //   Re-visiting the dashboard URL restores page context WITHOUT logging in
  //   again — the session cookie is still active from before().
  beforeEach(() => {
    cy.visit(DASHBOARD_URL)

    // Guard: confirm the page loaded correctly and we are still authenticated
    cy.url()
      .should('include', 'logged-in-successfully')

    cy.log('🔍 beforeEach: Dashboard restored — session still active')
  })

  // ── after() — runs ONCE after all tests ───────────────────────────────────
  // Clicks the "Log out" link and confirms the session is terminated.
  after(() => {
    cy.log('🔓 AFTER: Logging out to terminate session')

    // Navigate to dashboard first (after() also starts on about:blank)
    cy.visit(DASHBOARD_URL)

    // Click the "Log out" link — confirmed text from the live page
    cy.contains('a', 'Log out')
      .should('be.visible')
      .click()

    // Confirm redirect back to login page
    cy.url({ timeout: 8000 })
      .should('include', 'practice-test-login')

    // Login form should be visible again — session fully cleared
    cy.get('#username')
      .should('be.visible')

    cy.log('✅ AFTER: Logged out — session terminated successfully')
  })

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 1 — Verify page title after login
  // ══════════════════════════════════════════════════════════════════════════
  it('should display the correct page title after login', () => {

    cy.title()
      .should('include', 'Logged In Successfully')

    cy.log('✅ TEST 1 PASSED: Page title confirmed')
  })

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 2 — Verify the success heading is displayed
  // ══════════════════════════════════════════════════════════════════════════
  it('should show the success heading on the dashboard', () => {

    cy.get('h1, .post-title')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.include('Logged In Successfully')
        cy.log(`✅ TEST 2 PASSED: Heading — "${text.trim()}"`)
      })
  })

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 3 — Verify the congratulations message content
  // ══════════════════════════════════════════════════════════════════════════
  it('should display the congratulations message for the user', () => {

    cy.get('.post-content, article, main')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.toLowerCase()).to.include('congratulations')
        cy.log('✅ TEST 3 PASSED: Congratulations message found')
      })
  })

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 4 — Verify "Log out" link is visible (session is active)
  // ══════════════════════════════════════════════════════════════════════════
  it('should have a visible Log out link on the dashboard', () => {

    cy.contains('a', 'Log out')
      .should('exist')
      .and('be.visible')

    cy.log('✅ TEST 4 PASSED: Log out link visible — session is active')
  })

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 5 — Verify the full authenticated URL
  // ══════════════════════════════════════════════════════════════════════════
  it('should be on the correct authenticated URL', () => {

    cy.url()
      .should('include', 'practicetestautomation.com')
      .and('include', 'logged-in-successfully')

    cy.log('✅ TEST 5 PASSED: URL verified')
  })

})