/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference types="Jest" />

describe('Use cases', () => {
    describe('Login/logout use case', () => {
        it('Goes to front/login page', () => {
            cy.visit('http://localhost:8080/login')
        })
        
        it('Enter credentials and press login button', () => {
            cy.login()
        })

        it('Press logout button', () => {
            cy.contains('Log out').click()
        })
    })

    describe('Start roll-call use case', () => {
        it('Goes to front page', () => {
            cy.visit('http://localhost:8080/login')
        })
    
        it('Login', () => {
            cy.login()
        })

        it('Select class', () => {
            cy.get('[class^=MuiSelect-]').within(() => {
                cy.get('p').should('be.visible')
            })
            cy.contains('Submit class').click()
        })

        it('Select course', () => {
            cy.get('[class^=MuiSelect-]').within(() => {
                cy.get('p').should('be.visible')
            })
            cy.contains('Submit course').click()
        })

        it('Start the roll call', () => {
            cy.contains('Start Roll Call').click()
        })

        it('End the roll call', () => {
            cy.contains('End now').click()
        })

        it('Press logout button', () => {
            cy.contains('Log out').click()
        })
    })
})
