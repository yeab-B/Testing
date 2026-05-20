/// <reference types="cypress" />

describe('Ex24 - Update Specific Cell in Excel', () => {

  const filePath  = 'cypress/fixtures/data/employees.xlsx'
  const sheetName = 'Sheet1'

  // ── TC1: Verify initial data before any updates ───────────────────────────
  it('TC1 - should read and verify original employee data', () => {

    cy.readExcel(filePath).then((rows) => {
      cy.log(`📊 Original data — ${rows.length} rows`)

      expect(rows[0]).to.include({ EmployeeID: 1, Name: 'Zelalem',  Department: 'HR',      Salary: 6000 })
      expect(rows[1]).to.include({ EmployeeID: 2, Name: 'Temesgen', Department: 'IT',      Salary: 5000 })
      expect(rows[2]).to.include({ EmployeeID: 3, Name: 'Hana',     Department: 'Finance', Salary: 7000 })

      cy.log('✅ Original data verified')
    })
  })

  // ── TC2: Update Zelalem's Salary (Row 0, col Salary) ─────────────────────
  it('TC2 - should update Salary of Zelalem from 6000 to 9000', () => {

    cy.updateExcelCell(filePath, sheetName, 0, 'Salary', 9000)
      .then((result) => {
        cy.log(result)
        expect(result).to.include('6000')
        expect(result).to.include('9000')
      })

    // Verify the update
    cy.readExcel(filePath).then((rows) => {
      expect(rows[0].Salary).to.equal(9000)
      cy.log('✅ Zelalem salary updated to 9000')
    })
  })

  // ── TC3: Update Temesgen's Department (Row 1, col Department) ────────────
  it('TC3 - should update Temesgen Department from IT to Engineering', () => {

    cy.updateExcelCell(filePath, sheetName, 1, 'Department', 'Engineering')
      .then((result) => {
        cy.log(result)
        expect(result).to.include('IT')
        expect(result).to.include('Engineering')
      })

    cy.readExcel(filePath).then((rows) => {
      expect(rows[1].Department).to.equal('Engineering')
      cy.log('✅ Temesgen department updated to Engineering')
    })
  })

  // ── TC4: Update Hana's Name (Row 2, col Name) ────────────────────────────
  it('TC4 - should update Hana Name to Hana Bekele', () => {

    cy.updateExcelCell(filePath, sheetName, 2, 'Name', 'Hana Bekele')
      .then((result) => {
        cy.log(result)
        expect(result).to.include('Hana')
        expect(result).to.include('Hana Bekele')
      })

    cy.readExcel(filePath).then((rows) => {
      expect(rows[2].Name).to.equal('Hana Bekele')
      cy.log('✅ Hana name updated to Hana Bekele')
    })
  })

  // ── TC5: Verify all updates together ─────────────────────────────────────
  it('TC5 - should verify all updated values are correct', () => {

    cy.readExcel(filePath).then((rows) => {

      cy.log('📊 Final state of Excel file:')
      rows.forEach((row, i) => {
        cy.log(`Row ${i + 1}: ${JSON.stringify(row)}`)
      })

      // Zelalem — salary updated
      expect(rows[0].Name).to.equal('Zelalem')
      expect(rows[0].Salary).to.equal(9000)

      // Temesgen — department updated
      expect(rows[1].Name).to.equal('Temesgen')
      expect(rows[1].Department).to.equal('Engineering')

      // Hana — name updated
      expect(rows[2].Name).to.equal('Hana Bekele')
      expect(rows[2].Department).to.equal('Finance')

      cy.log('✅ All updates verified successfully')
    })
  })

})