Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:4200/')
  cy.get('#ultimatixLogin').type(username)
  cy.get('#passwordLogin').type(password)
  cy.get('#btnLogin').click()
  // cy.url().should('contain', '/pages')
  cy.wait(1000)
})

describe('Pantalla perfil de usuario', () => {

  beforeEach(() => {
    cy.login('2254687', 'Tcs.@2022')
  });

  it('Test 1: El perfil de usuario es accesible', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile')
    cy.wait(2000)
  });

  it('Test 2: Se visualiza la información del usuario', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile')
    cy.get('#profileTitle').should('have.text', 'PERFIL DE USUARIO')
    cy.get('#full-name').should('have.text', 'Ricardo Urbina')
    cy.get('#ultimatix-profile').should('have.text', '2254687')
    cy.get('#rol-profile').should('have.text', 'Administrador')
    cy.get('#email-profile').should('have.text', 'rjuo240596@hotmail.com')
    cy.get('#phone-profile').should('have.text', '+593 97 860 0655')
    cy.get('#user-profile').should('have.text', '@ricardoUrbina')
    cy.get('#asignation-profile').should('have.text', ' 0 ')
    cy.wait(2000)
  });

  it('Test 3: Los siguientes campos no deben ser editables: Nombres, Ultimatix, Total de asignación.', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile')
    cy.get('#edit-user-profile').click()
    cy.get('#floatingFullname').should('be.disabled')
    cy.get('#floatingUltimatix').should('be.disabled')
    cy.get('#floatingAsignation').should('be.disabled')
  });

  it('Test 4: Se debe editar los campos: correo electrónico, teléfono y usuario de red ', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile')
    cy.get('#edit-user-profile').click()
    cy.get('#floatingEmail').type('rjuo240596@outlook.com')
    cy.get('#floatingPhone').type('+593 97 860 0650')
    cy.get('#floatingNetuser').type('@ricardoUrbina25')
    cy.get('#save-user-profile').click()
    // cy.get('#swal2-title').should('have.text', '¡Éxito!')
    cy.wait(2000)
  });

  it('Test 5: Se debe actualualizar la información "Sobre mí"', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile')
    cy.get('#edit-about').click()
    cy.get('#textAreaAboutMe').type('Esto es una prueba')
    cy.get('#save-about').click()
    // cy.get('#swal2-title').should('have.text', '¡Éxito!')
    cy.wait(2000)
  });

  it('Test 6: Debe actualizar las habilidades', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile')
    cy.get('#edit-skills').click()
    cy.get('#skills').select('AWS')
    cy.get('#levels').select('Bajo')
    cy.get('#add-skill-1').click()
    cy.get('#swal2-title').should('have.text', '¡Éxito!')
    cy.get('.swal2-confirm').click()
  });

  it('Test 7: Validaciones de campos vacíos en habilidades', () => {
    cy.visit('http://localhost:4200/pages/dashboard/profile')
    cy.get('#edit-skills').click()
    // cy.get('#skills').select('AWS')
    cy.get('#skills').select('')
    cy.get('#levels').select('')
    cy.get('#add-skill-1').click()
    cy.get('#swal2-title').should('have.text', '¡Advertencia!')
    cy.get('.swal2-confirm').click()
  });
});
