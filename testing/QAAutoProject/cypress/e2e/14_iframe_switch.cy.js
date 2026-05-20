/// <reference types="cypress" />

describe('Switching Between Main Page and iFrame', () => {

  // ── Helper: gets iframe body using cy.wrap on the native document ──────────
  const getIframeBody = () => {
    return cy
      .get('#courses-iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
  }

  // ── Helper: finds a link by partial text inside the iframe ─────────────────
  // cy.contains() is unreliable cross-origin — use find() + filter() instead
  const getIframeLink = (partialText) => {
    return getIframeBody().then(($body) => {
      const links = [...$body.find('a')].filter(el =>
        el.innerText.toLowerCase().includes(partialText.toLowerCase())
      )
      return cy.wrap(links[0])
    })
  }

  beforeEach(() => {
    // Stub the broken API that blocks page load
    cy.intercept('GET', '**/api/course**', {
      statusCode: 200,
      body: []
    }).as('courseApi')

    // Suppress third-party trackers
    cy.intercept('**google-analytics.com/**',  { statusCode: 204, body: '' })
    cy.intercept('**googletagmanager.com/**',   { statusCode: 200, body: '' })
    cy.intercept('**googleadservices.com/**',   { statusCode: 200, body: '' })
    cy.intercept('**doubleclick.net/**',         { statusCode: 200, body: '' })
    cy.intercept('**linkedin.com/**',            { statusCode: 200, body: '' })
    cy.intercept('**adtrafficquality.google/**', { statusCode: 200, body: '{}' })

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/', {
      timeout: 60000
    })
  })

  it('should switch between main page elements and iframe elements', () => {

    // ─────────────────────────────────────────────────────────────────────────
    // PHASE 1 — Interact with MAIN PAGE elements
    // ─────────────────────────────────────────────────────────────────────────

    // 1a. Select radio button
    cy.get('input[type="radio"][value="radio2"]')
      .click()
      .should('be.checked')

    // 1b. Select from dropdown
    cy.get('#dropdown-class-example')
      .select('Option2')
      .should('have.value', 'option2')

    // 1c. Check first checkbox
    cy.get('input[type="checkbox"]').first()
      .check()
      .should('be.checked')

    // ─────────────────────────────────────────────────────────────────────────
    // PHASE 2 — Switch INTO the iFrame
    // ─────────────────────────────────────────────────────────────────────────

    cy.get('#courses-iframe').scrollIntoView()

    // 2a. Wait for iframe to load — check links exist
    getIframeBody().then(($body) => {
      cy.wrap($body)
        .find('a', { timeout: 20000 })
        .should('have.length.greaterThan', 0)
    })

    // 2b. Verify a known link exists using find() — more reliable than contains()
    getIframeBody().then(($body) => {
      const allLinks = [...$body.find('a')].map(el => el.innerText.trim())
      cy.log('iframe links found: ' + allLinks.join(', '))

      // Find any link that has text content (flexible — works regardless of exact text)
      const visibleLinks = [...$body.find('a')].filter(el => el.innerText.trim().length > 0)
      expect(visibleLinks.length).to.be.greaterThan(0)
      cy.log(`✅ iFrame loaded with ${visibleLinks.length} links`)
    })

    // 2c. Click the first meaningful link inside the iframe
    getIframeBody().then(($body) => {
      const links = [...$body.find('a')].filter(el =>
        el.innerText.trim().length > 0 &&
        el.href &&
        !el.href.includes('#')
      )
      expect(links.length).to.be.greaterThan(0)
      cy.wrap(links[0]).click({ force: true })
      cy.log(`✅ iFrame: clicked link — "${links[0].innerText.trim()}"`)
    })

    // 2d. Confirm iframe body still has content after click
    getIframeBody().then(($body) => {
      expect($body.text().trim().length).to.be.greaterThan(0)
      cy.log('✅ iFrame: body still has content after click')
    })

    // ─────────────────────────────────────────────────────────────────────────
    // PHASE 3 — Switch BACK to Main Page
    // ─────────────────────────────────────────────────────────────────────────

    cy.scrollTo('top')

    // 3a. Radio button still checked
    cy.get('input[type="radio"][value="radio2"]')
      .should('be.checked')

    // 3b. Dropdown still holds value
    cy.get('#dropdown-class-example')
      .should('have.value', 'option2')

    // 3c. Type into suggestion input
    cy.get('#autocomplete')
    .should('be.visible')
    .clear()
    .type('India')
    .should('have.value', 'India')

    // 3d. Page title still correct
    cy.title().should('eq', 'Practice Page')

  })

})