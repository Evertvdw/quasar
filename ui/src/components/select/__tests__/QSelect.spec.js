import { mount } from '@cypress/vue'
import SelectWrapperForm from './SelectWrapperForm.vue'

describe('QSelect', () => {
  // Behavior tests
  describe('Behavior tests', () => {
    describe('(prop): name', () => {
      it('should find name', () => {
        mount(SelectWrapperForm, {
          attrs: {
            name: 'select'
          }
        })

        cy.get('.q-select')
          .should('exist')

        cy.get('.q-select select')
          .invoke('attr', 'name')
          .should('eq', 'select')
      })

      it('should use for value as name if no name is present', () => {
        mount(SelectWrapperForm, {
          attrs: {
            for: 'notname'
          }
        })

        cy.get('.q-select')
          .should('exist')

        cy.get('.q-select select')
          .invoke('attr', 'name')
          .should('eq', 'notname')
      })
    })

    describe('(prop): virtual-scroll-horizontal', () => {
      it('???', () => {
        mount(SelectWrapperForm, {
          attrs: {
            'virtual-scroll-horizontal': true
          }
        })
        // eslint-disable-next-line no-unused-expressions
        expect(true).to.be.true
      })

      it('???', () => {
        mount(SelectWrapperForm, {
          attrs: {
            'virtual-scroll-horizontal': false
          }
        })
        // eslint-disable-next-line no-unused-expressions
        expect(true).to.be.true
      })
    })

    describe('(prop): error', () => {
      it('should show a field validation error', () => {
        mount(SelectWrapperForm, {
          attrs: {
            error: true
          }
        })

        cy.get('.text-negative .q-icon')
          .should('exist')
          .should('be.visible')

        cy.get('.text-negative .q-icon')
          .should('contain', 'error')
      })

      it('should not show a field validation error', () => {
        mount(SelectWrapperForm, {
          attrs: {
            error: false
          }
        })

        cy.get('.text-negative .q-icon')
          .should('not.exist')
      })
    })
  })
  // Model tests

  // Position tests

  // Style tests

  // Transition tests

  // Events
})
