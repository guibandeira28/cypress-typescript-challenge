describe('Sauce Demo - Acesso ao site', () => {

  it('Deve acessar a página inicial com sucesso', () => {

    cy.visit('/');

    cy.url().should('include', 'saucedemo.com');

    cy.get('[data-test="username"]')
      .should('be.visible');

    cy.get('[data-test="password"]')
      .should('be.visible');

    cy.get('[data-test="login-button"]')
      .should('be.visible');

  });

});