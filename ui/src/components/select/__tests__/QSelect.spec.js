import { mount } from '@cypress/vue'
import SelectWrapperForm from './SelectWrapperForm.vue'

describe('QSelect', () => {
  // Behavior tests
  describe('Behavior tests', () => {
    describe('(prop): name', () => {
      it('should find name', () => {
        mount(SelectWrapperForm, {
          props: {
            name: 'select',
            options: [
              'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
            ]
          }
        })

        cy.get('.q-select')
          .should('exist')

        cy.get('.q-select')
          .invoke('attr', 'name')
          .should('eq', 'select')
      })
    })
  })
  // Model tests

  // Position tests

  // Style tests

  // Transition tests

  // Events
})
