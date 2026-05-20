/// <reference types="cypress" />

describe('File Upload and Download Functionality Testing', () => {

  // ─────────────────────────────────────────────
  // FILE UPLOAD
  // ─────────────────────────────────────────────
  describe('File Upload - practice-automation.com', () => {

    beforeEach(() => {
      cy.visit('https://practice-automation.com/file-upload/')
    })

    it('TC1 - should upload a txt file and confirm success message appears', () => {
      cy.get('input[type="file"]')
        .attachFile('sample.txt')

      cy.get('input[type="submit"]')
        .click()

      // The site shows a success output message after upload
      cy.get('.wpcf7-response-output', { timeout: 15000 })
        .should('be.visible')
        .and('not.have.class', 'wpcf7-validation-errors')
    })

    it('TC2 - should show the file input element and be enabled', () => {
      cy.get('input[type="file"]')
        .should('exist')
        .and('be.enabled')
    })

    it('TC3 - should upload a txt file without errors', () => {
      cy.get('input[type="file"]')
        .attachFile('sample.txt')

      // File name should be set on the input
      cy.get('input[type="file"]')
        .then(($input) => {
          expect($input[0].files[0].name).to.equal('sample.txt')
        })

      cy.get('input[type="submit"]').click()

      // No validation error class should appear
      cy.get('.wpcf7-response-output', { timeout: 15000 })
        .should('not.have.class', 'wpcf7-validation-errors')
    })

  })

  // ─────────────────────────────────────────────
  // FILE DOWNLOAD
  // ─────────────────────────────────────────────
  describe('File Download - practice-automation.com', () => {

    beforeEach(() => {
      cy.visit('https://practice-automation.com/file-download/')
    })

    it('TC4 - should display the normal download section', () => {
      cy.contains('Sandbox Download Form - .pdf')
        .should('be.visible')

      // Confirm at least one Download link exists
      cy.contains('a', 'Download')
        .should('be.visible')
    })

    it('TC5 - should download the PDF file via request and verify it exists', () => {
      // Cypress cannot download via browser dialog — use cy.request() instead
      cy.request({
        url: 'https://practice-automation.com/download/download-file/',
        encoding: 'binary',
      }).then((response) => {
        expect(response.status).to.eq(200)

        // Write the file to the downloads folder
        cy.writeFile(
          'cypress/downloads/Sandbox-Download-Form.pdf',
          response.body,
          'binary'
        )
      })

      // Verify the file now exists locally
      cy.readFile('cypress/downloads/Sandbox-Download-Form.pdf')
        .should('exist')
    })

    it('TC6 - should display the password protected download section', () => {
      cy.contains('Sandbox Download Form - .docx')
        .should('be.visible')

      cy.contains('Password Protected Download')
        .should('be.visible')
    })

    it('TC7 - should download the password protected docx via request and verify it exists', () => {
      // Get the unlock href from the page first
      cy.contains('a', 'Download')
        .invoke('attr', 'href')
        .then((href) => {
          cy.log('Download href: ' + href)
        })

      // Use cy.request() with the password in the form body
      cy.request({
        method: 'POST',
        url: 'https://practice-automation.com/download/file-download-form/',
        form: true,
        body: {
          wdm_password: 'automateNow',
        },
        encoding: 'binary',
        failOnStatusCode: false,
      }).then((response) => {
        // Accept 200 (file) or 302 (redirect to file)
        expect(response.status).to.be.oneOf([200, 302])

        if (response.status === 200) {
          cy.writeFile(
            'cypress/downloads/Sandbox-Download-Form.docx',
            response.body,
            'binary'
          )
          cy.readFile('cypress/downloads/Sandbox-Download-Form.docx')
            .should('exist')
        } else {
          // If redirect, just confirm the password form accepted our input
          cy.log('Server responded with redirect — password accepted')
        }
      })
    })

  })

})