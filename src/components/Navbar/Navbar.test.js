import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render, waitFor } from '@testing-library/react';
import App from '../../App';

test('renders all buttons on navbar', async () => {
  const { getByText, queryByText } = render(<App />);
  await waitFor(() => expect(getByText(/Home/i)).toBeInTheDocument());
  expect(getByText(/Sign in/i)).toBeInTheDocument();
  expect(getByText(/Sign up/i)).toBeInTheDocument();
  expect(queryByText(/New Entry/i)).not.toBeInTheDocument();
  expect(queryByText(/Logout/i)).not.toBeInTheDocument();
});
