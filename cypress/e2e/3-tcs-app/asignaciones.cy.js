Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:4200/')
    cy.get('#ultimatixLogin').type(username)
    cy.get('#passwordLogin').type(password)
    cy.get('#btnLogin').click()
    cy.get(':nth-child(3) > app-button > #undefined').click();
    cy.wait(1000)
  });

describe('Test Pantalla Asignaciones', () => {

    beforeEach(() => {
      cy.login('1111111', 'P@ssw0rd')
    });

    it('Test 1: La ventana de Asignaciones es Accesible', () => {
      cy.get('.p-3 > #undefined').should("have.text","Asignación de equipos");
      cy.wait(2000)
    });

    it('Test 2: La ventana de Asignaciones tiene los campos correspondientes', () => {
        cy.get('.p-3 > #undefined').should("have.text","Asignación de equipos");
        cy.get('tr > :nth-child(1)').should("have.text","Acciones");
        cy.get('tr > :nth-child(2)').should("have.text","Equipo");
        cy.get('tr > :nth-child(3)').should("have.text","Tipo");
        cy.get('tr > :nth-child(4)').should("have.text","Asignación (%)");
        cy.get('tr > :nth-child(5)').should("have.text","Fecha de inicio");
        cy.get('tr > :nth-child(6)').should("have.text","Fecha de finalización");
        cy.get('tr > :nth-child(7)').should("have.text","Fecha de salida");
        cy.get('tr > :nth-child(8)').should("have.text","Estado");
        cy.wait(2000)
      });

      it('Test 3: Creación de una Asignación con Campos Correctos', () => {
        cy.get('app-button > #undefined').click();
        cy.get('#floatingOptions').select("TCS Project 8 | Proyecto");
        cy.get('#floatingPercent').select("50%");
        cy.get(':nth-child(1) > .form-control').type('2022-06-14');
        cy.get(':nth-child(2) > .form-control').type('2022-06-15');
        cy.get('.mat-dialog-actions > :nth-child(2)').click();
        cy.get('#swal2-title').should("have.text","Éxito");
        cy.get('.swal2-confirm').click();
        cy.wait(2000)
      });

      it('Test 4: Campos Obligatorios para Ingresar', () => {
        cy.get('app-button > #undefined').click();
        cy.get('#floatingOptions').select(0);
        cy.get('#mat-dialog-title-0').click();
        cy.get('.form-text').should("have.text"," * Seleccione un equipo. ");
        cy.get('#floatingPercent').select("50%");
        cy.get(':nth-child(1) > .form-control').click();
        cy.get('#mat-dialog-title-0').click();
        cy.get(':nth-child(3) > :nth-child(1) > div.ng-star-inserted > .form-text').should("have.text"," * Seleccione una fecha válida. ");
        cy.get(':nth-child(2) > .form-control').click();
        cy.get('#mat-dialog-title-0').click();
        cy.get(':nth-child(2) > div.ng-star-inserted > .form-text').should("have.text"," * Seleccione una fecha válida. ");
        cy.wait(2000)
      });

      it('Test 5: Editar un registro', () => {
        cy.get(':nth-child(3) > :nth-child(1) > [title="Editar asignacion"] > .mat-button-wrapper > .mat-icon').click()
        cy.get('#floatingPercent').select("50%");
        cy.get('.mat-dialog-actions > :nth-child(2)').click();
        cy.get('#swal2-title').should("have.text","¡Éxito!");
        cy.get('.swal2-confirm').click();
        cy.wait(2000)
      });

      it('Test 6: Eliminar un registro', () => {
        cy.get(':nth-child(1) > [style="color: red;"]').should("have.text","No vigente ");
        cy.wait(2000)
      });


      it('Test 7: Usuario ya registrado en el proyecto', () => {
        cy.get('app-button > #undefined').click();
        cy.get('#floatingOptions').select("Banca Web | Proyecto");
        cy.get('#floatingPercent').select("50%");
        cy.get(':nth-child(1) > .form-control').type('2022-06-14');
        cy.get(':nth-child(2) > .form-control').type('2022-06-15');
        cy.get('.mat-dialog-actions > :nth-child(2)').click();
        cy.get('#swal2-title').should("have.text","Error");
        cy.get('.swal2-confirm').click();
        cy.wait(2000)
      });

      it('Test 8: Fecha de finalizacion menor a la fecha de inicio', () => {
        cy.get('app-button > #undefined').click();
        cy.get('#floatingOptions').select("TCS Project 1 | Proyecto");
        cy.get('#floatingPercent').select("50%");
        cy.get(':nth-child(1) > .form-control').type('2022-06-14');
        cy.get(':nth-child(2) > .form-control').type('2022-06-07');
        cy.get('.mat-dialog-actions > :nth-child(2)').click();
        cy.get('#swal2-title').should("have.text","Error");
        cy.get('.swal2-confirm').click();
        cy.wait(2000)
      });

});
