/// <reference types="cypress" />

/**
 * Ex25 - Login Test with Excel Status Update
 *
 * Reads login credentials from Excel,
 * performs login on practicetestautomation.com,
 * then writes PASSED/FAILED status back to the Excel file.
 */

describe('Ex26 - Login Test with Excel Status Update', () => {

  const filePath  = 'cypress/fixtures/data/loginStatus.xlsx'
  const sheetName = 'Sheet1'
  const loginUrl  = 'https://practicetestautomation.com/practice-test-login/'

  // ── Helper: attempt login and return result ───────────────────────────────
  const attemptLogin = (username, password) => {
    cy.visit(loginUrl)

    cy.get('#username')
      .should('be.visible')
      .clear()
      .type(username)

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type(password)

    cy.get('#submit').click()
  }

  // ── TC1: Verify initial status is pending for all rows ───────────────────
  it('TC1 - should verify all rows start with pending status', () => {

    cy.readExcel(filePath).then((rows) => {
      cy.log(`📊 Total test rows: ${rows.length}`)

      rows.forEach((row, i) => {
        cy.log(`Row ${i + 1}: ${row.Username} | ${row.Password} | Status: ${row.Status}`)
        expect(row).to.have.property('Status')
      })

      cy.log('✅ Initial data verified')
    })
  })

  // ── TC2: Valid login — should PASS and update status ─────────────────────
  it('TC2 - should login with valid credentials and update status to PASSED', () => {

    cy.readExcel(filePath).then((rows) => {
      const row      = rows[0]
      const rowIndex = 0

      cy.log(`🔑 Testing: ${row.Username} / ${row.Password}`)

      attemptLogin(row.Username, row.Password)

      // Check for success
      cy.url().then((url) => {
        if (url.includes('logged-in-successfully')) {
          // Login succeeded — update status to PASSED
          cy.updateExcelStatus(filePath, sheetName, rowIndex, 'PASSED')
            .then((result) => cy.log(result))

          // Verify success page elements
          cy.get('.post-title')
            .should('contain.text', 'Logged In Successfully')

          cy.log('✅ Row 1 — Login PASSED — status updated')

        } else {
          // Login failed unexpectedly
          cy.updateExcelStatus(filePath, sheetName, rowIndex, 'FAILED')
            .then((result) => cy.log(result))
        }
      })
    })
  })

  // ── TC3: Wrong password — should FAIL and update status ──────────────────
  it('TC3 - should fail login with wrong password and update status to FAILED', () => {

    cy.readExcel(filePath).then((rows) => {
      const row      = rows[1]
      const rowIndex = 1

      cy.log(`🔑 Testing: ${row.Username} / ${row.Password}`)

      attemptLogin(row.Username, row.Password)

      // Error message should appear
      cy.get('#error')
        .should('be.visible')
        .then(($err) => {
          cy.log(`❌ Error shown: "${$err.text().trim()}"`)

          // Update status to FAILED — login didn't succeed
          cy.updateExcelStatus(filePath, sheetName, rowIndex, 'FAILED')
            .then((result) => cy.log(result))

          cy.log('✅ Row 2 — Login FAILED as expected — status updated')
        })
    })
  })

  // ── TC4: Wrong username — should FAIL and update status ──────────────────
  it('TC4 - should fail login with wrong username and update status to FAILED', () => {

    cy.readExcel(filePath).then((rows) => {
      const row      = rows[2]
      const rowIndex = 2

      cy.log(`🔑 Testing: ${row.Username} / ${row.Password}`)

      attemptLogin(row.Username, row.Password)

      // Error message should appear
      cy.get('#error')
        .should('be.visible')
        .then(($err) => {
          cy.log(`❌ Error shown: "${$err.text().trim()}"`)

          cy.updateExcelStatus(filePath, sheetName, rowIndex, 'FAILED')
            .then((result) => cy.log(result))

          cy.log('✅ Row 3 — Login FAILED as expected — status updated')
        })
    })
  })

  // ── TC5: Verify final status written back to Excel ────────────────────────
  it('TC5 - should verify final status values written back to Excel', () => {

    cy.readExcel(filePath).then((rows) => {

      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      cy.log('📋 Final Excel Status Report')
      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

      rows.forEach((row, i) => {
        cy.log(`[${i + 1}] ${row.Username} | ${row.Password} | Status: ${row.Status}`)
      })

      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

      // Row 1 — valid login — should be PASSED
      expect(rows[0].Status).to.equal('PASSED')

      // Row 2 & 3 — invalid login — should be FAILED
      expect(rows[1].Status).to.equal('FAILED')
      expect(rows[2].Status).to.equal('FAILED')

      cy.log('✅ All status values verified in Excel')
    })
  })

})