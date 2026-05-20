/// <reference types="cypress" />

/**
 * Ex21 - Reading Data from Excel File
 *
 * Reads testData.xlsx from cypress/fixtures/data/
 * Logs each row and validates the data structure.
 */

/**Exercise 20 is generating machawesome report in html format and 
 * exercise 21 is about connecting and updating to cypress cloud dashboard */

describe('Ex22 - Read Data from Excel File', () => {

  const excelFilePath = 'cypress/fixtures/data/testData.xlsx'

  // ── TC1: Read Excel and log all rows ──────────────────────────────────────
  it('TC1 - should read Excel file and log each row to console', () => {

    cy.readExcel(excelFilePath).then((rows) => {

      // Log total rows found
      cy.log(`📊 Total rows read from Excel: ${rows.length}`)
      console.log('Excel Data:', rows)

      // Log each row individually
      rows.forEach((row, index) => {
        cy.log(`Row ${index + 1} → Username: "${row.Username}" | Password: "${row.Password}"`)
        console.log(`Row ${index + 1}:`, row)
      })

      // Validate we got the correct number of rows
      expect(rows.length).to.equal(2)
    })
  })

  // ── TC2: Validate first row data ──────────────────────────────────────────
  it('TC2 - should validate first row contains correct data', () => {

    cy.readExcel(excelFilePath).then((rows) => {

      const firstRow = rows[0]
      cy.log(`First row: ${JSON.stringify(firstRow)}`)

      expect(firstRow).to.have.property('Username', 'User1')
      expect(firstRow).to.have.property('Password', 'admin')
    })
  })

  // ── TC3: Validate second row data ─────────────────────────────────────────
  it('TC3 - should validate second row contains correct data', () => {

    cy.readExcel(excelFilePath).then((rows) => {

      const secondRow = rows[1]
      cy.log(`Second row: ${JSON.stringify(secondRow)}`)

      expect(secondRow).to.have.property('Username', 'password123')
      expect(secondRow).to.have.property('Password', 'adminPass')
    })
  })

  // ── TC4: Validate all rows have required fields ───────────────────────────
  it('TC4 - should validate all rows have Username and Password fields', () => {

    cy.readExcel(excelFilePath).then((rows) => {

      rows.forEach((row, index) => {
        cy.log(`Validating row ${index + 1}...`)

        // Every row must have both fields
        expect(row).to.have.property('Username')
        expect(row).to.have.property('Password')

        // Neither field should be empty
        expect(row.Username).to.not.be.empty
        expect(row.Password).to.not.be.empty

        cy.log(`✅ Row ${index + 1} validated — Username: "${row.Username}"`)
      })
    })
  })

  // ── TC5: Use Excel data dynamically ───────────────────────────────────────
  it('TC5 - should loop through Excel rows and log credentials', () => {

    cy.readExcel(excelFilePath).then((rows) => {

      cy.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
      cy.log(`📋 Excel Credentials Report`)
      cy.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

      rows.forEach((row, index) => {
        cy.log(`[${index + 1}] Username: ${row.Username} | Password: ${row.Password}`)
      })

      cy.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
      cy.log(`✅ All ${rows.length} rows processed successfully`)
    })
  })

})