/* eslint-disable jest/expect-expect */
describe('calendar journal app', () => {
  it('should start at the landing page', () => {
    cy.visit('/');
    cy
      .findByTestId('landing')
      .should('have.text', 'Hello')
      .findByTestId('nav')
      .findByTestId('signin')
      .should('have.text', 'Sign in')
      .findByTestId('signup')
      .should('have.text', 'Sign up');
  });
});
