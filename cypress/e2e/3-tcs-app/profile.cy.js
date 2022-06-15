Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:4200/auth/login')
  cy.get('#ultimatixLogin').type(username)
  cy.get('#passwordLogin').type(password)
  cy.get('#btnLogin').click()
  cy.wait(1000)
})

describe('Pantalla perfil de usuario', () => {

  const user = {
    fullName: 'Bryan Simbaña',
    ultimatix: '2254677',
    rol: 'Administrador',
    email: 'bryan@tcs.com',
    phone: '+593 98 493 0944',
    netUser: '@bryan',
    asignation: ' 0 ',
  }

  beforeEach(() => {
    cy.login('2254677', 'Netlab123!')
  });

  // it('Test 1: Acceder al perfil de usuario', () => {
  //   cy.visit('http://localhost:4200/pages/dashboard/profile')
  // });

  // it('Test 2: Se visualiza la información del usuario', () => {
  //   cy.visit('http://localhost:4200/pages/dashboard/profile')
  //   cy.get('#profileTitle').should('have.text', 'PERFIL DE USUARIO')
  //   cy.get('#full-name').should('have.text', user.fullName)
  //   cy.get('#ultimatix-profile').should('have.text', user.ultimatix)
  //   cy.get('#rol-profile').should('have.text', user.rol)
  //   cy.get('#email-profile').should('have.text', user.email)
  //   cy.get('#phone-profile').should('have.text', user.phone)
  //   cy.get('#user-profile').should('have.text', user.netUser)
  //   cy.get('#asignation-profile').should('have.text', user.asignation)
  // });

  // it('Test 3: Los siguientes campos no se pueden editar: Nombre completo, Ultimatix, Total de asignación.', () => {
  //   cy.visit('http://localhost:4200/pages/dashboard/profile')
  //   cy.wait(2000)
  //   cy.get('#edit-user-profile').click()
  //   cy.get('#floatingFullname').should('be.disabled')
  //   cy.get('#floatingUltimatix').should('be.disabled')
  //   cy.get('#floatingAsignation').should('be.disabled')
  // });

  // it('Test 4: El usuario pueden editar los siguientes campos: correo electrónico, teléfono y usuario de red ', () => {
  //   cy.visit('http://localhost:4200/pages/dashboard/profile')
  //   cy.wait(2000)
  //   cy.get('#edit-user-profile').click()
  //   cy.get('#floatingEmail').type('{selectall}{backspace}')
  //   cy.get('#floatingEmail').type('bryan@tcs.com')
  //   cy.get('#floatingPhone').type('{selectall}{backspace}')
  //   cy.get('#floatingPhone').type('+593 98 493 0944')
  //   cy.get('#floatingNetuser').type('{selectall}{backspace}')
  //   cy.get('#floatingNetuser').type('@bryan')
  //   cy.get('#save-user-profile').click()
  //   cy.get('#swal2-title').should('have.text', '¡Éxito!')
  //   cy.wait(1000)
  //   cy.get('.swal2-confirm').click()
  //   cy.get('#content').scrollTo('top')
  //   cy.wait(2000)
  // });

  // it('Test 5: Actualizar la información sobre mí', () => {
  //   cy.visit('http://localhost:4200/pages/dashboard/profile')
  //   cy.wait(2000)
  //   cy.get('#edit-about').click()
  //   cy.get('#textAreaAboutMe').type('{selectall}{backspace}')
  //   cy.get('#textAreaAboutMe').type('Esto es una prueba.')
  //   cy.get('#save-about').click()
  //   cy.get('#swal2-title').should('have.text', '¡Éxito!')
  //   cy.wait(1000)
  //   cy.get('.swal2-confirm').click()
  //   cy.get('#content').scrollTo('center')
  //   cy.wait(2000)
  // });

  // it('Test 6: Añadir nuevas habilidades técnicas al usuario vigente', () => {
  //   cy.visit('http://localhost:4200/pages/dashboard/profile')
  //   cy.wait(2000)
  //   cy.get('#edit-tech-skills').click()
  //   cy.get('#tech-skills').select('AWS')
  //   cy.get('#tech-levels').select('Medio')
  //   cy.get('#add-tech-skill').click()
  //   cy.get('#tech-skills').select('Docker')
  //   cy.get('#tech-levels').select('Medio')
  //   cy.get('#add-tech-skill').click()
  //   cy.wait(2000)
  //   cy.get('#delete-tech-skill-4').click()
  //   cy.get('#save-tech-skill').click()
  //   cy.get('#swal2-title').should('have.text', '¡Éxito!')
  //   cy.wait(1000)
  //   cy.get('.swal2-confirm').click()
  //   cy.get('#content').scrollTo('center')
  //   cy.wait(2000)
  // });
  //
  // it('Test 7: Actualizar las habilidades funcionales del usuario', () => {
  //   cy.visit('http://localhost:4200/pages/dashboard/profile')
  //   cy.get('#content').scrollTo('bottom')
  //   cy.wait(2000)
  //   cy.get('#edit-func-skills').click()
  //   cy.get('#func-skills').select('Cartera')
  //   cy.get('#func-levels').select('Bajo')
  //   cy.get('#add-func-skill').click()
  //   cy.wait(1000)
  //   cy.get('#delete-func-skill-0').click()
  //   cy.wait(1000)
  //   cy.get('#save-func-skill').click()
  //   cy.get('#swal2-title').should('have.text', '¡Éxito!')
  //   cy.wait(1000)
  //   cy.get('.swal2-confirm').click()
  //   cy.wait(1000)
  //   cy.get('#content').scrollTo('bottom')
  //   cy.wait(2000)
  // });
  //
  // it('Test 8: Actualizar las aplicaciones', () => {
  //   cy.visit('http://localhost:4200/pages/dashboard/profile')
  //   cy.get('#content').scrollTo('bottom')
  //   cy.wait(2000)
  //   cy.get('#edit-apps').click()
  //   cy.get('#apps').select('Spring Tools')
  //   cy.get('#app-levels').select('Bajo')
  //   cy.get('#add-app').click()
  //   cy.wait(1000)
  //   cy.get('#save-apps').click()
  //   cy.get('#swal2-title').should('have.text', '¡Éxito!')
  //   cy.wait(1000)
  //   cy.get('.swal2-confirm').click()
  //   cy.wait(2000)
  // });

});
