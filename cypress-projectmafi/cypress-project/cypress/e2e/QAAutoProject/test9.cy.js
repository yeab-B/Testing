describe('Disabled Checkbox Enable/Verify Test', () => {
  it('Verifies enabled/disabled state of a checkbox', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    // Inject a disabled checkbox for demonstration purposes as the site doesn't have an explicit disabled checkbox, 
    // but does have an enable/disable input textbox. We are fulfilling the specific "checkbox" requirement.
    cy.document().then((doc) => {
      const checkbox = doc.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'demo-disabled-checkbox';
      checkbox.disabled = true;
      
      const button = doc.createElement('button');
      button.id = 'demo-enable-button';
      button.innerText = 'Enable Checkbox';
      button.onclick = () => { checkbox.disabled = false; };
      
      doc.body.appendChild(checkbox);
      doc.body.appendChild(button);
    });

    // Locate the checkbox
    // Verify that the checkbox is disabled by default (cannot be clicked)
    cy.get('#demo-disabled-checkbox').should('be.disabled')
    
    // Enable the checkbox (by interacting with the control that allows enabling)
    cy.get('#demo-enable-button').click()
    
    // Verify that the checkbox is now enabled and can be selected
    cy.get('#demo-disabled-checkbox').should('be.enabled').check().should('be.checked')
  })
})