/* eslint-disable jest/expect-expect */
describe('calendar journal app', () => {
  it('should creat a new entry', () => {
    cy.visit('/new-entry');
    cy.findByText('New Journal Entry');
    cy.findByTestId('entry-form');
    cy.findByPlaceholderText('Title').type('My entry title');
    cy.findByPlaceholderText('Entry text').type('My entry text');
    cy.findByText('Create Entry').click();
    cy.location('pathname').should('eq', '/myjournal');
    cy.contains('My entry title');
    cy.contains('My entry text');
  });
});
