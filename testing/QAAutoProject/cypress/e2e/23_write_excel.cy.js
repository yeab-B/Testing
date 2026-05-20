/// <reference types="cypress" />

/**
 * Ex22 - Write Data to Excel File
 *
 * Writes employee data to employeeData.xlsx
 * under the worksheet "EmployeeDetails"
 * then reads it back to verify.
 */

describe('Ex23 - Write Data to Excel File', () => {

  const filePath  = 'cypress/fixtures/data/employeeData.xlsx'
  const sheetName = 'EmployeeDetails'

  // Employee data matching the requirement exactly
  const employeeData = [
    { EmployeeID: 101, Name: 'Alice',   Department: 'HR',      Salary: 60000 },
    { EmployeeID: 102, Name: 'Bob',     Department: 'IT',      Salary: 75000 },
    { EmployeeID: 103, Name: 'Charlie', Department: 'Finance', Salary: 65000 },
  ]

  // ── TC1: Write employee data to Excel ──────────────────────────────────────
  it('TC1 - should write employee data to employeeData.xlsx', () => {

    cy.writeExcel(filePath, sheetName, employeeData).then((result) => {
      cy.log(result)
      expect(result).to.include('Excel file written to')
    })
  })

  // ── TC2: Verify file was created by reading it back ────────────────────────
  it('TC2 - should read back the written Excel and verify row count', () => {

    cy.readExcel(filePath).then((rows) => {
      cy.log(`📊 Rows found: ${rows.length}`)

      expect(rows.length).to.equal(3)
    })
  })

  // ── TC3: Verify first employee row (Alice) ─────────────────────────────────
  it('TC3 - should verify first employee row is Alice from HR', () => {

    cy.readExcel(filePath).then((rows) => {
      const alice = rows[0]
      cy.log(`Row 1: ${JSON.stringify(alice)}`)

      expect(alice.EmployeeID).to.equal(101)
      expect(alice.Name).to.equal('Alice')
      expect(alice.Department).to.equal('HR')
      expect(alice.Salary).to.equal(60000)
    })
  })

  // ── TC4: Verify second employee row (Bob) ──────────────────────────────────
  it('TC4 - should verify second employee row is Bob from IT', () => {

    cy.readExcel(filePath).then((rows) => {
      const bob = rows[1]
      cy.log(`Row 2: ${JSON.stringify(bob)}`)

      expect(bob.EmployeeID).to.equal(102)
      expect(bob.Name).to.equal('Bob')
      expect(bob.Department).to.equal('IT')
      expect(bob.Salary).to.equal(75000)
    })
  })

  // ── TC5: Verify third employee row (Charlie) ───────────────────────────────
  it('TC5 - should verify third employee row is Charlie from Finance', () => {

    cy.readExcel(filePath).then((rows) => {
      const charlie = rows[2]
      cy.log(`Row 3: ${JSON.stringify(charlie)}`)

      expect(charlie.EmployeeID).to.equal(103)
      expect(charlie.Name).to.equal('Charlie')
      expect(charlie.Department).to.equal('Finance')
      expect(charlie.Salary).to.equal(65000)
    })
  })

  // ── TC6: Verify all rows have required fields ──────────────────────────────
  it('TC6 - should verify all rows have all four required columns', () => {

    cy.readExcel(filePath).then((rows) => {

      rows.forEach((row, index) => {
        cy.log(`Validating row ${index + 1}: ${JSON.stringify(row)}`)

        expect(row).to.have.property('EmployeeID')
        expect(row).to.have.property('Name')
        expect(row).to.have.property('Department')
        expect(row).to.have.property('Salary')

        expect(row.EmployeeID).to.be.a('number')
        expect(row.Name).to.be.a('string').and.not.be.empty
        expect(row.Department).to.be.a('string').and.not.be.empty
        expect(row.Salary).to.be.a('number').and.be.greaterThan(0)

        cy.log(`✅ Row ${index + 1} — ${row.Name} validated`)
      })
    })
  })

})