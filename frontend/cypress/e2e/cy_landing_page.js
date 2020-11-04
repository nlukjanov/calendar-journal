/* eslint-disable jest/expect-expect */
describe('Landing page', () => {
  it('should start at the landing page', () => {
    cy.visit('/');
    cy.findByTestId('landing').should('have.text', 'Hello');
    cy.findByText('Home');
    cy.findByTestId('nav');
    cy.findByText('Sign in');
    cy.findByText('Sign up');
  });
});
