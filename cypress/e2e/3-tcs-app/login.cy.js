Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:4200/')
    cy.get('#ultimatixLogin').type(username)
    cy.get('#passwordLogin').type(password)
    cy.get('#btnLogin').click()
    // cy.url().should('contain', '/pages')
    cy.wait(1000)
  });

describe('Demo de Testing de Inicio de Sesión', () => {

    //before()
    it('Test 1: Número de Ultimatix y Clave Correcto', () => {
        cy.visit('http://localhost:4200/'); // ir a la pagina principal 
        cy.get('.mb-3 > .form-control').type("1111111");
        cy.get('.input-group > .form-control').type("P@ssw0rd");
        cy.get('.btn').click();
        cy.get('.my-4').should('have.text','BIENVENIDO/A JUAN')
    });

    it('Test 2: Número de Ultimatix y Clave Incorrectos', () => {
        cy.visit('http://localhost:4200/'); // ir a la pagina principal 
        cy.get('.mb-3 > .form-control').type("2536456");
        cy.get('.input-group > .form-control').type("ClaveInvalida");
        cy.get('.btn').click();
        cy.get('#swal2-title').should('have.text','Error');
    });

    
    it('Test 3: Número de Ultimatix Correcto y Clave incorrecta', () => {
        cy.visit('http://localhost:4200/'); // ir a la pagina principal 

        cy.get('.mb-3 > .form-control').type("0000000");
        cy.get('.input-group > .form-control').type("@ClaveInvalida");
        cy.get('.btn').click();
        cy.get('#swal2-title').should('have.text','Error');
    });


    it('Test 4: Número de Ultimatix Incorrecto y Clave Correcta', () => {
        cy.visit('http://localhost:4200/'); // ir a la pagina principal 

        cy.get('.mb-3 > .form-control').type("0000000232");
        cy.get('.input-group > .form-control').type("@ClaveInvalida");
        cy.get('.btn').click();
        cy.get('#swal2-title').should('have.text','Error');
    });

    it('Test 5: Número de Ultimatix con Longitud minima de 7 dígitos', () => {
        cy.visit('http://localhost:4200/'); // ir a la pagina principal 

        cy.get('.mb-3 > .form-control').type("12345");
        cy.get('.input-group > .form-control').type("@ClaveInvalida");
        cy.get('.btn').click();
        cy.get('#swal2-title').should('have.text','Error');
    });

    it('Test 6: Campo Número de Ultimatix vacio', () => {
        cy.visit('http://localhost:4200/'); // ir a la pagina principal 

        cy.get('.mb-3 > .form-control').type(" ");
        cy.get('.input-group > .form-control').type("@ClaveInvalida");
        cy.get('.form-text').should("have.text"," Ingresa tu número de Ultimatix. ");
    });

    it('Test 7: Campo Contraseña vacio', () => {
        cy.visit('http://localhost:4200/'); // ir a la pagina principal 
        cy.get('.mb-3 > .form-control').type("1263739");
        cy.get('.input-group > .form-control').click();
        cy.get('.btn').click();
        cy.get('.form-text').should("have.text"," Ingresa tu contraseña. ");
    });
});

