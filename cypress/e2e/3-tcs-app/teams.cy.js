Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:4200/')
  cy.get('#ultimatixLogin').type(username)
  cy.get('#passwordLogin').type(password)
  cy.get('#btnLogin').click()
  cy.wait(500)
})

describe('Ingreso a la pantalla de grupos de trabajo desde un usuario administrador', () => {

  // Ingreso con usuario admin
  beforeEach(() => {
    cy.login('2255136', 'P@ssw0rd')
  });

  it('Test 1: Pagina de grupos de trabajo es accesible', () => {
    cy.get('#btnTeams').click()
  });

  it('Test 2: El titulo es correcto y la lista de los grupos de trabajo se visualiza', () => {
    cy.get('#btnTeams').click()
    cy.get('#teamsTitle').should('have.text', 'Grupos de trabajo')
    //cy.get('#tableEquipos').should('have.data', '{}')
  });

});

describe('Intento de ingreso a la pantalla de grupos de trabajo desde un usuario no administrador', () => {

  // Ingreso con usuario no admin
  beforeEach(() => {
    cy.login('2255138', 'P@ssw0rd')
  });

  it('Test 1: Pagina de grupos de trabajo no es accesible', () => {
    cy.request({
        url: 'http://localhost:4200/pages/dashboard/teams',
        followRedirect: false,
        failOnStatusCode: false
    }).then((resp) => {
        expect(resp.status).to.eq(403)
    })
  });

});


describe('Agregar nuevo grupo de trabajo', () => {

  // Ingreso con usuario admin
  beforeEach(() => {
    cy.login('2255136', 'P@ssw0rd')
  });

  const teamName = 'TCS Project'
  const teamLeader = 'Wilman Remache'
  const teamTech = 'Mauricio Bayas'
  const teamDescription = 'Aplicativo para uso administrativo de TCS.'

  it('Test 1: Agregar un nuevo grupo de trabajo de tipo "Proyecto"', () => {
    const teamType = 'Proyecto'

    cy.get('#btnTeams').click()
    cy.get('#addTeam').click()
    cy.get('#floatingTeamName').type(teamName)
    cy.get('#floatingTeamType').select(teamType)
    cy.get('#floatingTeamLeader').type(teamLeader)
    cy.get('#floatingTeamTech').type(teamTech)
    cy.get('#floatingTeamDesc').type(teamDescription)
    cy.get('#btnSave').click()
  });

  it('Test 2: Agregar un nuevo grupo de trabajo de tipo "Celula"', () => {
    const teamType = 'Célula'

    cy.get('#btnTeams').click()
    cy.get('#addTeam').click()
    cy.get('#floatingTeamName').type(teamName)
    cy.get('#floatingTeamType').select(teamType)
    cy.get('#floatingTeamLeader').type(teamLeader)
    cy.get('#floatingTeamTech').type(teamTech)
    cy.get('#floatingTeamDesc').type(teamDescription)
    cy.get('#btnSave').click()
  });

  it('Test 3: Agregar un nuevo grupo de trabajo de tipo "Tribu"', () => {
    const teamType = 'Tribu'

    cy.get('#btnTeams').click()
    cy.get('#addTeam').click()
    cy.get('#floatingTeamName').type(teamName)
    cy.get('#floatingTeamType').select(teamType)
    cy.get('#floatingTeamLeader').type(teamLeader)
    cy.get('#floatingTeamTech').type(teamTech)
    cy.get('#floatingTeamDesc').type(teamDescription)
    cy.get('#btnSave').click()
  });

});
