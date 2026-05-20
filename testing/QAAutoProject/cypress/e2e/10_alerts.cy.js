describe('Testing Different Types of Alert',()=>{
    beforeEach(() => {
        cy.visit('https://vinothqaacademy.com/alert-and-popup/')
    })

    it('Handle simple Alert',()=>{
        cy.on('window:alert', (text) => {
            expect(text).to.contain('I am an alert box!')
        })

        cy.contains('Alert Box').click()
    })
            
    // click OK
    it('Handle confirm alert - OK', () => {

        cy.on('window:confirm', (text) => {
            expect(text).to.contain('Confirm pop up with OK and Cancel button')
            return true   
        })

        cy.contains('Confirm Alert Box').click()

        cy.contains('You clicked on OK!').should('be.visible')
    })


    
    // click Cancel
    it('Handle confirm alert - Cancel', () => {

        cy.on('window:confirm', () => {
            return false   
        })

        cy.contains('Confirm Alert Box').click()

        cy.contains('You clicked on Cancel!').should('be.visible')
    })

    //Yes Case
    it('Prompt - YES response', () => {

        // Stub prompt input
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Yes')
        })

        cy.contains('Prompt Alert Box').click()

        // Verify result
        cy.contains('Thanks for Liking Automation').should('be.visible')
    })


    //NO
    it('Prompt - NO response', () => {

        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('No')
        })

        cy.contains('Prompt Alert Box').click()

        // Verify result
        cy.contains('Sad to hear it !').should('be.visible')
    })
})