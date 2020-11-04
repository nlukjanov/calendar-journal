/* eslint-disable jest/expect-expect */
describe('Sign up', () => {
  it('should signup new user', () => {
    cy.visit('/signup');
    cy.findByLabelText('Username');
    cy.findByLabelText('Email');
    cy.findByLabelText('Password');
    cy.findByLabelText('Password Confirmation');
    cy.findByPlaceholderText('Username').type('Niki');
    cy.findByPlaceholderText('Email').type('niki@email.com');
    cy.findByPlaceholderText('Password').type('pass');
    cy.findByPlaceholderText('Password Confirmation').type('pass');
    cy.findByText('Sign Up').click();
    cy.location('pathname').should('eq', '/signin');
  });

  // add test to show errors if form is incorrect
});
