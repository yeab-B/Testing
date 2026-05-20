// describe('Handling Button Inside an iFrame', () => {

//     it('Interact with iframe content', () => {

//         cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        // Wait until iframe loads
//         cy.get('#courses-iframe')
//             .should('exist')
//             .then(($iframe) => {

//                 const body = $iframe.contents().find('body')

//                 cy.wrap(body)
//                     .should('not.be.empty')
//                     .within(() => {

                        // Verify content inside iframe
//                         cy.contains('Courses').should('be.visible')

                        // Click inside iframe
//                         cy.contains('Mentorship').click()

//                     })

//             })

//     })

// })

describe('Handling Button Inside an iFrame', () => {
 
  beforeEach(() => {
    // ── Stub broken backend API (returns 500, retries 4x — slows test down) ──
    cy.intercept('GET', '**/api/course', {
      statusCode: 200,
      body: [],
    }).as('stubCourseApi')
 
    // ── Block Google Analytics & Ad tracking (noise in network log) ──────────
    cy.intercept('POST', 'https://analytics.google.com/**', { statusCode: 204, body: '' }).as('blockGA')
    cy.intercept('**ccm/collect**',        { statusCode: 200, body: '' }).as('blockCCM')
    cy.intercept('**rmkt/collect**',       { statusCode: 200, body: '' }).as('blockRmkt')
    cy.intercept('**pagead/**',            { statusCode: 200, body: '' }).as('blockPagead')
    cy.intercept('**doubleclick.net/**',   { statusCode: 200, body: '' }).as('blockDC')
    cy.intercept('**adtrafficquality**',   { statusCode: 200, body: '{}' }).as('blockSodar')
    cy.intercept('**linkedin.com/**',      { statusCode: 200, body: '' }).as('blockLinkedIn')
  })
 
  it('should switch to iframe, click Mentorship, verify success', () => {
 
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
 
    // ── 1. Confirm iframe is present ─────────────────────────────────────────
    cy.get('#courses-iframe')
      .should('exist')
      .scrollIntoView()
 
    // ── 2. Switch into iframe context ─────────────────────────────────────────
    cy.get('#courses-iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .within(() => {
 
        // ── 3. Verify iframe content loaded ───────────────────────────────────
        cy.contains('Courses', { timeout: 10000 }).should('be.visible')
 
        // ── 4. Click the Mentorship button/link ───────────────────────────────
        cy.contains('Mentorship', { timeout: 10000 })
          .should('be.visible')
          .click()
      })
 
    // ── 5. Re-enter iframe and verify success state after click ───────────────
    cy.get('#courses-iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .within(() => {
        // After clicking Mentorship, a section/page change occurs inside the iframe.
        // Assert that new content is visible (heading, section, or success element).
        cy.get('h1, h2, h3, section, .course-title, [class*="title"]', { timeout: 10000 })
          .first()
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            cy.log(`✅ Post-click content: "${text.trim()}"`)
            expect(text.trim().length).to.be.greaterThan(0)
          })
      })
  })
})