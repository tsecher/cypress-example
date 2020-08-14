/// <reference types="cypress" />

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.viewport() - set the viewport size and dimension', () => {
    // https://on.cypress.io/viewport

    // lets see what our app looks like on a super large screen
    cy.viewport(2999, 2999)
  })
})
