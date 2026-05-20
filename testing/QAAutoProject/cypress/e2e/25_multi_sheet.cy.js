/// <reference types="cypress" />

describe('Ex25 - Load Data from Multiple Excel Sheets', () => {

  const filePath = 'cypress/fixtures/data/multiSheet.xlsx'

  // ── TC1: Read all sheets and display sheet names ──────────────────────────
  it('TC1 - should load all sheets and display their names', () => {

    cy.readMultipleSheets(filePath).then((sheets) => {
      const sheetNames = Object.keys(sheets)

      cy.log(`📊 Sheets found: ${sheetNames.join(', ')}`)
      console.log('All sheets:', sheetNames)

      expect(sheetNames).to.have.length(3)
      expect(sheetNames).to.include('LoginData')
      expect(sheetNames).to.include('EmployeeInfo')
      expect(sheetNames).to.include('SalaryInfo')

      cy.log('✅ All 3 sheets loaded successfully')
    })
  })

  // ── TC2: Display and validate LoginData sheet ─────────────────────────────
  it('TC2 - should display all rows from LoginData sheet', () => {

    cy.readMultipleSheets(filePath).then((sheets) => {
      const loginData = sheets['LoginData']

      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      cy.log('📋 Sheet: LoginData')
      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

      loginData.forEach((row, i) => {
        cy.log(`[${i + 1}] Username: ${row.Username} | Password: ${row.Password} | Role: ${row.Role}`)
        console.log(`LoginData Row ${i + 1}:`, row)
      })

      expect(loginData).to.have.length(3)
      expect(loginData[0]).to.include({ Username: 'admin', Password: 'admin123', Role: 'Admin' })
      expect(loginData[1]).to.include({ Username: 'john_doe', Role: 'User' })
      expect(loginData[2]).to.include({ Username: 'jane_doe', Role: 'User' })

      cy.log('✅ LoginData sheet validated')
    })
  })

  // ── TC3: Display and validate EmployeeInfo sheet ──────────────────────────
  it('TC3 - should display all rows from EmployeeInfo sheet', () => {

    cy.readMultipleSheets(filePath).then((sheets) => {
      const employees = sheets['EmployeeInfo']

      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      cy.log('📋 Sheet: EmployeeInfo')
      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

      employees.forEach((row, i) => {
        cy.log(`[${i + 1}] ID: ${row.EmployeeID} | Name: ${row.Name} | Dept: ${row.Department} | Email: ${row.Email}`)
        console.log(`EmployeeInfo Row ${i + 1}:`, row)
      })

      expect(employees).to.have.length(3)
      expect(employees[0]).to.include({ EmployeeID: 101, Name: 'Alice', Department: 'HR' })
      expect(employees[1]).to.include({ EmployeeID: 102, Name: 'Bob',   Department: 'IT' })
      expect(employees[2]).to.include({ EmployeeID: 103, Name: 'Charlie', Department: 'Finance' })

      cy.log('✅ EmployeeInfo sheet validated')
    })
  })

  // ── TC4: Display and validate SalaryInfo sheet ────────────────────────────
  it('TC4 - should display all rows from SalaryInfo sheet', () => {

    cy.readMultipleSheets(filePath).then((sheets) => {
      const salaries = sheets['SalaryInfo']

      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      cy.log('📋 Sheet: SalaryInfo')
      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

      salaries.forEach((row, i) => {
        cy.log(`[${i + 1}] ID: ${row.EmployeeID} | Name: ${row.Name} | Basic: ${row.BasicSalary} | Bonus: ${row.Bonus} | Total: ${row.TotalSalary}`)
        console.log(`SalaryInfo Row ${i + 1}:`, row)
      })

      expect(salaries).to.have.length(3)
      expect(salaries[0]).to.include({ EmployeeID: 101, BasicSalary: 60000, Bonus: 5000, TotalSalary: 65000 })
      expect(salaries[1]).to.include({ EmployeeID: 102, BasicSalary: 75000, Bonus: 8000, TotalSalary: 83000 })
      expect(salaries[2]).to.include({ EmployeeID: 103, BasicSalary: 65000, Bonus: 6000, TotalSalary: 71000 })

      cy.log('✅ SalaryInfo sheet validated')
    })
  })

  // ── TC5: Cross-sheet data consistency check ───────────────────────────────
  it('TC5 - should verify EmployeeIDs match across EmployeeInfo and SalaryInfo', () => {

    cy.readMultipleSheets(filePath).then((sheets) => {
      const employees = sheets['EmployeeInfo']
      const salaries  = sheets['SalaryInfo']

      cy.log('🔍 Cross-sheet consistency check...')

      employees.forEach((emp, i) => {
        const salary = salaries[i]

        // EmployeeID must match across both sheets
        expect(emp.EmployeeID).to.equal(salary.EmployeeID)
        expect(emp.Name).to.equal(salary.Name)

        cy.log(`✅ ${emp.Name} — ID matches across sheets (${emp.EmployeeID})`)
      })

      cy.log('✅ Cross-sheet consistency verified')
    })
  })

  // ── TC6: Display full summary of all sheets ───────────────────────────────
  it('TC6 - should display complete summary of all sheet data', () => {

    cy.readMultipleSheets(filePath).then((sheets) => {

      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      cy.log('📊 FULL WORKBOOK SUMMARY')
      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

      Object.entries(sheets).forEach(([sheetName, rows]) => {
        cy.log(`📋 Sheet: "${sheetName}" — ${rows.length} rows`)
        rows.forEach((row, i) => {
          cy.log(`   Row ${i + 1}: ${JSON.stringify(row)}`)
        })
      })

      cy.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      cy.log('✅ All sheets displayed successfully')
    })
  })

})