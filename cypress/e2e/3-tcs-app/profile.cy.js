Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:4200/')
  cy.get('#ultimatixLogin').type(username)
  cy.get('#passwordLogin').type(password)
  cy.get('#btnLogin').click()
  cy.url().should('contain', '/pages')
})

describe('Pantalla perfil de usuario', () => {

  beforeEach(() => {
    cy.login('2254687', 'Tcs.@2022')
  });

  it('Test 1: Debería ser accesible el perfil de usuario', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile');
  });

  it('Test 1: Debería tener el título correcto', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile');
    cy.get('#profileTitle').should('have.text', 'PERFIL DE USUARIO')
  });
});
