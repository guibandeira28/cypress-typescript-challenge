
describe('Sauce Demo - Fluxo de compra', () => {

  it('Deve realizar uma compra e fazer logout com sucesso', () => {

    // 1. Acessar o site
    cy.visit('/');

    // 2. Realizar login
    cy.get('[data-test="username"]')
      .type('standard_user');

    cy.get('[data-test="password"]')
      .type('secret_sauce');

    cy.get('[data-test="login-button"]')
      .click();

    cy.url().should('include', '/inventory.html');

    // 3. Adicionar produto ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    cy.get('.shopping_cart_badge')
      .should('have.text', '1');

    // 4. Acessar o carrinho
    cy.get('.shopping_cart_link')
      .click();

    cy.url().should('include', '/cart.html');

    cy.get('.cart_item')
      .should('have.length', 1);

    // 5. Iniciar checkout
    cy.get('[data-test="checkout"]')
      .click();

    cy.url().should('include', '/checkout-step-one.html');

    // 6. Preencher dados do comprador
    cy.get('[data-test="firstName"]')
      .type('Guilherme');

    cy.get('[data-test="lastName"]')
      .type('Bandeira');

    cy.get('[data-test="postalCode"]')
      .type('20000-000');

    cy.get('[data-test="continue"]')
      .click();

    // 7. Validar resumo da compra
    cy.url().should('include', '/checkout-step-two.html');

    cy.get('.cart_item')
      .should('have.length', 1);

    cy.get('[data-test="finish"]')
      .click();

    // 8. Validar confirmação do pedido
    cy.url().should('include', '/checkout-complete.html');

    cy.get('.complete-header')
      .should('have.text', 'Thank you for your order!');

    // 9. Voltar para a página inicial
    cy.get('[data-test="back-to-products"]')
      .click();

    // 10. Fazer logout
    cy.get('#react-burger-menu-btn')
      .click();

    cy.get('[data-test="logout-sidebar-link"]')
      .should('be.visible')
      .click();

    // 11. Confirmar retorno à tela de login
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('[data-test="login-button"]')
      .should('be.visible');

  });

});
