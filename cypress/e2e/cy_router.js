/* eslint-disable jest/expect-expect */
describe('calendar journal app', () => {
  it('should direct to signup', () => {
    cy.visit('/');
    cy.findByText('Sign up').click();
    cy.location('pathname').should('eq', '/signup');
  });

  it('should direct to signin', () => {
    cy.visit('/');
    cy.findByText('Sign In').click();
    cy.location('pathname').should('eq', '/signin');
  });
});
