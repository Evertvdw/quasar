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
  })
  // Model tests

  // Position tests

  // Style tests

  // Transition tests

  // Events
})
