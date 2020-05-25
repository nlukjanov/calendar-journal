/* eslint-disable jest/expect-expect */
describe('calendar journal app', () => {
  it('should start at the landing page', () => {
    cy.visit('/');
    cy.findByTestId('landing').should('have.text', 'Hello');
    cy.findByText('Home');
    cy.findByTestId('nav');
    cy.findByText('Sign in');
    cy.findByText('Sign up');
  });

  it('should direct to signup', () => {
    cy.visit('/');
    cy.findByText('Sign up').click();
    cy.location('pathname').should('eq', '/signup');
  });

  it('should signup new user', () => {
    cy.exec('mongo calendar-journal-development --eval "db.dropDatabase()"');
    cy.visit('/signup');
    cy.findByLabelText('Username');
    cy.findByLabelText('Email');
    cy.findByLabelText('Password');
    cy.findByLabelText('Password Confirmation');
    cy.findByPlaceholderText('Username').type('Nik');
    cy.findByPlaceholderText('Email').type('nik@mail.com');
    cy.findByPlaceholderText('Password').type('pass');
    cy.findByPlaceholderText('Password Confirmation').type('pass');
    cy.findByText('Sign Up').click();
    cy.location('pathname').should('eq', '/signin');
  });

  // add test to show errors if form is incorrect

  it('should sign in user', () => {
    cy.visit('/signin');
    cy.findByLabelText('Email');
    cy.findByLabelText('Password');
    cy.findByPlaceholderText('Email').type('nik@mail.com');
    cy.findByPlaceholderText('Password').type('pass');
    cy.findByText('Sign In').click();
    cy.location('pathname').should('eq', '/myjournal');
  });

  it('should display User\'s journal entries', () => {
    cy.visit('/signin');
    cy.findByLabelText('Email');
    cy.findByLabelText('Password');
    cy.findByPlaceholderText('Email').type('nik@mail.com');
    cy.findByPlaceholderText('Password').type('pass');
    cy.findByText('Sign In').click();
    cy.wait(500);
    cy.location('pathname').should('eq', '/myjournal');
    cy.findByTestId('title1').should('have.text', 'Title1');
  });
});
