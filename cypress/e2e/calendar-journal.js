/* eslint-disable jest/expect-expect */
describe('calendar journal app', () => {
  it('should start at the landing page', () => {
    cy.visit('/').get('[data-testid=landing]').should('have.text', 'Hello');
  });
});
