describe('Demo de Testing de Inicio de Sesión', () => {

    //before()
    it('Test 1: Número de Ultimatix y Clave Coorecto', () => {
        cy.visit('/'); // ir a la pagina principal 
        cy.get('.mb-3 > .form-control').type("0000000");
        cy.get('.input-group > .form-control').type("P@ssw0rd");
        cy.get('.btn').click();
        cy.get('.my-4').should('have.text','BIENVENIDO ADMIN')
        //cy.get('#swal2-title').should('have.text','Error');
    });

    it('Test 2: Número de Ultimatix y Clave Incorrectos', () => {
        cy.visit('/'); // ir a la pagina principal 
        cy.get('.mb-3 > .form-control').type("2536456");
        cy.get('.input-group > .form-control').type("ClaveInvalida");
        cy.get('.btn').click();
        cy.get('#swal2-title').should('have.text','Error');
    });

    
    it('Test 3: Número de Ultimatix Correcto y Clave incorrecta', () => {
        cy.visit('/'); // ir a la pagina principal 

        cy.get('.mb-3 > .form-control').type("0000000");
        cy.get('.input-group > .form-control').type("@ClaveInvalida");
        cy.get('.btn').click();
        cy.get('#swal2-title').should('have.text','Error');
    });


    it('Test 4: Número de Ultimatix Incorrecto y Clave Correcta', () => {
        cy.visit('/'); // ir a la pagina principal 

        cy.get('.mb-3 > .form-control').type("0000000232");
        cy.get('.input-group > .form-control').type("@ClaveInvalida");
        cy.get('.btn').click();
        cy.get('#swal2-title').should('have.text','Error');
    });

    it('Test 5: Número de Ultimatix con Longitud minima de 7 dígitos', () => {
        cy.visit('/'); // ir a la pagina principal 

        cy.get('.mb-3 > .form-control').type("12345");
        cy.get('.input-group > .form-control').type("@ClaveInvalida");
        cy.get('.btn').click();
        cy.get('#swal2-title').should('have.text','Error');
    });

    it('Test 6: Campo Número de Ultimatix vacio', () => {
        cy.visit('/'); // ir a la pagina principal 

        cy.get('.mb-3 > .form-control').type(" ");
        cy.get('.input-group > .form-control').type("@ClaveInvalida");
        cy.get('.form-text').should("have.text"," Ingresa tu número de Ultimatix. ");
    });

    it('Test 7: Campo Contraseña vacio', () => {
        cy.visit('/'); // ir a la pagina principal 
        cy.get('.mb-3 > .form-control').type("1263739");
        cy.get('.input-group > .form-control').click();
        cy.get('.btn').click();
        cy.get('.form-text').should("have.text"," Ingresa tu contraseña. ");
    });
});

