/* eslint-disable jest/expect-expect */
describe('Sign in', () => {
  it('should sign in user', () => {
    cy.visit('/signin');
    cy.findByLabelText('Email');
    cy.findByLabelText('Password');
    cy.findByPlaceholderText('Email').type('nik@mail.com');
    cy.findByPlaceholderText('Password').type('pass');
    cy.findByText('Sign In').click();
    cy.location('pathname').should('eq', '/myjournal');
  });
});
