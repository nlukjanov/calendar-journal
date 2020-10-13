import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render, waitFor } from '@testing-library/react';
import App from './App';

test('renders welcome on landing page', async () => {
  const { getByText } = render(<App />);
  await waitFor(() => expect(getByText(/Home/i)).toBeInTheDocument());
  expect(getByText(/Welcome to Calendar Journal/i)).toBeInTheDocument();
  expect(
    getByText('Take your notes and keep your memories'),
  ).toBeInTheDocument();
});
