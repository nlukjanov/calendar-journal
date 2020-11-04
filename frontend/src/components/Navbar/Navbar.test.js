import React from 'react';

import { render, waitFor } from '@testing-library/react';
import App from '../../App';

test('renders all buttons on navbar', async () => {
  const { getByText, getByTestId, queryByText, container } = render(<App />);
  await waitFor(() => expect(getByText(/Home/i)).toBeInTheDocument());
  expect(getByTestId('nav-signin')).toHaveTextContent('Sign In');
  expect(getByTestId('nav-signup')).toHaveTextContent('Sign Up');
  expect(queryByText(/New Entry/i)).not.toBeInTheDocument();
  expect(queryByText(/Logout/i)).not.toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
