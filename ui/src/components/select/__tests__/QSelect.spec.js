import { mount } from '@cypress/vue'
import SelectWrapperForm from './SelectWrapperForm.vue'

describe.only('QSelect', () => {
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

    describe('(prop): rules', () => {
      it('should show a field validation error because of a rule', () => {
        mount(SelectWrapperForm, {
          attrs: {
            rules: [ val => val.length <= 3 || 'Please use maximum 3 characters' ]
          }
        })

        cy.get('.q-select')
          .should('exist')
          .click()
          .wait(300)
          .click()
          .wait(300)

        cy.get('.text-negative .q-icon')
          .should('exist')
          .should('be.visible')
          .should('contain', 'error')

        cy.get('.q-field__messages')
          .should('contain', 'Please use maximum 3 characters')
      })

      it('should show no validation error with rule rule', () => {
        mount(SelectWrapperForm, {
          attrs: {
            rules: [ val => val.length <= 10 || 'Please use maximum 10 characters' ]
          }
        })

        cy.get('.q-select')
          .should('exist')
          .click()
          .wait(300)
          .click()
          .wait(300)

        cy.get('.text-negative .q-icon')
          .should('not.exist')
      })
    })

    describe('(prop): reactive-rules', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): lazy-rules', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): loading', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): clearable', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): autofocus', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): for', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): hide-dropdown-icon', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): fill-input', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): new-value-mode', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): autocomplete', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): transition-show', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): transition-hide', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): transition-duration', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): behavior', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })
  })

  // Content tests
  describe('Content tests', () => {
    describe('(prop): table-colspan', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): error-message', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): no-error-icon', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): label', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): stack-label', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): hide-hint', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): prefix', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): suffix', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): loading', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): clearable', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): clear-icon', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): label-slot', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): bottom-slots', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): counter', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): hide-dropdown-icon', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): dropdown-icon', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): use-input', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): input-debounce', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })
  })

  // General tests
  describe('General tests', () => {
    describe('(prop): tabindex', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })
  })

  // Model tests
  describe('Model tests', () => {
    describe('(prop): model-value', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): multiple', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): emit-value', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })
  })

  // Options tests
  describe('Options tests', () => {
    describe('(prop): options', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): option-value', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): option-label', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): option-disable', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): options-dense', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): options-dark', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })

    describe('(prop): options-selected-class', () => {
      it('???', () => {
        mount(SelectWrapperForm)

        expect(true).should('be.true')
      })
    })
  })

  // Position tests

  // Style tests

  // Transition tests

  // Events
})
