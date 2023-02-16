/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

it('finds the visible row', () => {
  cy.visit('/')
  cy.contains('[role=row]', 'Soybean Meal')
    .should('be.visible')
    .and('have.attr', 'data-rowindex', '3')
    .contains('[data-field=desk]', 'D-3930')
})

it('finds the row by scrolling', () => {
  cy.visit('/')
  recurse(
    () => cy.contains('[role=row]', 'Rough Rice').should(Cypress._.noop),
    ($row) => $row.length,
    {
      log: false,
      timeout: 20_000,
      delay: 1_000,
      post() {
        cy.get('[role=row]:last').scrollIntoView()
      },
    },
  )
    .scrollIntoView()
    .should('be.visible')
    .and('have.attr', 'data-rowindex', '21')
})
